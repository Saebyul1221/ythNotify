"use strict"

const Parser = require("rss-parser")
const parser = new Parser()
const Youtube = require("simple-youtube-api")
const startAt = Date.now()
const lastVideos = {}
const onlyTestVid =
  "https://www.youtube.com/watch?v=jNQXAC9IVRw&list=PLqZt0sNilvRD5t2eHBPXGnfS4LGQaNi8d"
class YoutubeUpload {
  constructor(client) {
    this.client = client

    this.youtube = new Youtube(this.client._options?.youtube.token)

    this.youtube.getVideo(onlyTestVid).catch(() => {
      throw new Error(
        "[Youtube] API key not valid. Please pass a valid API key."
      )
    })
    this.check()
    setInterval(() => this.check(), this.client?._interval * 1000)
  }

  async getLastVideo(_, rssURL) {
    let content = await parser.parseURL(rssURL)
    let tLastVideos = content.items.sort((a, b) => {
      let aPubDate = new Date(a.pubDate || 0).getTime()
      let bPubDate = new Date(b.pubDate || 0).getTime()
      return bPubDate - aPubDate
    })
    return tLastVideos[0]
  }

  async checkVideos(youtubeChannelName, rssURL) {
    let lastVideo = await this.getLastVideo(youtubeChannelName, rssURL)
    if (!lastVideo) return
    if (new Date(lastVideo.pubDate).getTime() < startAt) return
    let lastSavedVideo = lastVideos[youtubeChannelName]
    if (lastSavedVideo && lastSavedVideo.id === lastVideo.id) return
    return lastVideo
  }

  getYoutubeChannelIdFromURL(url) {
    let id = null
    url = url.replace(/(>|<)/gi, "").split(/(\/channel\/|\/user\/)/)
    if (url[2]) id = url[2].split(/[^0-9a-z_-]/i)[0]
    return id
  }

  async getYoutubeChannelInfos(name) {
    let channel = null
    let id = this.getYoutubeChannelIdFromURL(name)
    if (id) {
      channel = await this.youtube.getChannelByID(id)
    }
    if (!channel) {
      let channels = await this.youtube.searchChannels(name)
      if (channels.length > 0) channel = channels[0]
    }

    return channel
  }
  async check() {
    this.client._youtubers.forEach(async (youtuber) => {
      let channelInfos = await this.getYoutubeChannelInfos(youtuber)
      if (!channelInfos) return
      let video = await this.checkVideos(
        channelInfos.raw.snippet.title,
        "https://www.youtube.com/feeds/videos.xml?channel_id=" + channelInfos.id
      )
      if (!video) return
      setImmediate(() => this.client.emit("YoutubeUpload", video))
      lastVideos[channelInfos.raw.snippet.title] = video
    })
  }
}

module.exports = YoutubeUpload

"use strict"

class YoutubeUpload {
  constructor(client) {
    console.log("Youtube.js")
    client.emit("YoutubeUpload", "Foo")
  }
}

module.exports = YoutubeUpload

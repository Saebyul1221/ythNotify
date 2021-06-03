"use strict"

class YoutubeUpload {
  constructor(client) {
    console.log("Youtube.js")
    setImmediate(function () {
      client.emit("YoutubeUpload", "Foo")
    })
  }
}

module.exports = YoutubeUpload

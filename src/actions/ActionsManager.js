"use strict"

class ActionsManager {
  constructor(client) {
    this.client = client
    if (this.client._options["twitchStatus"] === true)
      this.register(require("./Twitch"))
    if (this.client._options["youtubeStatus"] === true)
      this.register(require("./Youtube"))
  }

  register(Action) {
    this[Action.name.replace(/Action$/, "")] = new Action(this.client)
  }
}

module.exports = ActionsManager

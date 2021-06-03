"use strict"

class ActionsManager {
  constructor(client) {
    this.client = client
    // this.register(require("./Twitch"))
    this.register(require("./Youtube"))
  }

  register(Action) {
    this[Action.name.replace(/Action$/, "")] = new Action(this.client)
  }
}

module.exports = ActionsManager

"use strict"

const ActionsManager = require("../actions/ActionsManager")
const EventEmitter = require("events")

/**
 * Starting point
 * @extends {EventEmitter}
 */
class Client extends EventEmitter {
  /**
   *
   * @param {ClientOptions} options Options for the client
   */
  constructor(options) {
    super()
    this._options = Object.assign({ youtube: true, twitch: true }, options)
    this._youtubers = new Array()
    this._streamers = new Array()

    const typeofAPIKey = typeof this._options.token
    const typeofYoutubers = typeof this._options.youtubers
    const typeofStreamers = typeof this._options.streamers

    if (typeofAPIKey === "undefined")
      throw new Error("YouTube API Key is missing.")

    if (typeofYoutubers === "undefined") this._options["youtube"] = false
    if (typeofStreamers === "undefined") this._options["twitch"] = false

    if (this._options["youtube"] === false && this._options["twitch"] === false)
      throw new Error("Either YouTube or Twitch must be added.")

    if (Array.isArray(this._options.youtubers) === true)
      this._youtubers = this._options.youtubers
    else if (typeofYoutubers === "string")
      this._youtubers.push(this._options.youtubers)
    else
      throw new Error(
        "[Youtube] An invalid type was given. Only String or Array is allowed."
      )

    if (Array.isArray(this._options.streamers) === true)
      this._streamers = this._options.streamers
    else if (typeofStreamers === "string")
      this._streamers.push(this._options.streamers)
    else
      throw new Error(
        "[Twitch] An invalid type was given. Only String or Array is allowed."
      )

    /**
     * List of Youtubers to receive events
     * @private
     */
    this._options["youtubers"] = this._youtubers

    /**
     * List of Streamers to receive events
     * @private
     */
    this._options["streamers"] = this._streamers

    /**
     * @type {ActionsManager}
     * @private
     */
    this.actions = new ActionsManager(this)
  }
}

module.exports = Client

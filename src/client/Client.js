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
    this._options = Object.assign(
      { youtubeStatus: true, twitchStatus: true },
      options
    )
    this._youtubers = new Array()
    this._streamers = new Array()

    /**
     * Default interval second: 20s
     */
    this._interval = this._options?._interval ?? 20

    /**
     * Youtube Options
     */
    const youtubeOptions = this._options?.youtube
    const typeofAPIKey = typeof youtubeOptions.token
    const typeofYoutubers = typeof youtubeOptions.youtubers

    /**
     * Twitch Options
     */
    const twitchOptions = this._options?.twitch
    const typeofSecreat = typeof twitchOptions.secreat
    const typeofStreamers = typeof twitchOptions.streamers
    const typeofClientId = typeof twitchOptions.clientid

    if (typeofAPIKey === "undefined")
      throw new Error("YouTube API Key is missing.")

    if (typeofSecreat === "undefined")
      throw new Error("Twitch Secreat Key is missing.")

    if (typeofClientId === "undefined")
      throw new Error("Twitch Client ID is missing.")

    if (typeofYoutubers === "undefined") this._options["youtubeStatus"] = false
    if (typeofStreamers === "undefined") this._options["twitchStatus"] = false

    if (
      this._options["youtubeStatus"] === false &&
      this._options["twitchStatus"] === false
    )
      throw new Error("Either YouTube or Twitch must be added.")

    if (Array.isArray(youtubeOptions.youtubers) === true)
      this._youtubers = youtubeOptions.youtubers
    else if (typeofYoutubers === "string")
      this._youtubers.push(youtubeOptions.youtubers)
    else
      throw new Error(
        "[Youtube] An invalid type was given. Only String or Array is allowed."
      )

    if (Array.isArray(twitchOptions.streamers) === true)
      this._streamers = twitchOptions.streamers
    else if (typeofStreamers === "string")
      this._streamers.push(twitchOptions.streamers)
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

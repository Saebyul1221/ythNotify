"use strict"

const ActionsManager = require("../actions/ActionsManager")
const DBManager = require("../database/DBManager")
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
     * Default interval second: 60s
     */
    this._interval = this._options?._interval ?? 60

    /**
     * Youtube Options
     */
    const youtubeOptions = this._options?.youtube
    const typeofAPIKey = typeof youtubeOptions?.token
    const typeofYoutubers = typeof youtubeOptions?.youtubers

    /**
     * Twitch Options
     */
    const twitchOptions = this._options?.twitch
    const typeofSecreat = typeof twitchOptions?.secreat
    const typeofStreamers = typeof twitchOptions?.streamers
    const typeofClientId = typeof twitchOptions?.clientid

    if (typeofYoutubers === "undefined") this._options["youtubeStatus"] = false
    if (typeofStreamers === "undefined") this._options["twitchStatus"] = false

    if (typeofAPIKey === "undefined" && this._options["youtubeStatus"] === true)
      throw new Error("YouTube API Key is missing.")

    if (typeofSecreat === "undefined" && this._options["twitchStatus"] === true)
      throw new Error("Twitch Secreat Key is missing.")

    if (
      typeofClientId === "undefined" &&
      this._options["twitchStatus"] === true
    )
      throw new Error("Twitch Client ID is missing.")

    if (
      this._options["youtubeStatus"] === false &&
      this._options["twitchStatus"] === false
    )
      throw new Error("Either YouTube or Twitch must be added.")

    if (this._options["youtubeStatus"] === true) {
      if (Array.isArray(youtubeOptions.youtubers) === true)
        this._youtubers = youtubeOptions.youtubers
      else if (typeofYoutubers === "string")
        this._youtubers.push(youtubeOptions.youtubers)
      else
        throw new Error(
          "[Youtube] An invalid type was given. Only String or Array is allowed."
        )
    }

    if (this._options["twitchStatus"] === true) {
      if (Array.isArray(twitchOptions.streamers) === true)
        this._streamers = twitchOptions.streamers
      else if (typeofStreamers === "string")
        this._streamers.push(twitchOptions.streamers)
      else
        throw new Error(
          "[Twitch] An invalid type was given. Only String or Array is allowed."
        )
    }

    /**
     * List of Youtubers to receive events
     * @private
     */
    this._options["youtubeStatus"] === true
      ? (this._options["youtubers"] = this._youtubers)
      : null

    /**
     * List of Streamers to receive events
     * @private
     */
    this._options["twitchStatus"] === true
      ? (this._options["streamers"] = this._streamers)
      : null

    /**
     * @type {ActionsManager}
     * @private
     */
    this.actions = new ActionsManager(this)

    /**
     * @type {DBManager}
     * @private
     */
    this.knex = new DBManager(this)
  }
}

module.exports = Client

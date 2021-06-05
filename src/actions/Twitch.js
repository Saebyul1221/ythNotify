"use strict"

const Options = {
  client: "sqlite3",
  connection: {
    filename: __dirname + "/../database/data.sqlite",
  },
  useNullAsDefault: true,
}

const axios = require("axios").default
const knex = require("knex")(Options)

class TwitchStreaming {
  constructor(client) {
    setInterval(() => {
      const channels = new Array()
      for (let v of client._streamers) {
        let _a = v.split("/")
        channels.push(_a[_a.length - 1])
      }
      channels.map(async (channel) => {
        const tokenResponse = await axios.post(
          "https://id.twitch.tv/oauth2/token",
          {},
          {
            params: {
              client_id: client._options.twitch.clientid,
              client_secret: client._options.twitch.secreat,
              grant_type: "client_credentials",
            },
          }
        )
        const token = tokenResponse.data.access_token
        if (toke) {
          const streamResponse = await axios.get(
            "https://api.twitch.tv/helix/streams",
            {
              params: { user_login: channel },
              headers: {
                Authorization: `Bearer ${token}`,
                "Client-ID": client._options.twitch.clientid,
              },
            }
          )
          const status = (await this.getStatus(channel))[0].status
          if (streamResponse.data.data.length !== 0) {
            if (streamResponse.data.data[0].type === "live") {
              if (status == "off") {
                await client.emit(
                  "TwitchStreaming",
                  streamResponse.data.data[0]
                )
                await this.updateStatus(channel, "on")
              }
            }
          } else {
            if (status == "on") await this.updateStatus(channel, "off")
          }
        } else {
          throw new Error("I can't get token.")
        }
      })
    }, client._interval * 1000)
  }
  async getStatus(channel) {
    return await knex.select("status").from("twitch").where({ channel })
  }

  async updateStatus(channel, status) {
    return await knex.update({ status }).from("twitch").where({ channel })
  }
}

module.exports = TwitchStreaming

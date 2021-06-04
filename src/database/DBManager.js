const Options = {
  client: "sqlite3",
  connection: {
    filename: __dirname + "/data.sqlite",
  },
  useNullAsDefault: true,
}
const knex = require("knex")(Options)

class DBManager {
  constructor(data) {
    this.data = data
    this._s = this.data._streamers

    this.streamers = new Array()

    for (let v of this._s) {
      let _a = v.split("/")
      this.streamers.push(_a[_a.length - 1])
    }

    this.checkOfTables()
  }

  async checkOfTables() {
    for (let target of this.streamers) {
      let _data = (await knex("twitch").where({ channel: target }))[0]
      if (!_data) await knex("twitch").insert({ channel: target })
    }
  }
}

module.exports = DBManager

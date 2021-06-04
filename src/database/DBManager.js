const Options = {
  client: "sqlite3",
  connection: {
    filename: __dirname + "./data.sqlite",
  },
  useNullAsDefault: true,
}
const knex = require("knex")(Options)

class DBManager {
  constructor(data) {
    this.data = data

    this._y = this.data._youtubers
    this._s = this.data._streamers

    this.youtubers = new Array()
    this.streamers = new Array()
    for (let f of this._y) {
      let _d = f.split("/")
      this.youtubers.push(_d[_d.length - 1])
    }

    for (let v of this._s) {
      let _a = v.split("/")
      this.streamers.push(_a[_a.length - 1])
    }

    this.checkOfTables()
  }

  async checkOfTables() {
    for (let target of this.youtubers) {
      let _data = (await knex("youtube").where({ channel: target }))[0]
      if (!_data) await this.insert("youtube", target)
    }

    for (let target of this.streamers) {
      let _data = (await knex("twitch").where({ channel: target }))[0]
      if (!_data) await this.insert("twitch", target)
    }
  }

  async insert(table, target) {
    await knex(table).insert({ channel: target })
  }
}

module.exports = DBManager

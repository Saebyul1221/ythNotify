const client = require("../src/index.js")
const test = new client.Client({
  token: "T O K E N",
  youtubers: ["A", "B"],
  streamers: "WhiteKJ",
})

test.on("YoutubeUpload", (a) => console.log(a))

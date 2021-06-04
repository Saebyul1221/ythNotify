const yth = require("../src/index.js")
// Draft Code

// const test = new client.Client({
//   token: "T O K E N",
//   youtubers: ["A", "B"],
//   streamers: "WhiteKJ",
// })

const test = new yth.Client({
  youtube: {
    token: "T O K E N",
    youtubers: ["A", "B"],
  },
  twitch: {
    secreat: "SUPER SECREAT KEY",
    clientid: "1234",
    streamers: "WhiteKJ",
  },
  interval: 20,
})

test.on("YoutubeUpload", (a) => console.log(a))

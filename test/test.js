const Yth = require("../src/index.js")
const yth = new Yth.Client({
  youtube: {
    token: "token of youtube api",
    youtubers: ["https://www.youtube.com/channel/UCG1Q1vaN5Kg-nmd4e3iJzPA"],
  },
  twitch: {
    secreat: "SUPER SECREAT KEY",
    clientid: "1234",
    streamers: "https://www.twitch.tv/woowakgood",
  },
  interval: 20,
})

yth.on("YoutubeUpload", (data) => {
  console.log("New video detected! \n", data)
})

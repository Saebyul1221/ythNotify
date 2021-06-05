const Yth = require("../src/index.js")
const yth = new Yth.Client({
  youtube: {
    token: "API Key (Youtube Data V3 API) ",
    youtubers: ["https://www.youtube.com/channel/UCzRDCwJdqSSRwI4BgojVkIw"],
  },
  twitch: {
    secreat: "Secreat (Twitch API)",
    clientid: "Client ID (Twitch API)",
    streamers: "https://www.twitch.tv/whitekj",
  },
  interval: 20,
})

yth.on("YoutubeUpload", (data) => {
  console.log("New video detected! \n", data)
})

yth.on("TwitchStreaming", (data) => {
  console.log("Start streaming! \n" + data)
})

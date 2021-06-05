# Youtube Twitch Notify

❯ Library for YouTube video upload and Twitch live detection

---

### Install

```
# NPM
$ npm install ythnotify
# yarn
$ yarn add ythnotify
```

### How to use?

❯ To use this module, you need a Youtube Data v3 API Key, Twitch API Secure, and a Client ID.

Youtube API: [Click here](https://console.cloud.google.com/apis/library/youtube.googleapis.com?q=Youtube&id=125bab65-cfb6-4f25-9826-4dcc309bc508&project=brilliant-rhino-281406)  
Twitch API: [Click here](https://dev.twitch.tv/console/apps)

### Examples

```js
const Yth = require("ythnotify")
const yth = new Yth.Client({
  youtube: {
    token: "API Key (Youtube Data V3 API) ",
    youtubers: ["https://www.youtube.com/channel/UCzRDCwJdqSSRwI4BgojVkIw"],
  },
  twitch: {
    secreat: "Secreat (Twitch API)",
    clientid: "Client ID (Twitch API)",
    streamers: ["https://www.twitch.tv/whitekj"],
  },
  interval: 60,
})

yth.on("YoutubeUpload", (data) => {
  console.log("New video detected! \n", data)
})

yth.on("TwitchStreaming", (data) => {
  console.log("Start streaming! \n" + data)
})
```

### Options

❯ General

| Name     | Type   | Need | Default | Description    |
| -------- | ------ | ---- | ------- | -------------- |
| interval | Number | X    | 60      | time to repeat |

❯ Youtube

| Name      | Type            | Need | Default | Description                         |
| --------- | --------------- | ---- | ------- | ----------------------------------- |
| token     | String          | O    | -       | Youtube Data v3 API's api key       |
| youtubers | String or Array | O    | -       | List of YouTubers to detect uploads |

❯ Twitch

| Name      | Type            | Need | Default | Description                      |
| --------- | --------------- | ---- | ------- | -------------------------------- |
| secreat   | String          | O    | -       | Twitch API secreat key           |
| clientid  | String          | O    | -       | Twitch API Client ID             |
| streamers | String or Array | O    | -       | List of Streamers to detect live |

### Used Code

Youtube Notify: [Androz2091's DiscordYoutubeNotifier](https://github.com/Androz2091/DiscordYoutubeNotifier/blob/master/index.js) **[ License: None ]**

### Authors

**[WhiteKJ](https://github.com/CwhiteKJ), [hands8142](https://github.com/hands8142)**

### License

This repository is [MIT](https://github.com/CwhiteKJ/ythNotify/blob/main/LICENSE) licensed.

---

If you have a problem or want to improve or add features, please make an [issue](https://github.com/CwhiteKJ/ythNotify/issues) or [pull request](https://github.com/CwhiteKJ/ythNotify/pulls). Thank you!

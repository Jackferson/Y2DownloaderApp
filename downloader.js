const fs = require("fs");
const ytdl = require("ytdl-core");

const download = async (songsList) => {
  while (songsList.length > 0) {
    let string = songsList[0].name;
    let realName = string.replace(/[^a-zA-Z0-9]/g, "-");
    ytdl(songsList[0].videoId, { quality: "highestaudio" }).pipe(
      fs.createWriteStream(`${realName}.mp3`)
    );
    songsList.shift();
  }
};
exports.download = download;

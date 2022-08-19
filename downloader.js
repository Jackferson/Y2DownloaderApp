const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");

let index = 0;

const download = async (songList) => {
  let item = songList[index];
  let string = item.name;
  let realName = string.replace(/[^a-zA-Z0-9áéíóúñ ]/g, "-");
  const stream = ytdl(item.videoId, { quality: "highestaudio" });
  ffmpeg(stream)
    .audioBitrate(128)
    .save(`${__dirname}/downloads/${realName}.mp3`)
    .on("end", () => {
      console.log(`${realName}`);
      finish(songList);
    });
};

const finish = async (songList) => {
  if (index < songList.length - 1) {
    index++;
    console.log("finish");
    await download(songList);
  } else {
    console.log("Done");
  }
};

exports.download = download;

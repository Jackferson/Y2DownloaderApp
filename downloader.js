const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const filePath = require("./filePath.js");
const window = require("./window.js");

let win;
let index = 0;

const download = async (songList) => {
try {
  let folder = filePath.get();
  let item = songList[index];
  let string = item.name;
  let realName = string.replace(/[^a-zA-Z0-9áéíóúñ ]/g, "-");
  const stream = ytdl(item.videoId, { quality: "highestaudio" });
  ffmpeg(stream)
    .audioBitrate(128)
    .save(`${folder}/${realName}.mp3`)
    .on("end", () => {
      update(item);
      finish(songList);
    });
} catch (error) {
  console.error(error)
}
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

const update = (message) => {
  if (win === undefined) {
    win = window.get();
  }
  win.send("update", message);
};

exports.download = download;

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

/*const namesArray = []
for(song of songsList){
  let string = songsList[0].name
  let realName = string.
  namesArray.push(realName)
}*/
/*
const download = async (songsList) => {
  while (songsList.length > 5) {
    console.log(songsList.length);
    let firstItem = songsList[0];
    let stream = ytdl(firstItem.videoId, { quality: "highestaudio" });
    stream.pipe(
      fs.createWriteStream(`${firstItem.name}.mp3`, songsList.shift())
    );
  }
};
*/
exports.download = download;

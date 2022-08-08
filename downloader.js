const fs = require('fs');
const ytdl = require('ytdl-core');

url = ''

ytdl(url, {quality: 'highestaudio'})
.pipe(fs.createWriteStream(`${title}.mp3`))
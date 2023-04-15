Hello :smile: 
With this app you'll be able to download every single song from a Youtube playlist :headphones:


Requisites:
  - The playlist must be in public.
  - You'll need to have ffmpeg installed on your computer, otherwise, the songs will be downloaded on the web format (usually WEBM).
  
  
 Technologies:
  - Im using Cheerio to scrap into the playlist HTML, I prefered this over puppeteer because I didn't need visual information or feedback.
  - I use the Ytdl-core library (this is the heart of the app).
  - Ffmpeg for reformat the song,  necessary to change the format of the song (in my particular case I need them to be in mp3).
  - Electron to bundle all in a basic desktop app.
  
  
  Extra:
  
  - In case you need or prefer to download a video instead of limit it to the sound, you can change the parameters of the ytdl-core library and the ffmpeg format in a few minutes.
  - This app could stop working for a while if youtube change part of the structure (this happens once while it was on development), if this happens I will fix it as soon as I notice.
  

  How to use? 
  - Clone the repository.
  - Install dependencies.
  - Run "npm run make".
  - Search your program on the out/make/X folder.
  - Run the .exe file.
  - Paste playlist link.
  - Wait for the downloads.

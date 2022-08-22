const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { scrap } = require("./scrapLink.js");
const { download } = require("./downloader");

let data = '';
const handleCallback = async (event, link) => {
  const songsList = await scrap(link);
  await data.send('dataChannel', songsList)
  await download(songsList)
};

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 600,
    defaultEncoding: "utf-8",
    webPreferences: {
      preload: path.join(__dirname, "loader.js"),
    },
  });
  win.loadFile("index.html");
  data = win.webContents
};

app.whenReady().then(() => {
  ipcMain.on("submit", handleCallback);
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

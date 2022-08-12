const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { scrap } = require("./scrapLink.js");
require("electron-reload")(__dirname);

const handleCallback = async (event, link) => {
  const data = await scrap(link);
  data.forEach((song) => console.log(song.name));
};

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "loader.js"),
    },
  });
  win.loadFile("index.html");
};

app.whenReady().then(() => {
  ipcMain.on("submit", handleCallback);
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

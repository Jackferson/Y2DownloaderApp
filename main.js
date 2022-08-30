const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { scrap } = require("./scrapLink.js");
const { download } = require("./downloader");
const appWindow = require(path.join(__dirname, "window"));
let window;
const handleCallback = async (event, link) => {
  const songsList = await scrap(link);
  await window.send("dataChannel", songsList);
  await download(songsList, window);
};

app.whenReady().then(() => {
  window = appWindow.createWindow();
  ipcMain.on("submit", handleCallback);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    appWindow.createWindow();
  }
});

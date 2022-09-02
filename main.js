const { app, BrowserWindow, ipcMain } = require("electron");
const { scrap } = require("./scrapLink.js");
const { download } = require("./downloader");
const appWindow = require("./window.js");
const filePath = require("./filePath.js");

const folderSelector = filePath.folderSelector;
let window;

const handleCallback = async (event, link) => {
  const songsList = await scrap(link);
  await window.send("dataChannel", songsList);
  await download(songsList, window);
};

app.whenReady().then(() => {
  window = appWindow.createWindow();
  ipcMain.on("submit", handleCallback);
  ipcMain.on("folderSelector", folderSelector);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    appWindow.createWindow();
  }
});

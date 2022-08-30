const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const { scrap } = require("./scrapLink.js");
const { download } = require("./downloader");
const appWindow = require("./window.js");
const os = require('os');

let window;
let folder = path.join(os.homedir(), '/downloads');

const handleCallback = async (event, link) => {
  const songsList = await scrap(link);
  await window.send("dataChannel", songsList);
  await download(songsList, window, folder);
};

app.whenReady().then(() => {
  window = appWindow.createWindow();
  ipcMain.on("submit", handleCallback);
  ipcMain.on("folderSelector", folderSelector);
});

const folderSelector = (event) => {
  {
    dialog
      .showOpenDialog({
        properties: ["openFile", "openDirectory"],
      })
      .then((result) => {
        if(result.canceled){
        }else{
          folder = result.filePaths
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    appWindow.createWindow();
  }
});

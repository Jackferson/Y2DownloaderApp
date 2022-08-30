const { app, BrowserWindow } = require("electron");
const path = require("path");

let window;
const createWindow = () => {
  window = new BrowserWindow({
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "loader.js"),
    },
  });
  window.loadFile("index.html").then(() => {
    window.show();
  });
  return window;
};

function get() {
  return window;
}

module.exports = { get, createWindow };

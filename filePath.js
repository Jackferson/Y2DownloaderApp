const { dialog } = require("electron");
const path = require("path");
const os = require("os");

const get = () => {
  return folder;
};
let folder = path.join(os.homedir(), "/downloads");

const folderSelector = () => {
  {
    dialog
      .showOpenDialog({
        properties: ["openFile", "openDirectory"],
      })
      .then((result) => {
        if (result.canceled) {
        } else {
          folder = result.filePaths;
          console.log(folder);
          return folder
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

module.exports = { folderSelector, get };

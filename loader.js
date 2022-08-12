const {contextBridge, ipcRenderer} = require('electron');



contextBridge.exposeInMainWorld('services', {
  scrap: (link) => ipcRenderer.send('submit', link)
})
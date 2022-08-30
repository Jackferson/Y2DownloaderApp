const {contextBridge, ipcRenderer} = require('electron');



contextBridge.exposeInMainWorld('services', {
  scrap: (link) => ipcRenderer.send('submit', link),
  getData: (callback)=> ipcRenderer.on('dataChannel', (callback)),
  update: (message)=>ipcRenderer.on('update', message)
})
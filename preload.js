const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveImage: (name, data) => ipcRenderer.invoke('save-image', { name, data }),
  loadImages: () => ipcRenderer.invoke('load-images'),
});
const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require('fs');
const path = require('path');

// folder to permanently store images
const imagesDir = path.join(app.getPath('userData'), 'pocket-images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

// save a new image
ipcMain.handle('save-image', (event, { name, data }) => {
  const filePath = path.join(imagesDir, name);
  fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
  return filePath;
});

// load all saved images on startup
ipcMain.handle('load-images', () => {
  const files = fs.readdirSync(imagesDir);
  return files.map(file => {
    const filePath = path.join(imagesDir, file);
    const data = fs.readFileSync(filePath).toString('base64');
    const ext = path.extname(file).slice(1);
    return `data:image/${ext};base64,${data}`;
  });
});

function createWindow() {
  const win = new BrowserWindow({
    width: 300,
    height: 500,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    frame: false,
    transparent: false,
    webPreferences: {
      contextIsolation: true,
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js') // ← added
    }
  });

  win.loadFile("index.html");
  /* win.webContents.openDevTools(); */
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
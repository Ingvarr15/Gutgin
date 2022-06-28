const {app, BrowserWindow, nativeImage} = require('electron');
require('@electron/remote/main').initialize();
const path = require('path');
const isDev = require('electron-is-dev');
const image = nativeImage.createFromPath(__dirname + '/logo512.png');

image.setTemplateImage(true);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: image,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (!isDev) {
    win.removeMenu();
  }

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );
}

app.on('ready', createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

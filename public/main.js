const {app, BrowserWindow, nativeImage, ipcMain} = require('electron');
const {
  default: installExtension,
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS,
} = require('electron-devtools-installer');
require('@electron/remote/main').initialize();
const path = require('path');
const isDev = require('electron-is-dev');
const image = nativeImage.createFromPath(__dirname + '/logo512.png');

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

  if (process.platform === 'win32') {
    app.setAppUserModelId('Gutgin');
  }

  if (!isDev) {
    win.removeMenu();
  } else {
    win.webContents.once('dom-ready', async () => {
      await installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err))
        .finally(() => {
          win.webContents.openDevTools();
        });
    });
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

const { autoUpdater } = require('electron-updater');
const { ipcMain } = require('electron');

module.exports = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Skipping auto-update checks in development');
    return;
  }

  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update_available');
  });

  autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update_downloaded');
  });
};
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');
const Store = require('electron-store');
const db = require('./database');

const store = new Store();

let mainWindow;

function createWindow() {
  // Verifica se já existe configuração de banco de dados
  const hasDbConfig = store.has('dbConfig');

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  // Carrega a tela apropriada baseada na configuração
  if (hasDbConfig) {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index/index.html'));
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/setup/setup.html'));
  }

  // Verifica por atualizações
  autoUpdater.checkForUpdatesAndNotify();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC Handlers
ipcMain.on('save-db-config', (event, config) => {
  store.set('dbConfig', config);
  db.initialize(config);
  mainWindow.loadFile(path.join(__dirname, '../renderer/index/index.html'));
});

ipcMain.on('get-db-config', (event) => {
  event.returnValue = store.get('dbConfig') || null;
});

ipcMain.on('test-db-connection', async (event, config) => {
  try {
    await db.testConnection(config);
    event.returnValue = { success: true };
  } catch (error) {
    event.returnValue = { success: false, error: error.message };
  }
});
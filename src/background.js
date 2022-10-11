"use strict";
import path from "path";

const { autoUpdater } = require("electron-updater");
import { app, protocol, BrowserWindow, ipcMain, shell } from "electron";

import { createProtocol } from "vue-cli-plugin-electron-builder/lib";

// Setup logger
autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";

// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  {
    scheme: "app",
    privileges: {
      secure: true,
      standard: true,
    },
  },
]);

ipcMain.on("updateVersion", (event, arg) => {
  autoUpdater.checkForUpdates();
});

ipcMain.on("openLink", async (event, arg) => {
  shell.openExternal(arg);
});

let win;
ipcMain.on("gradeFilter", async (event, arg) => {
  event.reply("resetGrade", arg);
});
async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    minWidth: 1250,
    minHeight: 760,
    webPreferences: {
      devTools: true,
      webSecurity: false,
      plugins: true,
      nodeIntegration: true,
    },
    icon: path.join(__static, "icon.png"),
  });
  win.setContentProtection(true);
  win.setTitle("CAMMA Microfinance");
  win.setMenu(null);
  win.maximize();

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_loadingScreen) win.webContents.openDevTools();
  } else {
    win.webContents.openDevTools();
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
}
// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  createWindow();
});
app.name = "CAMMA Microfinance";

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

// Setup updater events
autoUpdater.on("checking-for-update", () => {
  win.webContents.send("checking-for-update");
});

autoUpdater.on("update-downloaded", () => {
  autoUpdater.quitAndInstall();
});

autoUpdater.on("err", (error) => {
  console.error(error);
});

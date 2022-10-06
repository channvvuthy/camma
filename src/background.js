'use strict';
import path from 'path'
const fs = require("fs");
let request = require('request');
const ytdl = require('ytdl-core');
let {CookieMap} = require('cookiefile/http-cookiefile')
let cookieFile = new CookieMap(path.join(__static, 'cookies.txt'));
const cookies = cookieFile.toRequestHeader().replace('Cookie: ', '');

var sudo = require("sudo-prompt");

const {autoUpdater} = require('electron-updater')
import {
    app,
    protocol,
    BrowserWindow,
    ipcMain,
    shell,
} from 'electron'

import {
    createProtocol
} from 'vue-cli-plugin-electron-builder/lib'


import axios from "axios"

// Setup logger
autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = 'info'

function chmodDirectory(directory){
    fs.access(directory, fs.constants.R_OK | fs.constants.W_OK, (err)=>{
        if(err){
            var options = {
                name:"CAMMA",
                icon: path.join(__static,'icon.png')
            }

            sudo.exec(`chmod -R 777 ${directory}`,options,function(error, stdout,stderr){
                if(error) throw error
                return error

            })
        }else{
            return false
        }
    });
}


const downloadFile = async (fileUrl, info) => {
    // Get the file name
    const fileName = info._id
    // The path of the downloaded file on our machine
    const myInstalledDir = path.join(app.getAppPath(), "..", "..", "CAMMA", fileName);
    //write something to root installation folder
    let dir = path.join(app.getAppPath(), "..", "..", "CAMMA");
    chmodDirectory(path.join(app.getAppPath(), "..", ".."))

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    
    try {
        const response = await axios({
            method: "GET",
            url: fileUrl,
            responseType: "stream",
        });
        await response.data.pipe(fs.createWriteStream(myInstalledDir).on('finish', () => {
            info.url = path.join(app.getAppPath(), "..", "..", "CAMMA", info._id);
            win.webContents.send("downloadComplete", info)
        }));
    } catch (err) {
        throw new Error(err);
    }
};

const opt = {
    requestOptions: {
        headers: {
            'Cookie': cookies
        }
    }
};


// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
    scheme: 'app',
    privileges: {
        secure: true,
        standard: true
    }
}]);

ipcMain.on("updateVersion", (event, arg) => {
    autoUpdater.checkForUpdates()
})

ipcMain.on("download", (event, arg) => {
    ytdl.getBasicInfo("https://www.youtube.com/watch?v=" + arg.video_youtube, opt).then(res => {
        try {
            let fileUrl = res.player_response.streamingData.formats.filter(item => item.itag === arg.quality)[0].url
            downloadFile(fileUrl, arg).then(() => {
                // arg.url = path.join(app.getAppPath(), "..", "..", "CAMMA", arg._id);
                // event.reply("downloadComplete", arg)
            }).catch(err => {
                event.reply("downloadFailed", arg)
                throw new Error(err);
            })
        } catch (err) {
            event.reply("downloadFailed", arg)
            throw new Error(err);
        }

    });
});
ipcMain.on("nextDownload", (event, arg) => {
    event.reply('nextDownload', arg)
})

ipcMain.on("removeDownload", (event, arg) => {
    let dir = path.join(app.getAppPath(), "..", "..", "CAMMA", arg)
    fs.unlink(dir, (err) => {
        if (err) {
            console.error(err)
            return
        }
    })
})


ipcMain.on("openLink", async (event, arg) => {
    shell.openExternal(arg)
})

ipcMain.on("youtubeVideo", async (event, arg) => {
    ytdl.getBasicInfo("https://www.youtube.com/watch?v=" + arg, opt).then(res => {
        event.reply('youtubeVideo', res.player_response.streamingData.formats)
    });
})

ipcMain.on("nextVideo", async (event, arg) => {
    ytdl.getBasicInfo("https://www.youtube.com/watch?v=" + arg, opt).then(res => {
        event.reply('nextVideo', res.player_response.streamingData.formats)
    });
})

let win
ipcMain.on("gradeFilter", async (event, arg) => {
    event.reply('resetGrade', arg)
})
async function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        minWidth: 1250,
        minHeight: 760,
        webPreferences: {
            devTools: true,
            webSecurity: false,
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
        },
        icon: path.join(__static, 'icon.png')
    });
    win.setContentProtection(true)
    win.setTitle("CAMMA Microfinance")
    win.setMenu(null);
    win.maximize();

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_loadingScreen) win.webContents.openDevTools()
    } else {


        createProtocol('app');
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }
}
// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    createWindow()
});
app.name = "CAMMA Microfinance"


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}


// Setup updater events
autoUpdater.on('checking-for-update', () => {
    win.webContents.send("checking-for-update")
});

autoUpdater.on("update-downloaded", () => {
    autoUpdater.quitAndInstall()
});

autoUpdater.on('err', (error) => {
    console.error(error)
})

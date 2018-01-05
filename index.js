const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
//SET ENV
//process.env.NODE_ENV = 'production';//development
// 개발모드인지 운영모드인지 파악
const isDev = require('electron-is-dev')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
    // Create the browser window.
    // 1. BrowserWindow 를 생성함 ( https://electronjs.org/docs/api/browser-window#class-browserwindow)
    // 2. frameless window로 생성하려면.. frame:false 를 options에 추가하면 됨.
    // https://electronjs.org/docs/api/frameless-window
    win = new BrowserWindow({frame: false, fullscreen:true}) //, {width: 800, height: 600}{frame: false, fullscreen:true}
    if( isDev ){
        // and load the index.html of the app.
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'mainDev.html'),
            protocol: 'file:',
            slashes: true
        }))
        // Open the DevTools.
        win.webContents.openDevTools()
    }else{
        // and load the index.html of the app.
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'main.html'),
            protocol: 'file:',
            slashes: true
        }))
    }

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
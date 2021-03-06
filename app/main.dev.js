/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow } from 'electron';
import MenuBuilder from './menu';

console.log('찍혀라[main.dev]', process.env.NODE_ENV);
let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  console.log('찍혀라[main.dev]', '뭘 설치하나벼');
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('ready', async () => {
  /*
  // 앱실행전에 mosca broker 실행
  const spawnmosca = require('child_process').spawn;
  spawnmosca('mosca', ['-v', '|', 'pino'], {
    stdio: 'ignore',
    detached: true
  }).unref();
  console.log('mosca spawn done');
  // 앱실행전에 python 제스쳐인식스크립트 실행
  const spawnpython = require('child_process').spawn;
  spawnpython('python3', ['test.py'], {
    stdio: 'ignore',
    detached: true
  }).unref();
  console.log('python test.py');
  */
  // 기존코드
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }
  console.log('찍혀라[main.dev]', 'ready 되면 BrowserWindow 생성해야지');
  console.log('찍혀라[main.dev]', __dirname);
  // $$$$$ __dirname 확인.
  // $$$$$ developmennt 일경우 - /home/jinia/Documents/GitHub/electron-react-boilerplate/app
  // $$$$$ production 일경우 - /tmp/.mount_electrVqlwVQ/app/resources/app.asar

  if (process.env.NODE_ENV === 'development') {
    // mainWindow = new BrowserWindow({ frame: false, width: 656, height: 416 });
    mainWindow = new BrowserWindow({ frame: false, width: 1184, height: 624 });
    // mainWindow = new BrowserWindow({ frame: false, fullscreen: true });
  } else {
    mainWindow = new BrowserWindow({ frame: false, fullscreen: true });
  }

  /*
  //$$$$$ mainWindow 를 fullscreen 으로 변경했음: frame: false, fullscreen:true
    mainWindow = new BrowserWindow({ show: false, width: 1024, height: 728 });
  */

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('찍혀라[main.dev]', '로딩이 되어나벼');
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

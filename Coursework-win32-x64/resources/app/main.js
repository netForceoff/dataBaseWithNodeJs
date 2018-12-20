const electron = require('electron');
const {app, BrowserWindow} = electron;

app.on('ready', () => {
  let win = new BrowserWindow({width: 1350, height: 520});
  win.loadURL(`file://${__dirname}/index.html`);
});

exports.openWindow = (filename, x, y) => {
    let openWin = new BrowserWindow({width:x, height: y});
    openWin.loadURL(`file://${__dirname}/` + filename + `.html`);
}

require('electron-reload')(__dirname);
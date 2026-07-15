// win.webContents.openDevTools();

const { app, BrowserWindow, Menu } = require("electron");
const process = require("process");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 500,
    height: 700,
    frame: false,
    resizable: false,
    backgroundColor: "#00000000",
    hasShadow: false,
    transparent: true,
  });
  Menu.setApplicationMenu(null);
  win.loadURL("http://localhost:5173");
};

app.whenReady().then(() => {
  createWindow();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

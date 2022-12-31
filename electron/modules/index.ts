import { ipcMain, BrowserWindow } from "electron";

export function closeWindow(win: BrowserWindow) {
  ipcMain.on("close-window", () => {
    win.close();
  });
}

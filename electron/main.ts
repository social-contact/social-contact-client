import { app, protocol, BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";

import fs from "fs";
import path from "path";

// 引入窗口
import createWindow from "./window/mainWindow";
import loginWindow from "./window/loginWindow";

// 引入模块

const isDevelopment = process.env.NODE_ENV !== "production";

export let mainWin: BrowserWindow | null = null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

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
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", (e as Error).toString());
    }
  }

  mainWin = await loginWindow(); // 登录窗口
  // 获取保存的账号密码
  const user: ElectronUserAccount = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../public/info/user.json")).toString()
  );
  // 判断是否保存用户账号
  if (user.username) {
    ipcMain.on("get-user-info-main", (event: IpcMainEvent) => {
      event.reply("get-user-info-render", user);
    });
  }

  // 接收登录
  ipcMain.on("login", async (event: IpcMainEvent, data: string) => {
    // 保存登录信息
    fs.writeFileSync(path.join(__dirname, "../public/info/token.json"), data);
    (mainWin as BrowserWindow).close();
    mainWin = await createWindow();
  });
});

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

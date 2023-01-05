import { app, protocol, BrowserWindow, ipcMain } from "electron";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";

// 引入窗口
import AuthWindow from "./window/authWindow";
import MainWindow from "./window/mainWindow";

// 引入模块
import { ElectronWindowType } from "./electron-window";
import CommonWindow from "./window/common";

const isDevelopment = process.env.NODE_ENV !== "production";

export let mainWin: CommonWindow | null = null;

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
  if (BrowserWindow.getAllWindows().length === 0) new AuthWindow();
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

  mainWin = new AuthWindow();
});

ipcMain.on(
  "switch-window",
  (event: Electron.IpcMainEvent, winType: ElectronWindowType) => {
    const mainWinType = (mainWin && mainWin.getType()) || "";

    console.info("switch-window", winType);

    // if (mainWin) {
    //   mainWin.destroy();
    // }

    if (mainWinType === winType) return;
    switch (winType) {
      case ElectronWindowType.Auth:
        mainWin = new AuthWindow();
        break;
      case ElectronWindowType.Main:
        mainWin = new MainWindow();
        break;
      default:
        break;
    }
  }
);

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

process.on("uncaughtException", function (error) {
  console.info("====error====");
  console.error(error);
  console.info("====error====");
  // Handle the error
});

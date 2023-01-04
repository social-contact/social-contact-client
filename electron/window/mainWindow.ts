import { BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";

// Scheme must be registered before the app is ready
export default async function createWindow(): Promise<BrowserWindow> {
  // Create the browser window.
  let win: BrowserWindow | null = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false, // 无边框
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env
        .ELECTRON_NODE_INTEGRATION as unknown as boolean,
      contextIsolation: !(process.env
        .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(
      (process.env.WEBPACK_DEV_SERVER_URL as string) + "#sessions"
    );
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    // #home 在加载时跳转到指定路由（#路由地址）
    win.loadURL("app://./index.html#sessions");
  }

  win.on("close", () => {
    // 窗口退出时发送
    (win as BrowserWindow).webContents.send("window-close");
    win = null; //删除引用，释放内存，防止内存泄露
  });
  return win;
}

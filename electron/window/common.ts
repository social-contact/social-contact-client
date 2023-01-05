import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";
import { trimEnd } from "lodash";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import { ElectronWindowType } from "~electron/window-type";

interface IBrowserWindowConstructorOptions
  extends BrowserWindowConstructorOptions {
  windowType: ElectronWindowType;
  loadUrl: (host: string) => string;
}

export default class CommonWindow {
  private win: BrowserWindow | null;
  private windowType: ElectronWindowType;
  private loadUrlFormatter: IBrowserWindowConstructorOptions["loadUrl"];

  constructor(options: IBrowserWindowConstructorOptions) {
    this.win = new BrowserWindow(options);
    this.windowType = options.windowType;
    this.loadUrlFormatter = options.loadUrl;
    this.initWindow();
  }

  private async initWindow() {
    if (this.win) {
      if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await this.loadUrl(process.env.WEBPACK_DEV_SERVER_URL);
        if (!process.env.IS_TEST) this.win.webContents.openDevTools();
      } else {
        createProtocol("app");
        // Load the index.html when not in development
        // #home 在加载时跳转到指定路由（#路由地址）
        this.loadUrl("app://./index.html");
      }

      this.win.on("close", () => {
        // 窗口退出时发送
        (this.win as BrowserWindow).webContents.send("window-close");
        this.win = null; //删除引用，释放内存，防止内存泄露
      });
    } else Promise.reject(new Error("Variable window is undefined."));
  }

  private loadUrl(url: string): Promise<void> {
    if (!this.win) return Promise.reject();
    return this.win.loadURL(this.loadUrlFormatter(trimEnd(url, "/")));
  }

  getType() {
    return this.windowType;
  }

  /**
   * 获取 Window 实例
   * @returns {BrowserWindow} Electron 视窗实例
   */
  getWindow() {
    return this.win;
  }

  /**
   * 软关闭页面
   */
  close() {
    this.win && this.win.close();
  }

  /**
   * 销毁页面实例
   */
  destroy() {
    this.win && this.win.destroy();
  }
}

import { ElectronWindowType } from "../electron-window";
import CommonWindow from "./common";

export default class AuthWindow extends CommonWindow {
  constructor() {
    super({
      width: 300,
      height: 450,
      frame: false, // 无边框
      resizable: false, // 不允许改变窗口大小
      webPreferences: {
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: process.env
          .ELECTRON_NODE_INTEGRATION as unknown as boolean,
        contextIsolation: !(process.env
          .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      },
      windowType: ElectronWindowType.Auth,
      loadUrl: (host) => `${host}/auth`,
    });
  }
}

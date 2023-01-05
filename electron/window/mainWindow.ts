import { ElectronWindowType } from "../window-type";
import CommonWindow from "./common";

export default class MainWindow extends CommonWindow {
  constructor() {
    super({
      width: 1200,
      height: 800,
      frame: false, // 无边框
      webPreferences: {
        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: process.env
          .ELECTRON_NODE_INTEGRATION as unknown as boolean,
        contextIsolation: !(process.env
          .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      },
      windowType: ElectronWindowType.Main,
      loadUrl: (host) => `${host}/`,
    });
  }
}

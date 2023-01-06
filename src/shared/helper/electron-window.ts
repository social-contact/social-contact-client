import { ipcRenderer } from "electron";
import { ElectronWindowType } from "~electron/window-type";

class ElectronWindowHelper {
  open(winType: ElectronWindowType) {
    // ipcRenderer.send("switch-window", winType);
  }

  switch(winType: ElectronWindowType) {
    ipcRenderer.send("switch-window", winType);
  }

  close(winType: ElectronWindowType) {
    // ipcRenderer.send("switch-window", winType);
  }
}

export default new ElectronWindowHelper();

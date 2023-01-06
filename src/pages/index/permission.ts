import router from "./plugins/router";
import { ElectronWindowType } from "~electron/window-type";
import useUserStore from "@/plugins/store/modules/user";
import { ipcRenderer } from "electron";

export class AppPermission {
  private static instance: AppPermission;

  private mainRouteName = "AppMain";
  private authRouteName = "AuthIndex";
  private userStore;
  constructor() {
    this.userStore = useUserStore();
    this.register();
  }

  register() {
    router.beforeEach((to, from, next) => {
      //   console.info(to, this.userStore.isLogin);
      // if (this.userStore.isLogin) {
      //   if (to.name === this.authRouteName) next({ path: "/" });
      // } else {
      //   if (to.meta.bypassLogin !== true) next({ name: this.authRouteName });
      //   else next();
      // }

      if (!this.userStore.isLogin && to.name !== this.authRouteName) {
        ipcRenderer.send("switch-window", ElectronWindowType.Auth);
      }

      next();
    });
  }

  public static getInstance() {
    if (!AppPermission.instance) {
      AppPermission.instance = new AppPermission();
    }
    return AppPermission.instance;
  }
}

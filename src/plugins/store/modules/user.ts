import { defineStore } from "pinia";

interface State {
  userInfo: {
    account: string;
    password: string;
  };
  accessToken: string;
}

export const userStore = defineStore("userStore", {
  state: (): State => ({
    userInfo: {
      account: "",
      password: "",
    },
    accessToken: "",
  }),
  getters: {
    getUserInfo: (state: State) => state.userInfo,
  },
  actions: {
    authLogin(res: LoginData): Promise<void> {
      this.userInfo.account = res.account;
      // this.userInfo.password = res.password;
      this.accessToken = res.accessToken;
      return Promise.resolve();
    },
    logout() {
      this.accessToken = "";
      this.userInfo.password = "";
    },
  },
  persist: true,
});

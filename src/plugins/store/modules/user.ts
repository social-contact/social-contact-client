import { defineStore } from "pinia";

interface State {
  userInfo: {
    account: string;
    password: string;
  };
  accessToken: string;
}

const useUserStore = defineStore("user", {
  state: (): State => ({
    userInfo: {
      account: "",
      password: "",
    },
    accessToken: "",
  }),
  getters: {
    getUserInfo: (state: State) => state.userInfo,
    isLogin: (state) => !!state.accessToken,
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

export default useUserStore;

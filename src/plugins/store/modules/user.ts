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
  getters: {},
  actions: {},
  persist: true,
});

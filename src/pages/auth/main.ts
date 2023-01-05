import { createApp } from "vue";
import App from "./App.vue";
import router from "./plugins/router";
import store from "@/plugins/store";

// socket.io
import socket from "@/plugins/socket/index";

// 初始化样式
import "@/styles/reset.css";

const app = createApp(App);

// 注册
app.use(socket, {
  connection: "http://www.yuzuchan.top:3000",
  options: {
    autoConnect: false, //关闭自动连接
    // ...其它选项
  },
});
app.use(store);
app.use(router);
app.mount("#app");

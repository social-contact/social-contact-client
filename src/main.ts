import { createApp } from "vue";
import App from "./App.vue";
import router from "./plugins/router";
import store from "./plugins/store";

// 初始化样式
import "@/style/reset.css";

const app = createApp(App);

// 注册
app.use(store);
app.use(router);
app.mount("#app");

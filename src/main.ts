import { createApp } from "vue";
import App from "./App.vue";
import router from "./plugins/router";

// 初始化样式
import "@/style/reset.css";

createApp(App).use(router).mount("#app");

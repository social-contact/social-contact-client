import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { ElectronWindowType } from "~electron/electron-window";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "AppMain",
    component: () => import("@/layout/appMain.vue"),
    meta: { title: "登录", window: ElectronWindowType.Main },
    children: [
      {
        path: "/",
        name: "SessionIndex",
        component: () => import("@/views/session/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;

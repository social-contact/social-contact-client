import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { ElectronWindowType } from "~electron/window-type";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "AuthLayout",
    component: () => import("../../layouts/AuthMain.vue"),
    meta: { bypassLogin: true, window: ElectronWindowType.Auth },
    children: [
      {
        path: "/",
        redirect: "login",
      },
      {
        path: "login",
        name: "AuthLoginIndex",
        component: () => import("../../views/login/Index.vue"),
        meta: { title: "登录" },
      },
      {
        path: "register",
        name: "AuthRegisterIndex",
        component: () => import("../../views/register/Index.vue"),
        meta: { title: "注册" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;

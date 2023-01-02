import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/auth",
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/views/auth/index.vue"),
  },
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/layout",
        redirect: "/home",
      },
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;

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
    path: "/layouts",
    name: "layouts",
    component: () => import("@/layouts/index.vue"),
    children: [
      {
        path: "/layouts",
        redirect: "/sessions",
      },
      {
        path: "/sessions",
        name: "sessions",
        component: () => import("@/views/sessions/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;

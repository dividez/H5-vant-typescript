import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";
import { PAGE_NOT_FOUND_ROUTE } from "@/router/basic";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: Layout,
    redirect: { name: "demo" },
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("@/views/login/index.vue"),
        meta: {
          title: "登录",
          showTabBar: false,
        }
      },
      {
        path: "/demo",
        name: "demo",
        component: () => import("@/views/demo/index.vue"),
        meta: {
          title: "demo",
          showTabBar: false,
          noCache: true,
          useBackTop: true
        }
      }
    ]
  },
  PAGE_NOT_FOUND_ROUTE
];

export default routes;

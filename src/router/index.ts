import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized
} from "vue-router";
import routes from "./routes";
import type { App } from 'vue';

export const router = createRouter({
  history: createWebHistory("/"),
  routes: routes,

  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
});

export interface toRouteType extends RouteLocationNormalized {

}

export function setupRouter(app: App<Element>) {
  app.use(router);
}
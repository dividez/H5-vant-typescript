import type { Router, RouteLocationNormalized } from 'vue-router';
import { createPermissionGuard } from './permissionGuard';
import NProgress from "@/utils/progress";
import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import setPageTitle from "@/utils/set-page-title";
import type { toRouteType } from "@/router";

export function setupRouterGuard(router: Router) {
  createPermissionGuard(router);
  useCachedViewStoreGuard(router);
}

function useCachedViewStoreGuard(router: Router) {
  router.beforeEach((to: toRouteType, from, next) => {
    NProgress.start();
    // 路由缓存
    useCachedViewStoreHook().addCachedView(to);
    // 页面 title
    setPageTitle(to.meta.title);
    next();
  });

  router.afterEach(() => {
    NProgress.done();
  });
}
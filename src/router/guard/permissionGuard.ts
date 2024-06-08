import type { Router, RouteRecordRaw } from "vue-router";

import { useUserStoreHook } from "@/store/modules/user";
import { PageEnum } from "@/router/pageEnum";
import { PAGE_NOT_FOUND_ROUTE } from "@/router/basic";
import {isEmpty} from "@/utils/is";

const LOGIN_PATH = PageEnum.BASE_LOGIN;

declare type Recordable<T = any> = Record<string, T>;

const whitePathList: PageEnum[] = [LOGIN_PATH];

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreHook();
  router.beforeEach(async (to, from, next) => {
    const token = userStore.getToken;

    // Whitelist can be directly entered
    if (whitePathList.includes(to.path as PageEnum)) {
      if (to.path === LOGIN_PATH && token) {
        try {
          await userStore.afterLoginAction();
          next(decodeURIComponent((to.query?.redirect as string) || "/"));
          return;
        } catch {
          //
        }
      }
      next();
      return;
    }
    // token or user does not exist
    if (!token) {
      // You can access without permission. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next();
        return;
      }

      // redirect login page
      const redirectData: {
        path: string;
        replace: boolean;
        query?: Recordable<string>;
      } = {
        path: LOGIN_PATH,
        replace: true
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path
        };
      }
      console.log('redirectData', redirectData)
      next(redirectData);
      return;
    }
    // get userinfo while is empty
    if (token && isEmpty(userStore.getUserInfo)) {
      console.log('123')
      try {
        await userStore.getUserInfoAction();
      } catch (err) {
      }
    }

    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      // 遇到不存在页面，后续逻辑不再处理redirect（阻止下面else逻辑）
      from.query.redirect = "";

      if (from.path === LOGIN_PATH && to.fullPath !== PageEnum.BASE_HOME) {
        // 登陆重定向不存在路由，转去“首页”
        next({ path: PageEnum.BASE_HOME, replace: true });
      } else {
        // 正常前往“404”页面
        next();
      }
    } else if (from.query.redirect) {
      // 存在redirect
      const redirect = decodeURIComponent(
        (from.query.redirect as string) || ""
      );

      if (redirect === to.fullPath) {
        // 已经被redirect
        next();
      } else {
        // 指向redirect
        next({ path: redirect, replace: true });
      }
    } else {
      // 正常访问
      next();
    }
  });
}

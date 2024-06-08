import { defineStore } from "pinia";
import { store } from "@/store";
import { router } from "@/router";
import { PageEnum } from "@/router/pageEnum";
import { getUserInfoApi } from "@/api/authApi";
import { loginApi } from "@/api/authApi";
import type { LoginParams } from "@/api/authApi";
import type { LocationQueryValue } from "vue-router";
import {
  clearAuthCache,
  getAuthCache,
  getAuthToken,
  setAuthCache,
  setToken
} from "@/utils/auth";
import { USER_INFO_KEY } from "@/utils/cache/cacheEnum";

interface UserState {
  userInfo: any;
  token: string;
}

export const useUserStore = defineStore({
  id: "app-user",
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: ""
  }),
  getters: {
    getUserInfo(state): any {
      return state.userInfo || getAuthCache<any>(USER_INFO_KEY) || {};
    },
    getToken(state): string {
      console.log('state.token', state.token)
      console.log('getAuthToken', getAuthToken())
      return state.token || getAuthToken();
    }
  },
  actions: {
    setToken(token: string | undefined) {
      this.token = token ? token : "";
      setToken(token);
    },
    setUserInfo(info: any) {
      this.userInfo = info ? info : null;
      setAuthCache(USER_INFO_KEY, info, false);
    },
    async afterLoginAction(goHome?: boolean): Promise<any | null> {
      if (!this.getToken) return null;
      // get user info
      console.log('789')
      const userInfo = await this.getUserInfoAction();
      console.log("afterLoginAction userInfo", userInfo);
      goHome && (await router.replace("/"));
      return userInfo;
    },

    async getUserInfoAction(): Promise<any | null> {
      if (!this.getToken) return null;
      const userInfo = await getUserInfoApi();
      this.setUserInfo(userInfo);
      return userInfo;
    },
    async login(
      params: LoginParams & {
        goHome?: boolean;
      }
    ): Promise<any> {
      try {
        const { goHome = true, ...loginParams } = params;
        const { token } = await loginApi(loginParams);
        // save token
        this.setToken(token);
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      this.setToken(undefined);
      this.setUserInfo(null);
      clearAuthCache(true)
      if (goLogin) {
        // 直接回登陆页
        router.replace(PageEnum.BASE_LOGIN);
      } else {
        // 回登陆页带上当前路由地址
        router.replace({
          path: PageEnum.BASE_LOGIN,
          query: {
            redirect: encodeURIComponent(router.currentRoute.value.fullPath)
          }
        });
      }
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}

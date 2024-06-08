import { RoleEnum } from '@/enums/roleEnum';

export {};

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    // 标题
    title: string;
    // 是否展示 NavBar
    showNavBar?: boolean;
    // 是否展示 TabBar
    showTabBar?: boolean;
    // 不进行keep-alive
    noCache?: boolean;
    // 返回顶部
    useBackTop?: boolean;
    // 忽略token校验
    ignoreAuth?: boolean;
  }
}

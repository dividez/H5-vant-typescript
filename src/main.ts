import { createApp } from "vue";
import { store } from "./store";
// normalize.css
import "normalize.css/normalize.css";
// 全局样式
import "./styles/index.less";
// tailwindcss
import "./styles/tailwind.css";
// svg icon
import "virtual:svg-icons-register";

// 2. 引入组件样式
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';

import App from "./App.vue";
import { router, setupRouter } from '@/router';
import { setupRouterGuard } from "@/router/guard";

// 阿里巴巴图标引入
import "@/assets/iconfont/iconfont.css";
const app = createApp(App);
app.use(store);

setupRouter(app);
// 路由守卫
setupRouterGuard(router);

app.mount("#app");

import Layout from "@/layout/index.vue";
import type {RouteRecordRaw} from "vue-router";
import {PAGE_NOT_FOUND_NAME} from "@/router/pageEnum";

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw =
    {
        path: "/:pathMatch(.*)*",
        name: PAGE_NOT_FOUND_NAME,
        component: Layout,
        meta: {
            title: "ErrorPage",
            ignoreAuth: true,
        },
        children: [
            {
                path: "/:pathMatch(.*)*",
                name: PAGE_NOT_FOUND_NAME,
                component: () => import("@/views/error/index.vue"),
                meta: {
                    title: "ErrorPage",
                    ignoreAuth: true,
                }
            }
        ]
    }
;

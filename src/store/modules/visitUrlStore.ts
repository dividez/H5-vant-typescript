import { defineStore } from "pinia";
import { store } from "@/store";

export const useVisitUrlStore = defineStore({
    id: "visit-url",
    state: () => ({
        /** ios微信用，记录访问时候页面url */
        visitUrl: ""
    }),
    actions: {
        addVisitUrl(url: string) {
            this.visitUrl = url;
        }
    },
    getters: {
        getVisitUrl(state): any {
            return state.visitUrl
        }
    },
});

export function useVisitUrlStoreHook() {
    return useVisitUrlStore(store);
}

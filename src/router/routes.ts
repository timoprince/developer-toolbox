import {RouteRecordRaw} from "vue-router";

export const routes: RouteRecordRaw[] = [
    {
        path: "/md5",
        component: () => import("@/pages/md5/md5.vue")
    }
];
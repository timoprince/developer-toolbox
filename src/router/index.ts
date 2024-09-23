import {createRouter, createWebHashHistory, useRouter} from "vue-router";
import {routes} from "./routes.ts";

let router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        return {top: 0}
    }
})

router.beforeEach((to, from, next) => {
    next();
})

export default router;

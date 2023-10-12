//从下载的vue-router中导入createRouter
import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"
import statTab from '../components/StatTab.vue';
import visitCountyTab from '../components/visitCountyTab.vue';
// import About from "@/components/About.vue"
//配置映射关系
const routes = [
    //默认
    {
        path: '/',
        //重定向
        redirect: "/stat"
    },
    {
        path: "/stat",
        name: "statTab",
        meta: {
            keepAlive: true
        },
        component: statTab
    },
    {
        path: "/visited/:countyName",
        name: "visitCountyTab",
        component: visitCountyTab
    },
]

//创建路由对象
const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router

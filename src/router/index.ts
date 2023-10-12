//从下载的vue-router中导入createRouter
import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"
import statTab from '../components/StatTab.vue';
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
        component: statTab,
    },
    {
        path: "/potential",
        name: "potentialPage",
        component: () => import('../components/targetSystem/potentialPage.vue')
    },
    {
        path: "/effect",
        name: "effectPage",
        component: () => import('../components/targetSystem/effectPage.vue')
    },
    {
        path: "/target",
        name: "targetPage",
        component: () => import('../components/targetSystem/targetPage.vue')
    },
    {
        path: "/scoreTable",
        name: "scoreTable",
        component: () => import('../components/targetSystem/scoreTable.vue')
    },

]

//创建路由对象
const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router

//从下载的vue-router中导入createRouter
import { createRouter, createWebHistory } from "vue-router";
import statTab from '../components/StatTab.vue';
import administer from '../page/administer.vue';
import culture from '../page/culture.vue';
import industry from '../page/industry.vue';
import nature from '../page/nature.vue';
import password from '../page/password.vue';
import pass from '../page/passwordpage/pass.vue';
import pass1 from '../page/passwordpage/pass1.vue';
import pass2 from '../page/passwordpage/pass2.vue';
import pass3 from '../page/passwordpage/pass3.vue';
import pass4 from '../page/passwordpage/pass4.vue';
import pass5 from '../page/passwordpage/pass5.vue';
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
        path: "/industry",
        name: "industryTab",
        component: industry
    },
    {
        path: "/culture",
        name: "cultureTab",
        component: culture
    },
    {
        path: "/nature",
        name: "natureTab",
        component: nature
    },
    {
        path: "/administer",
        name: "administerTab",
        component: administer
    },
    {
        path: "/password",
        name: "passwordTab",
        component: password,
        redirect:"pass",
        children:[
            {
                path: "/pass",
                name: "passTab",
                component: pass
            },
            {path:"/pass1",
            name:"pass1Tab",
            component:pass1,},
            {path:"/pass2",
            name:"pass2Tab",
            component:pass2,},
            {path:"/pass3",
            name:"pass3Tab",
            component:pass3,},
            {path:"/pass4",
            name:"pass4Tab",
            component:pass4,},
            {path:"/pass5",
            name:"pass5Tab",
            component:pass5,},
        ]
    },
    
]

//创建路由对象
const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router

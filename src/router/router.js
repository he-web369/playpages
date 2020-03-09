import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login/Login.vue'
import Home from '../pages/home/Home.vue'
import Logup from '../pages/logup/Logup.vue'

Vue.use(Router)
export default new Router({
    routes:[
        {path:'/login',component:Login},
        {path:'/logup',component:Logup},
        {path:'/home',component:Home},
        {path:'/',redirect:'/home'}
    ]
})


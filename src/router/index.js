/*
 * @Descripttion:
 * @Author: TaoWang
 * @Date: 2022-08-07 21:45:10
 */
import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../components/Home.vue"
import Login from "../views/SignIn.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "SignIn",
    meta: {
      title: "登录",
    },
    component: Login,
  },
  {
    path: "/register",
    name: "SignUp",
    meta: {
      title: "注册",
    },
    component: () => import("../views/SignUp.vue"),
  },
]

const router = new VueRouter({
  routes,
})

export default router

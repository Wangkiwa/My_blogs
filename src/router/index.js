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
  {
    path: "/editor",
    name: "Editor",
    meta: {
      title: "文章发布",
    },
    component: () => import("../views/Editor.vue"),
  },
  {
    path: "/settings",
    name: "Setting",
    meta: {
      title: "设置",
    },
    component: () => import("../views/Settings.vue"),
  },
  {
    path: "/:username",
    name: "User",
    meta: {
      title: "用户信息",
    },
    component: () => import("../views/User.vue"),
  },
  {
    path: "/article/:articleId",
    name: "Article",
    meta: {
      title: "文章信息",
    },
    component: () => import("../views/Article.vue"),
  },
  {
    path: "/editor/:articleId",
    name: "EditArticle",
    meta: {
      title: "编辑文章",
    },
    component: () => import("../views/Edit.vue"),
  },
]

const router = new VueRouter({
  routes,
})

export default router

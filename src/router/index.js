/*
 * @Descripttion:
 * @Author: TaoWang
 * @Date: 2022-08-07 21:45:10
 */
import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../components/Home.vue"
import Login from "../views/SignIn.vue"
import storage from "@/utils/storage"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      title: "主页",
    },
    component: Home,
  },
  {
    path: "/login",
    name: "SignIn",
    meta: {
      title: "登录",
      // showLogin: true,
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
  scrollBehavior(to, from, scrollBehavior) {
    return { x: 0, y: 0 }
  },
})
// 全局前置路由
router.beforeEach((to, from, next) => {
  if (to.path === "/login" || to.path === "/register" || to.path === "/") {
    return next()
  }
  if (!storage.getItem("userInfo")) {
    console.log("未获得!")
    return next("/login")
  } else {
    next()
  }
  // if (to.path === "/login" || to.path === "/register" || to.path === "/")
  //   return next()
  // if (!storage.getItem("userInfo")) return next("/login")
  // next()
})
// 全局后置路由
router.afterEach((to, from) => {
  document.title = to.meta.title
})
export default router

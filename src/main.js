/*
 * @Descripttion:
 * @Author: TaoWang
 * @Date: 2022-08-07 21:45:10
 */
import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

Vue.config.productionTip = false
console.log("环境变量", process.env)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app")

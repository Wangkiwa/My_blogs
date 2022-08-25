/*
 * @Descripttion:
 * @Author: TaoWang
 * @Date: 2022-08-07 21:45:10
 */
import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import config from "./config/"
import request from "./utils/request"
import dayjs from "dayjs"
import message from "./utils/alert"
import storage from "./utils/storage"
Vue.filter("dateString", function (value) {
  return dayjs(value).format("YYYY-MM-DD HH:mm:ss")
})
Vue.prototype.$http = request
Vue.prototype.$message = message
Vue.prototype.$storage = storage
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app")

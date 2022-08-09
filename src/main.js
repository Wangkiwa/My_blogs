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
import { Button, Message } from "element-ui"
import storage from "./utils/storage"
Vue.use(Button)
Vue.prototype.$http = request
Vue.prototype.$message = Message
Vue.prototype.$storage = storage
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app")

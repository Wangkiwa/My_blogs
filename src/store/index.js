/*
 * @Descripttion:
 * @Author: TaoWang
 * @Date: 2022-08-07 21:45:10
 */
import Vue from "vue"
import Vuex from "vuex"
import storage from "../utils/storage"
import mutations from "./mutations"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: { ...storage.getItem("userInfo"), token: "" } || "",
  },
  getters: {},
  mutations,
  actions: {},
  modules: {},
})

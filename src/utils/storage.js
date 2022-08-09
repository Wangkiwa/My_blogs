/*
 * @Descripttion: storage的封装
 * @Author: TaoWang
 * @Date: 2022-08-07 21:56:50
 */
import config from "@/config"
export default {
  setItem(key, value) {
    let storage = this.getStorage()
    storage[key] = value
    window.localStorage.setItem(config.nameSpace, JSON.stringify(storage))
  },
  getStorage() {
    return JSON.parse(window.localStorage.getItem("myBlog") || "{}")
  },
  getItem(key) {
    return this.getStorage()[key]
  },
  clearItem(key) {
    let storage = this.getStorage()
    delete storage[key]
    window.localStorage.setItem(config.nameSpace, JSON.stringify(storage))
  },
}

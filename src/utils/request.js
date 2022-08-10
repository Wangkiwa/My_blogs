/*
 * @Descripttion: axios的二次封装
 * @Author: TaoWang
 * @Date: 2022-08-07 21:55:44
 */
import axios from "axios"
import config from "../config/index"
import router from "../router/index"
import { Message } from "element-ui"
import storage from "./storage"
const TOKEN_INVALID = "token认证失败，请重新登录！"
const NEXTWORK_ERROR = "网络异常，请稍后重试！"
const VALIDATE_ERROR = "校验失败！"
const $http = axios.create({
  baseURL: config.baseApi,
  timeout: 8000,
})
// 请求拦截
$http.interceptors.request.use(req => {
  // 获取Token
  const { token } = storage.getItem("userInfo") || []
  req.headers.Authorization = "Bearer" + token
  return req
})
// 响应拦截
$http.interceptors.response.use(res => {
  const { status, data } = res
  if (status >= 200 && status < 300) {
    return data
  } else if (status === 401) {
    Message.error(TOKEN_INVALID)
    setTimeout(() => {
      router.push("/login")
    }, 1500)
    return Promise.reject(TOKEN_INVALID)
  } else if (status === 400) {
    return data
  }
})
function request(options) {
  // options.method = options.method || "get"
  // if (options.method.toLowerCase() === "get") {
  //   // get请求将data转为params
  //   options.params = options.data
  // }
  return $http(options)
}
export default request

/*
 * @Descripttion:环境变量配置封装
 * @Author: TaoWang
 * @Date: 2022-08-08 20:18:06
 */
let ENV = process.env.NODE_ENV
let EnvConfig = {
  development: {
    baseApi: "http://localhost:8888/api",
    mockApi: "",
  },
  production: {
    baseApi: "/futurefe.com/api",
    mockApi: "",
  },
}
export default {
  nameSpace: "myBlog",
  ...EnvConfig[ENV],
}

/*
 * @Descripttion:
 * @Author: TaoWang
 * @Date: 2022-08-07 21:45:10
 */
const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  devServer: {
    hot: true,
    proxy: {
      "/api": {
        target: "http://localhost:8888",
      },
    },
  },
  transpileDependencies: true,
})

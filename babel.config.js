/*
 * @Descripttion:
 * @Author: TaoWang
 * @Date: 2022-08-07 21:45:10
 */
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
  ],
}

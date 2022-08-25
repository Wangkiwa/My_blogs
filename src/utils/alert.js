/*
 * @Descripttion: message消息提示框
 * @Author: TaoWang
 * @Date: 2022-08-24 08:04:46
 */
import "../assets/style/alert.css"
function publishMsg(msg, className) {
  const div = document.createElement("div")
  const content = document.createTextNode(msg ? msg : "这是一条成功消息！")
  setTimeout(() => {
    let moveTop = document.querySelectorAll("." + className).length
    div.classList.add(className)
    div.style.cssText = `top: ${moveTop * 60 + 20}px`
    div.appendChild(content)
    document.body.appendChild(div)
  })
  setTimeout(() => {
    document.body.removeChild(div)
  }, 1500)
}
function success(msg) {
  publishMsg(msg, "T-success")
}
function warning(msg) {
  publishMsg(msg, "T-warning")
}
function error(msg) {
  publishMsg(msg, "T-error")
}
export default {
  success,
  warning,
  error,
}

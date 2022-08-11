<!--
 * @Descripttion: 
 * @Author: TaoWang
 * @Date: 2022-08-07 21:45:10
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
  export default {
    mounted() {
      let beginTime = 0 //开始时间
      let differTime = 0 //时间差
      let _this = this
      window.onunload = function () {
        differTime = new Date().getTime() - beginTime
        if (differTime <= 3) {
          // 浏览器关闭
          _this.$storage.clearItem("userInfo")
        }
      }
      window.onbeforeunload = function () {
        beginTime = new Date().getTime()
      }
    },
  }
</script>
<style lang="less">
  @import "./assets/style/reset";
  // 头部区域
  .top-father {
    width: 100%;
    height: 56px;
    .top-wrapper {
      width: 100%;
      height: 56px;
      font-size: 20px;
      display: flex;
      justify-content: space-between;
      line-height: 56px;
      position: relative;
      .top-left {
        margin-left: 55px;
        a {
          color: #5cb85c;
          font-weight: 900;
        }
      }
      .top-right > ul {
        margin-right: 55px;
        display: flex;
        list-style: none;
        li {
          width: 60px;
          a {
            color: rgba(0, 0, 0, 0.3);
          }
          a:hover {
            color: rgba(0, 0, 0, 0.5);
          }
        }
      }
      .userTopRight > ul {
        display: flex;
        float: left;
        li {
          width: 80px;
          text-align: center;
          a {
            color: rgba(0, 0, 0, 0.3);
          }
          a:hover {
            color: rgba(0, 0, 0, 0.5);
          }
        }
        li:last-child {
          margin-right: 82px;
        }
      }
    }
  }
  .article-meta {
    button {
      color: #5cb85c;
      background-color: transparent;
      border: none;
      border: 1px solid #5cb85c;
      border-radius: 14px;
    }
  }
  .active {
    color: #000 !important;
  }
</style>

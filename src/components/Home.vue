<!--
 * @Descripttion:  主页
 * @Author: TaoWang
 * @Date: 2022-08-08 10:16:39
-->
<template>
  <div class="home-wrapper">
    <Top></Top>
    <!-- banner区域 -->
    <div class="banner-wrapper" v-if="!userInfo.token">
      <span>一个分享你知识的地方</span>
    </div>
    <!-- 内容区域 -->
    <div class="container-wrapper">
      <div class="container">
        <div class="articles-wrapper">
          <div class="feed-toggle">
            <ul class="nav">
              <!-- <el-button @click="sendData">发送</el-button> -->
              <li
                :class="{ activeLine: !isActive }"
                @click="isActive = false"
                v-if="userInfo.token"
              >
                个人文章
              </li>
              <li :class="{ activeLine: isActive }" @click="isActive = true">
                全部文章
              </li>
            </ul>
          </div>
          <!-- 文章路由 -->
          <transition name="active">
            <SelfActicles v-if="!isActive"></SelfActicles>
            <Articles ref="allArticle" v-if="isActive"></Articles>
          </transition>
          <!-- 分页 -->

          <!-- page-size每页显示的个数 
         total 总共的条数
          -->
        </div>
        <!-- 标签路由 -->
        <div class="Tags">
          <Tags></Tags>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import Top from "../views/Top.vue"
  import Tags from "../views/Tags.vue"
  import Articles from "../views/Articles.vue"
  import SelfActicles from "../views/SelfActicles.vue"
  import Pager from "./Pager.vue"
  export default {
    data() {
      return {
        isActive: true, //是否显示个人文章 true为个人
      }
    },
    computed: {
      ...mapState(["userInfo"]),
    },
    components: {
      Top,
      Tags,
      Articles,
      SelfActicles,
      Pager,
    },
  }
</script>

<style lang="less">
  @import "../assets/style/reset";
  .home-wrapper {
    // 头部区域
    .top-wrapper {
      width: 100%;
      height: 56px;
      font-size: 20px;
      display: flex;
      justify-content: space-between;
      line-height: 56px;
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
    }
    // banner区域
    .banner-wrapper {
      width: 100%;
      height: 160px;
      background-color: #5cb85c;
      box-shadow: inset 0 8px 8px -8px rgb(0 0 0 / 30%),
        inset 0 -8px 8px -8px rgb(0 0 0 / 30%);
      position: relative;
      span {
        color: #fff;
        font-weight: 900;
        font-size: 30px;
        position: absolute;
        letter-spacing: 4px;
        text-shadow: 0px 1px 3px rgb(0 0 0 / 30%);
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    // 内容区域
    .container-wrapper {
      width: 100%;
      height: 100%;
      .container {
        width: 1150px;
        height: 1000px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .articles-wrapper {
          width: 65%;
          height: 100%;
          .feed-toggle {
            width: 100%;
            height: 40px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            .nav {
              display: flex;
              li {
                display: block;
                width: 65px;
                height: 24px;
                margin-top: 15px;
                cursor: pointer;
                color: #aaa;
              }
              li:last-child {
                margin-left: 10px;
              }
            }
          }
        }
      }
    }
  }
  .activeLine {
    color: #5cb85c !important;
    border-bottom: 2px solid #5cb85c;
  }
  @keyframes active {
    0% {
      opacity: 0.2;
    }
    25% {
      opacity: 0.4;
    }
    50% {
      opacity: 0.6;
    }
    75% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
  .active-enter-active {
    animation: active 2s ease-in-out;
  }
  .Tags {
    width: 35%;
  }
</style>

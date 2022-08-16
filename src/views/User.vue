<!--
 * @Descripttion: 
 * @Author: TaoWang
 * @Date: 2022-08-10 11:53:17
-->
<template>
  <div>
    <Top></Top>
    <div class="user-info">
      <div class="user-pic">
        <img :src="'http://localhost:8888' + user.image" alt="" />
      </div>
      <div class="user-name">
        {{ user.username }}
      </div>
    </div>
    <!-- 文章部分 -->
    <div class="user-articles-wrapper">
      <ul>
        <li :class="{ activeLine: isActive }" @click="isActive = true">
          个人文章
        </li>
        <li :class="{ activeLine: !isActive }" @click="isActive = false">
          个人收藏
        </li>
      </ul>
      <!-- 文章路由 -->
      <SelfActicles v-if="isActive"></SelfActicles>
      <UserCollect v-else></UserCollect>
    </div>
  </div>
</template>

<script>
  import SelfActicles from "./SelfActicles.vue"
  import Top from "./Top.vue"
  import UserCollect from "./UserCollect.vue"
  import { mapState } from "vuex"
  export default {
    data() {
      return {
        user: {},
        isActive: true,
      }
    },
    components: {
      Top,
      SelfActicles,
      UserCollect,
    },
    computed: {
      ...mapState(["userInfo"]),
    },
    watch: {
      async $route(to, form) {
        const res = await this.$http({
          method: "get",
          url: "/profiles/" + this.$route.params.username.slice(1),
        })
        this.user = res
        console.log(res)
      },
    },
    created() {
      this.getAllArticles()
    },
    methods: {
      async getAllArticles() {
        const res = await this.$http({
          method: "get",
          url: "/profiles/" + this.$route.params.username.slice(1),
        })
        this.user = res
        console.log(res)
      },
    },
  }
</script>

<style lang="less" scoped>
  .user-info {
    width: 100%;
    height: 280px;
    display: block;
    background-color: #f3f3f3;
    position: relative;
    .user-pic {
      width: 113px;
      height: 113px;
      border-radius: 50%;
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 113px;
        height: 113px;
        border-radius: 50%;
      }
    }
    .user-name {
      width: 400px;
      height: 50px;
      text-align: center;
      position: absolute;
      font-size: 25px;
      bottom: 30px;
      left: 50%;
      transform: translate(-50%);
    }
  }
  .user-articles-wrapper {
    width: 1100px;
    height: 100px;
    margin: 0 auto;
    ul {
      display: flex;
      margin-top: 25px;
      width: 100%;
      height: 40px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
  .activeLine {
    color: #5cb85c !important;
    border-bottom: 2px solid #5cb85c;
  }
</style>

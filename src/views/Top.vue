<!--
 * @Descripttion: 
 * @Author: TaoWang
 * @Date: 2022-08-08 15:25:23
-->
<template>
  <div class="top-wrapper">
    <div class="top-left">
      <router-link to="/">conduit</router-link>
    </div>
    <div class="top-right" v-if="!userInfo._id">
      <ul>
        <li>
          <router-link to="/" exact-active-class="active">主页</router-link>
        </li>
        <li>
          <router-link to="/login" exact-active-class="active">
            登录
          </router-link>
        </li>
        <li>
          <router-link to="/register" exact-active-class="active">
            注册
          </router-link>
        </li>
      </ul>
    </div>
    <div class="userTopRight" v-if="userInfo._id">
      <ul>
        <li>
          <router-link to="/" exact-active-class="active">主页</router-link>
        </li>
        <li>
          <router-link to="/editor" exact-active-class="active">
            发布文章
          </router-link>
        </li>
        <li>
          <router-link to="/settings" exact-active-class="active">
            设置
          </router-link>
        </li>
        <li>
          <router-link
            :to="`/@${userInfo.username}`"
            exact-active-class="active"
          >
            用户信息
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  export default {
    computed: {
      ...mapState(["userInfo"]),
    },
  }
</script>

<style></style>

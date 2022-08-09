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
    <div class="top-right">
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
  </div>
</template>

<script>
  export default {}
</script>

<style></style>

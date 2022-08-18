<!--
 * @Descripttion: 标签
 * @Author: TaoWang
 * @Date: 2022-08-08 14:30:12
-->
<template>
  <div class="tagList-wrapper">
    <h1>热门标签</h1>
    <ul class="tagList">
      <li v-for="(tag, index) in tagList" :key="index">
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tagList: [],
      }
    },
    created() {
      this.getTagList()
    },
    methods: {
      async getTagList() {
        const res = await this.$http({
          method: "get",
          url: "/tags",
        })
        if (res.status === 200) {
          this.tagList = res.tagList
          console.log(res)
        } else {
          this.$message.error("获取标签失败")
        }
      },
    },
  }
</script>

<style lang="less">
  .tagList-wrapper {
    width: 76%;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
      rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
    margin: 40px 14px 0 0;
    float: right;
    padding: 19px;
    h1 {
      font-size: 18px;
      text-align: center;
      margin-bottom: 10px;
    }
    .tagList {
      display: flex;
      flex-wrap: wrap;
      text-align: center;
      li {
        width: 90px;
        height: 25px;
        line-height: 25px;
        background-color: #818a91;
        margin: 2px;
        font-size: 12px;
        border-radius: 18px;
        color: #fff;
      }
    }
  }
</style>

<!--
 * @Descripttion: 分页器
 * @Author: TaoWang
 * @Date: 2022-08-17 11:31:56
-->
<template>
  <div>
    <input type="button" value="上一页" />
    <input
      type="button"
      v-for="(page, index) in pager"
      :key="index"
      :value="pageNum"
      @click="toPager(index)"
    />
    <input type="button" value="下一页" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageNum: "",
        pager: [{ id: 0 }],
      }
    },
    created() {
      this.getAllArticle()
    },
    methods: {
      async getAllArticle() {
        const res = await this.$http({
          method: "get",
          url: "/articles",
        })
        console.log(res)
        const pageNum = Math.ceil(res.articlesCount / 10)
        this.pageNum = pageNum
      },
      toPager(index) {
        console.log(index)
      },
    },
  }
</script>

<style></style>

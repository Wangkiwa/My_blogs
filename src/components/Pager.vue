<!--
 * @Descripttion: 
 * @Author: TaoWang
 * @Date: 2022-08-24 16:35:23
-->
<template>
  <div class="page-wrapper">
    <div class="mypager-class">
      <input type="button" class="prevClass" value="上一页" @click="prevPage" />
      <input
        type="button"
        v-for="(page, index) in pager"
        :key="index"
        :value="page"
        class="pageClass"
        :class="{ currentPageClass: page === currentPage }"
        @click="select(page)"
      />
      <input type="button" value="下一页" @click="nextPage" />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mytotal: this.total,
        mycurrentPage: this.currentPage,
      }
    },
    props: ["total", "current-page"],
    computed: {
      pager() {
        const c = this.currentPage
        const t = this.total
        return t
        // if (c <= 5) {
        //   // 倒数第二个页面为..., 页码从头往后算
        //   return [1, 2, 3, 4, 5, 6, 7, 8, 9, "...", t]
        // } else if (c >= t - 4 && c < t) {
        //   // 第二个页面为...,页码从最后向前算
        //   return [
        //     1,
        //     "...",
        //     t - 8,
        //     t - 7,
        //     t - 6,
        //     t - 5,
        //     t - 4,
        //     t - 3,
        //     t - 2,
        //     t - 1,
        //     t,
        //   ]
        // } else {
        //   // 页面处于较中间位置的时候
        //   return [
        //     1,
        //     "...",
        //     c - 3,
        //     c - 2,
        //     c - 1,
        //     c,
        //     c + 1,
        //     c + 2,
        //     c + 3,
        //     "...",
        //     t,
        //   ]
        // }
      },
    },
    methods: {
      select(n) {
        // 当存在三个点和当前页码时不执行
        if (n === this.currentPage) return
        if (typeof n === "string") return
        // this.currentPage = n
        this.$emit("current-change", n)
      },
      prevPage() {
        this.$emit("prev-click")
        // console.log("进来了")
        // this.mycurrentPage -= 1
        // if (this.mycurrentPage < 1) {
        //   this.mycurrentPage = 1
        // }
      },
      nextPage() {
        this.$emit("next-click")
        // this.mycurrentPage += 1
        // if (this.mycurrentPage >= this.mycurrentPage) {
        //   this.mycurrentPage = this.mytotal
        // }
      },
    },
  }
</script>

<style lang="less">
  .mypager-class {
    margin-top: 15px;
  }
  .currentPageClass {
    background-color: #5cb85c;
    color: #fff;
  }
  .pageClass {
    margin: 0 2px;
    border: none;
    width: 22px;
    height: 22px;
  }
</style>

<!--
 * @Descripttion: 编辑文章动态路由
 * @Author: TaoWang
 * @Date: 2022-08-16 18:48:56
-->
<template>
  <div>
    <Top></Top>
    <div class="editor-wrapper">
      <form class="editForm">
        <input
          type="text"
          placeholder="文章标题"
          v-model="articleInfo.article.title"
        />
        <br />
        <input
          type="text"
          placeholder="这篇文章是关于什么的？"
          v-model="articleInfo.article.description"
        />
        <textarea
          name=""
          id=""
          cols="115"
          rows="20"
          placeholder="文章内容"
          v-model="articleInfo.article.body"
        ></textarea>
        <input
          type="text"
          placeholder="标签(多个标签使用空格区分)"
          v-model="tags"
        />
        <button class="sendBtn" @click.prevent="sendArticleBtn">
          发布文章
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import Top from "./Top.vue"
  export default {
    name: "Editor",
    data() {
      return {
        articleInfo: {
          article: {
            tagList: [],
          },
        },
        sendData: {
          article: {
            title: "",
            description: "",
            body: "",
            tagList: [],
          },
        },
        tags: "",
      }
    },
    components: {
      Top,
    },
    created() {
      this.getArticle()
    },
    methods: {
      // 获取文章信息
      async getArticle() {
        const articleId = location.hash.split("editor/")[1]
        const res = await this.$http({
          method: "get",
          url: "/articles/" + articleId,
        })
        console.log(res)
        this.tags = res.article.tagList.join(" ")
        this.articleInfo.article = res.article
      },
      // 发送文章
      async sendArticleBtn() {
        const res = await this.$http({
          method: "put",
          url: "/articles/" + this.articleInfo.article["_id"],
          data: this.articleInfo,
        })
        console.log(res)
        if (res.status === 200) {
          this.getArticle()
          this.$message.success("修改文章成功！")
        }
      },
    },
    watch: {
      tags(newVal) {
        this.articleInfo.article.tagList = newVal.split(" ")
      },
    },
  }
</script>

<style lang="less">
  .editor-wrapper {
    width: 1100px;
    margin: 0 auto;
    .editForm {
      position: relative;
      width: 800px;
      height: 800px;
      margin: 0 auto;
      input,
      textarea {
        width: 800px;
        height: 50px;
        margin: 12px 0;
        outline: none;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        box-sizing: border-box;
        font-size: 20px;
        padding-left: 15px;
      }
      input:focus,
      textarea:focus {
        outline: 1px solid #66afe9;
      }
      textarea {
        height: 180px;
      }
      .sendBtn {
        width: 120px;
        height: 60px;
        border-radius: 8px;
        background-color: #5cb85c;
        color: #fff;
        font-size: 20px;
        border: none;
        position: absolute;
        right: 0;
        bottom: 300px;
      }
    }
  }
</style>

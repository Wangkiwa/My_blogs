<!--
 * @Descripttion: 文章发布 
 * @Author: TaoWang
 * @Date: 2022-08-10 11:33:33
-->
<template>
  <div>
    <Top></Top>
    <div class="editor-wrapper">
      <form class="editForm">
        <input
          type="text"
          placeholder="文章标题"
          v-model="sendData.article.title"
        />
        <br />
        <input
          type="text"
          placeholder="这篇文章是关于什么的？"
          v-model="sendData.article.description"
        />
        <textarea
          name=""
          id=""
          cols="115"
          rows="20"
          placeholder="文章内容"
          v-model="sendData.article.body"
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
    methods: {
      // 发布文章
      async sendArticleBtn() {
        this.sendData.article.tagList = this.tags.toLowerCase().split(" ")
        const res = await this.$http({
          method: "post",
          url: "/articles",
          data: this.sendData,
        })
        console.log(res)
        if (res.status === 201) {
          this.sendData.article.title = ""
          this.sendData.article.description = ""
          this.sendData.article.body = ""
          this.tags = ""
          this.sendData.article.tagList = []
          return this.$message.success("文章发布成功！")
        } else {
          const errorMsg = res.errors.map(item => item.msg).toString()
          this.$message.error(errorMsg + "!")
        }
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

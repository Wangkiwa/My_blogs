<!--
 * @Descripttion: 全部文章
 * @Author: TaoWang
 * @Date: 2022-08-08 13:49:00
-->
<template>
  <div>
    <PreviewAticle></PreviewAticle>
  </div>
</template>

<script>
  import PreviewAticle from "../components/PreviewAticle.vue"
  export default {
    components: { PreviewAticle },
    data() {
      return {
        articles: [],
      }
    },
    created() {
      this.getAllArticles()
    },
    methods: {
      async getAllArticles() {
        const res = await this.$http({
          method: "get",
          url: "/articles",
        })
        this.articles = res.articles
        console.log("res===>", res)
      },
    },
  }
</script>
<style lang="less">
  .Articles-wrapper {
    width: 100%;
    height: 100%;
    .acticles {
      width: 100%;
      height: 185px;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding: 15px 0;
      .acticle-meta {
        width: 100%;
        height: 32px;
        display: flex;
        justify-content: space-between;
        .meta-left {
          display: flex;
          .imgs-wrapper {
            width: 33px;
            height: 100%;
            border-radius: 50%;
          }
          .info {
            width: 100px;
            height: 100%;
            margin-left: 15px;
            a:first-child {
              color: #5cb85c;
              font-size: 16px;
            }
            a:last-child {
              font-size: 8px;
              color: #bbb;
            }
          }
        }
        .meta-right {
          button {
            color: #5cb85c;
            background-color: transparent;
            border: none;
            border: 1px solid #5cb85c;
            border-radius: 14px;
          }
        }
        margin-bottom: 16px;
      }
      .preview-link {
        width: 100%;
        height: 86px;
        a {
          display: block;
          width: 100%;
          height: 100%;
          h1 {
            font-size: 26px;
            font-weight: 600;
            margin-bottom: 9px;
            color: rgba(0, 0, 0);
          }
          p {
            font-size: 16px;
            font-weight: 400;
            margin-bottom: 15px;
            color: #aaa;
          }
          .preview {
            display: flex;
            justify-content: space-between;
            ul {
              li {
                float: right;
                height: 15px;
                border: 1px solid #aaa;
                font-size: 10px;
                border-radius: 13px;
                text-align: center;
                padding: 3px 8px;
                margin-right: 4px;
              }
            }
            .readMore {
              font-size: 12px;
              color: #aaa;
            }
          }
        }
        a:active {
          color: rgba(0, 0, 0);
        }
      }
    }
  }
  .active {
    color: #000 !important;
  }
  .active-line {
    border-bottom: 2px solid #5cb85c;
  }
</style>

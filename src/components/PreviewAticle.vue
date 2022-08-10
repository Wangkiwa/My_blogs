<template>
  <div class="Articles-wrapper">
    <div class="acticles" v-for="(artilce, index) in articles" :key="index">
      <div class="acticle-meta">
        <div class="meta-left">
          <!-- 头像信息 -->
          <div class="imgs-wrapper">
            <img src="../assets/logo.png" alt="" />
          </div>
          <!-- 作者信息 -->
          <div class="info">
            <router-link to="/">{{ artilce.author.username }}</router-link>
            <br />
            <router-link to="/">
              {{ artilce.createdAt | dateString }}
            </router-link>
          </div>
        </div>
        <div class="meta-right">
          <button>♥</button>
        </div>
      </div>
      <div class="preview-link">
        <router-link to="/">
          <h1>{{ artilce.title }}</h1>
          <p>{{ artilce.description }}</p>
          <div class="preview">
            <span class="readMore">阅读更多...</span>
            <ul>
              <li v-for="(tag, index) in artilce.tagList" :key="index">
                {{ tag }}
              </li>
            </ul>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  export default {
    data() {
      return {
        articles: [],
      }
    },
    computed: {
      ...mapState(["userInfo"]),
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
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
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
              margin-top: 5px;
              width: 170px;
              display: block;
              font-size: 8px;
              color: #bbb;
            }
          }
        }
        .meta-right {
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

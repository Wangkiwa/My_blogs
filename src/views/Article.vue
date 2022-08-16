<!--
 * @Descripttion: 单个路由组件
 * @Author: TaoWang
 * @Date: 2022-08-15 20:25:45
-->
<template>
  <div class="article-wrapper">
    <Top></Top>
    <!-- 文章头部 -->
    <div class="article-banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <div class="article-user">
          <div class="img-wrapper">
            <img :src="'http://localhost:8888' + article.author.image" alt="" />
          </div>
          <div class="aticle-user-info">
            <a @click="pushRouterA(article.author.username)">
              {{ article.author.username }}
            </a>
            <p>{{ article.createdAt | dateString }}</p>
          </div>
          <div class="article-btn" v-if="userInfo._id === article.author._id">
            <button class="edit-btn" @click="editArticleBtn(article._id)">
              编辑文章
            </button>
            <button class="remove-btn" @click="removeArticleBtn">
              删除文章
            </button>
          </div>
          <div class="article-btn" v-else>
            <button
              class="edit-btn"
              @click="followBtn($event, article.author.username)"
            >
              {{
                userFollows.includes(article.author.username)
                  ? "取消关注"
                  : "关注用户"
              }}
            </button>
            <button class="remove-btn" @click="isCollect($event, article._id)">
              {{ this.isCollectBtn ? "取消收藏" : "收藏文章" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 文章具体内容区域 -->
    <div class="article-info">
      <div class="article-content">
        <p>{{ article.body }}</p>
        <ul>
          <template v-for="(tag, index) in article.tagList">
            <li :key="index" v-if="tag">
              {{ tag }}
            </li>
          </template>
        </ul>
      </div>
      <hr />
      <!-- 文章评论 -->
      <div class="comment-wrapper">
        <div class="article-user">
          <div class="img-wrapper">
            <img :src="'http://localhost:8888' + article.author.image" alt="" />
          </div>
          <div class="aticle-user-info">
            <a @click="pushRouterA(article.author.username)">
              {{ article.author.username }}
            </a>
            <p>{{ article.createdAt | dateString }}</p>
          </div>
          <div class="article-btn" v-if="userInfo._id === article.author._id">
            <button class="edit-btn">编辑文章</button>
            <button class="remove-btn" @click="removeArticleBtn">
              删除文章
            </button>
          </div>
          <div class="article-btn" v-else>
            <button
              class="edit-btn"
              @click="followBtn($event, article.author.username)"
            >
              {{
                userFollows.includes(article.author.username)
                  ? "取消关注"
                  : "关注用户"
              }}
            </button>
            <button class="remove-btn" @click="isCollect($event, article._id)">
              {{ this.isCollectBtn ? "取消收藏" : "收藏文章" }}
            </button>
          </div>
        </div>
        <div class="comments">
          <form>
            <div class="cards">
              <textarea rows="8" cols="80" v-model="commentBody"></textarea>
            </div>
            <div class="c-footer">
              <button @click.prevent="sendCommentBtn">发表评论</button>
            </div>
            <div class="comment">
              <div v-for="(comment, index) in comments" :key="index">
                <p>
                  {{ comment.body }}
                </p>
                <div class="comment-footer">
                  <div class="comment-user">
                    <div class="img">
                      <img
                        :src="'http://localhost:8888' + comment.author.image"
                        alt=""
                      />
                    </div>
                    <div class="c-userinfo">
                      <a @click="pushUserInfo(index)">
                        {{ comment.author.username }}
                      </a>
                      <span>{{ comment.time | dateString }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import Top from "./Top.vue"
  export default {
    components: { Top },
    data() {
      return {
        article: {
          author: {},
        },
        // 拉取评论
        comments: [],
        // 评论内容
        commentBody: "",
        //用户关注
        userFollows: [],
        // 关注数据
        favorited: [],
        isCollectBtn: false,
      }
    },
    computed: {
      ...mapState(["userInfo"]),
    },
    created() {
      this.getArticle()
      this.getComments()
      this.getUserInfo()
    },
    methods: {
      // 持久化获取信息
      async getUserInfo() {
        const currentUser = await this.$http({
          method: "get",
          url: "/user",
        })
        this.userFollows = currentUser.user.follow
      },
      // 获取文章信息
      async getArticle() {
        const res = await this.$http({
          method: "get",
          url: "/articles/" + this.$route.params.articleId,
        })
        this.article = res.article
        // 收藏的数据
        this.favorited = res.article.favorited
        this.isCollectBtn = this.favorited.includes(this.userInfo._id)
      },
      // 获取文章的评论
      async getComments() {
        const res = await this.$http({
          method: "get",
          url: "/articles/" + this.$route.params.articleId + "/comments",
        })
        this.comments = res.comments
      },
      // 跳转
      pushUserInfo(index) {
        let users = this.comments.map(item => item.author)
        this.$router.push("/@" + users[index].username)
      },
      // 跳转
      pushRouterA(username) {
        this.$router.push("/@" + username)
      },
      // 发布评论
      async sendCommentBtn() {
        if (this.userInfo._id) {
          const res = await this.$http({
            method: "post",
            url: "/articles/" + this.$route.params.articleId + "/comments",
            data: {
              body: this.commentBody,
              author: this.userInfo._id,
            },
          })
          this.getComments()
          if (res.status === 200) {
            this.commentBody = ""
            this.$message.success(res.msg)
          } else {
            this.$message.error(res.errors.map(err => err.msg).toString())
          }
        } else {
          this.$message.error("请登录后评论！")
          this.push("/login")
        }
      },
      // 删除文章
      async removeArticleBtn() {
        if (confirm("确定要删除吗？")) {
          const res = await this.$http({
            method: "delete",
            url: "/articles/" + this.$route.params.articleId,
          })
          if (res.status === 204) {
            this.$router.push("/")
            this.$message.success(res.msg)
          }
        } else {
          this.$message.warning("已取消删除！")
        }
      },
      // 关注用户
      async followBtn(e, username) {
        if (e.target.innerText === "关注用户") {
          const res = await this.$http({
            method: "post",
            url: "/profiles/" + username + "/follow",
          })
          if (res.status === 200) {
            this.getUserInfo()
            this.$message.success(res.msg)
          }
        } else {
          // TODO 取消关注
          console.log("取消")
          const res = await this.$http({
            method: "delete",
            url: "/profiles/" + username + "/follow",
          })
          if (res.status === 200) {
            this.getUserInfo()
            this.$message.error(res.msg)
          }
        }
      },
      // 编辑用户
      editArticleBtn(val) {
        this.$router.push("/editor/" + val)
      },
      // 收藏文章
      async isCollect(e, articleId) {
        if (e.target.innerText === "取消收藏") {
          // TODO取消收藏
          const res = await this.$http({
            method: "delete",
            url: "/articles/" + articleId + "/favorite",
          })
          this.$message.warning(res.message)
          this.getArticle()
          this.getUserInfo()
        } else if (e.target.innerText === "收藏文章") {
          // TODO收藏
          const res = await this.$http({
            method: "post",
            url: "/articles/" + articleId + "/favorite",
          })
          this.$message.success(res.message)
          this.getArticle()
          this.getUserInfo()
        } else {
          this.$message.success("网络错误，请稍后重试！")
        }
      },
    },
  }
</script>

<style lang="less">
  .article-wrapper {
    .article-banner {
      width: 100%;
      height: 180px;
      background-color: #333;
      padding: 20px;
      box-sizing: border-box;
      .container {
        width: 1100px;
        height: 130px;
        margin: 0 auto;
        h1 {
          font-size: 40px;
          font-weight: 600;
          margin-top: 20px;
          color: #fff;
          text-shadow: 0px 1px 3px rgb(0 0 0 / 30%);
        }
        .article-user {
          margin-top: 40px;
          display: flex;
          .img-wrapper {
            width: 43px;
            height: 43px !important;
            height: 100%;
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .aticle-user-info {
            margin-left: 15px;
            a {
              color: rgb(239, 235, 235);
              margin-bottom: 3px;
              cursor: pointer !important;
            }

            p {
              margin-top: 3px;
              color: #bbb;
              font-size: 8px;
            }
          }
          .article-btn {
            margin-left: 25px;
            button {
              outline: none;
              margin-right: 6px;
              background: top;
              height: 30px;
              color: #ffff;
              border-radius: 9px;
              cursor: pointer;
            }
            button:first-child:hover {
              background-color: #aaa;
            }
            button:last-child:hover {
              color: #fff;
              background-color: #b85c5c;
            }
            button:last-child {
              color: #b85c5c;
              border-color: #b85c5c;
            }
            .edit-btn {
              border: 1px solid #ccc;
            }
            .remove-btn {
              border: 1px solid #ccc;
            }
          }
        }
      }
    }
    .article-info {
      .article-content {
        width: 1100px;
        height: 100%;
        margin: 0 auto;
        margin-top: 20px;
        ul {
          li {
            display: inline-block;
            height: 15px;
            border: 1px solid #aaa;
            font-size: 10px;
            border-radius: 13px;
            text-align: center;
            padding: 3px 8px;
            margin: 20px 4px;
          }
        }
      }
      hr {
        width: 1100px;
        border: 0;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }
      .comment-wrapper {
        width: 1100px;
        height: 50px;
        margin: 0 auto;
        .article-user {
          margin-top: 20px;
          margin-bottom: 40px;
          display: flex;
          justify-content: center;
          .img-wrapper {
            width: 47px;
            height: 44px;
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .aticle-user-info {
            margin-left: 15px;
            a {
              color: #5cb85c;
              margin-bottom: 3px;
              cursor: pointer;
            }
            p {
              margin-top: 3px;
              color: #bbb;
              font-size: 8px;
            }
          }
          .article-btn {
            margin-left: 25px;
            button {
              outline: none;
              margin-right: 6px;
              height: 30px;
              background: top;
              border-radius: 9px;
            }
            button:first-child:hover {
              background-color: #aaa;
              color: #fff;
            }
            button:last-child:hover {
              color: #fff;
              background-color: #b85c5c;
            }
            button:last-child {
              color: #b85c5c;
              border-color: #b85c5c;
            }
            .edit-btn {
              border: 1px solid #ccc;
            }
            .remove-btn {
              border: 1px solid #ccc;
            }
          }
        }
        .comments {
          width: 1100px;
          margin: 0 auto;
          form {
            width: 570px;
            margin: 0 auto;
            .cards {
              width: 100%;
              font-size: 0;
              textarea {
                width: 100%;
                margin: 0;
                box-sizing: border-box;
                border: none;
                outline: none;
                font-size: 25px;
                padding-left: 10px;
                border: 1px solid rgba(0, 0, 0, 0.15);
              }
            }
            .c-footer {
              width: 100%;
              height: 48px;
              line-height: 48px;
              background-color: #f5f5f5;
              position: relative;
              button {
                height: 30px;
                color: #fff;
                background-color: #5cb85c;
                border: none;
                position: absolute;
                border-radius: 8px;
                right: 0;
                margin-top: 8px;
              }
            }
            .comment {
              p {
                border: 1px solid rgba(0, 0, 0, 0.15);
                box-sizing: border-box;
                width: 100%;
                height: 80px;
                margin-top: 15px;
                padding-left: 10px;
                padding-top: 10px;
              }
              .comment-footer {
                width: 100%;
                height: 48px;
                background: #f5f5f5;
                display: flex;
                align-items: center;
                .comment-user {
                  display: flex;
                  align-items: center;
                  .img {
                    width: 33px;
                    height: 33px;
                    img {
                      width: 100%;
                      height: 100%;
                      margin-left: 12px;
                    }
                  }
                  .c-userinfo {
                    font-size: 8px;
                    a {
                      margin-left: 20px;
                      cursor: pointer !important;
                    }
                    a:hover {
                      color: #5cb85c;
                      cursor: pointer !important;
                    }
                    span {
                      margin-left: 9px;
                      color: #bbb;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  // .article-wrapper
  //   .article-info
  //   .comment-wrapper
  //   .article-user
  //   .aticle-user-info
  //   a {
  //   cursor: pointer;
  // }
</style>

<template>
  <div class="Articles-wrapper">
    <div class="acticles" v-for="(artilce, index) in articles" :key="index">
      <div class="acticle-meta">
        <div class="meta-left">
          <!-- 头像信息 -->
          <div class="imgs-wrapper">
            <img :src="'http://localhost:8888' + artilce.author.image" alt="" />
          </div>
          <!-- 作者信息 -->
          <div class="info">
            <router-link :to="'@' + artilce.author.username">
              {{ artilce.author.username }}
            </router-link>
            <br />
            <router-link :to="'@' + artilce.author.username">
              {{ artilce.createdAt | dateString }}
            </router-link>
          </div>
        </div>
        <div class="meta-right">
          <!-- 收藏 -->
          <button
            :class="
              favorited[index].includes(userInfo._id) ? 'Collect' : 'noCollect'
            "
            @click="collectBtn(artilce._id, index)"
            ref="showBTN"
          >
            ♥
            <i>{{ artilce.favoritesCount }}</i>
          </button>
        </div>
      </div>
      <div class="preview-link">
        <router-link :to="'/article/' + artilce._id">
          <h1>{{ artilce.title }}</h1>
          <p>{{ artilce.description }}</p>
          <div class="preview">
            <span class="readMore">阅读更多...</span>
            <!-- 标签 -->
            <ul>
              <template v-for="(tag, index) in artilce.tagList">
                <li :key="index" v-if="tag">
                  {{ tag }}
                </li>
              </template>
            </ul>
          </div>
        </router-link>
      </div>
    </div>
    <Pager
      @current-change="getCurrent"
      @prev-click="prevBtn"
      @next-click="nextBtn"
      :total="totalPages"
      :current-page="current"
    ></Pager>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  import Pager from "./Pager.vue"
  export default {
    data() {
      return {
        articles: [],
        favorited: [],
        limit: 2,
        current: 1,
        totalPages: 1,
      }
    },
    components: {
      Pager,
    },
    computed: {
      ...mapState(["userInfo"]),
    },
    created() {
      this.getAllArticles()
    },
    methods: {
      // 获取所有文章
      async getAllArticles(limit = this.limit, offset) {
        const res = await this.$http({
          method: "get",
          url: `/articles?limit=${limit}&offset=${offset}`,
        })
        //  页码总数
        this.totalPages = Math.ceil(res.articlesCount / limit)
        // 每页文章列表
        this.articles = res.articles
        // 遍历出来收藏的数据
        const favorited = this.articles.map(item => item.favorited)
        this.favorited = favorited
      },
      // 收藏
      async collectBtn(id, index) {
        if (this.userInfo._id) {
          // 判断收藏的文章中是否包含当前用户
          if (this.favorited[index].indexOf(this.userInfo._id) !== -1) {
            // TODO取消收藏
            const res = await this.$http({
              method: "delete",
              url: "/articles/" + id + "/favorite",
            })
            this.getAllArticles()
            // this.$nextTick(() => {
            //   this.$refs.showBTN[index].className = "noCollect"
            // })
            this.$message.warning(res.message)
          } else {
            //TODO 收藏
            const res = await this.$http({
              method: "post",
              url: "/articles/" + id + "/favorite",
            })
            this.getAllArticles()
            // this.$nextTick(() => {
            //   this.$refs.showBTN[index].className = "Collect"
            // })
            this.$message.success(res.message)
          }
        } else {
          this.$router.push("/login")
          this.$message.error("请登录后收藏")
        }
      },
      // 获取文章
      async getCurrent(n) {
        console.log(n)
        this.current = n
        this.getAllArticles(this.limit, (this.current - 1) * this.limit)
        // const res = await this.$http({
        //   method: "get",
        //   url: "/articles?offset=" + (n - 1) * this.limit,
        // })
      },
      // 上一页
      prevBtn() {
        this.current -= 1
        if (this.current < 1) {
          return (this.current = 1)
        }
        this.getAllArticles(this.limit, (this.current - 1) * this.limit)
      },
      // 下一页
      nextBtn() {
        this.current += 1
        if (this.current > this.totalPages) {
          return (this.current = this.totalPages)
        }
        this.getAllArticles(this.limit, (this.current - 1) * this.limit)
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
            font-size: 14px !important;
            line-height: 18px;
            font-weight: 400;
            margin-bottom: 15px;
            color: #aaa;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
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
                color: #aaa !important;
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
  .Collect {
    background-color: #5cb85c !important;
    border: none;
    border: 1px solid #5cb85c;
    color: #fff !important;
    border-radius: 14px;
  }
  .noCollect {
    color: #5cb85c;
    background-color: transparent;
    border: none;
    border: 1px solid #5cb85c;
    border-radius: 14px;
  }
</style>

<!--
 * @Descripttion: 用户收藏文章组件
 * @Author: TaoWang
 * @Date: 2022-08-15 13:35:11
-->
<template>
  <div class="user-collect">
    <div class="Articles-wrapper" v-if="articles">
      <template v-for="(artilce, index) in articles">
        <div class="acticles" :key="index">
          <div class="acticle-meta">
            <div class="meta-left">
              <!-- 头像信息 -->
              <div class="imgs-wrapper">
                <img
                  :src="'http://localhost:8888' + artilce.author.image"
                  alt=""
                />
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
                  favorited[index].includes(userInfo._id)
                    ? 'Collect'
                    : 'noCollect'
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
      </template>
    </div>
  </div>
</template>

<script>
  import { mapState } from "vuex"
  export default {
    data() {
      return {
        articles: [],
        favorited: [],
      }
    },
    computed: {
      ...mapState(["userInfo"]),
    },
    created() {
      this.getAllArticles()
    },
    watch: {
      async $route(to, form) {
        console.log(to)
        console.log(form)
        const res = await this.$http({
          method: "get",
          url: "/articles",
          params: {
            favorited: this.$route.params.username.slice(1),
          },
        })
        this.articles = res.articles
        // 遍历出来收藏的数据
        const favorited = this.articles.map(item => item.favorited)
        this.favorited = favorited
      },
    },
    methods: {
      async getAllArticles() {
        const res = await this.$http({
          method: "get",
          url: "/articles",
          params: {
            favorited: this.$route.params.username.slice(1),
          },
        })
        console.log(res)
        this.articles = res.articles
        // 遍历出来收藏的数据
        const favorited = this.articles.map(item => item.favorited)
        this.favorited = favorited
      },
      // 收藏
      async collectBtn(id, index) {
        if (this.userInfo._id) {
          if (this.favorited[index].indexOf(this.userInfo._id) !== -1) {
            // TODO取消收藏
            const res = await this.$http({
              method: "delete",
              url: "/articles/" + id + "/favorite",
            })
            this.getAllArticles()
            this.$nextTick(() => {
              this.$refs.showBTN[index].className = "noCollect"
            })
            this.$message.warning(res.message)
          } else {
            //TODO 收藏
            const res = await this.$http({
              method: "post",
              url: "/articles/" + id + "/favorite",
            })
            this.getAllArticles()
            this.$nextTick(() => {
              this.$refs.showBTN[index].className = "Collect"
            })
            this.$message.success(res.message)
          }
        } else {
          this.$message.error("请登录后收藏")
          this.$router.push("/login")
        }
      },
    },
  }
</script>

<style></style>

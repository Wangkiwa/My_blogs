<!--
 * @Descripttion: 设置个人信息 
 * @Author: TaoWang
 * @Date: 2022-08-10 11:33:33
-->
<template>
  <div>
    <Top></Top>
    <div class="editor-wrapper">
      <form class="editForm">
        <div class="imgFile" @click="$refs.iptFile.click()">
          <img v-if="preview" :src="preview" alt="" />
          <img v-else :src="'http://localhost:8888' + userInfo.image" alt="" />
        </div>
        <div class="exit">
          <button @click.prevent="userExitBtn">点此退出</button>
        </div>
        <input
          ref="iptFile"
          class="firstInpt"
          type="file"
          placeholder="头像地址"
          @change="imgChange"
        />
        <br />
        <input type="text" placeholder="用户名" v-model="userInfo.username" />
        <textarea
          cols="115"
          rows="20"
          v-model="userInfo.bio"
          placeholder="关于你的简短简历"
        ></textarea>
        <input type="text" placeholder="电子邮件" v-model="userInfo.email" />
        <br />
        <input type="text" placeholder="新密码" v-model="userInfo.password" />
        <button class="sendBtn updateBtn" @click.prevent="updateBtn">
          更新设置
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import Top from "./Top.vue"
  export default {
    data() {
      return {
        preview: "",
        userInfo: {
          image: "",
          username: "",
          bio: "",
          email: "",
          password: "",
        },
      }
    },
    components: {
      Top,
    },
    created() {
      this.getUserInfo()
    },
    methods: {
      // 头像
      imgChange(e) {
        const file = e.target.files[0]
        this.preview = URL.createObjectURL(file)
        // 直接将文件类型发送后端即可
        this.userInfo.image = file
        // const fr = new FileReader()
        // fr.readAsDataURL(file)
        // fr.onload = e => {
        //   this.userInfo.image = e.target.result
        // }
      },
      // 获取用户信息
      async getUserInfo() {
        const res = await this.$http({
          method: "get",
          url: "/user",
        })
        this.userInfo.username = res.user.username
        this.userInfo.email = res.user.email
        this.userInfo.bio = res.user.bio
        this.userInfo.image = res.user.image
      },
      // 点击更新
      async updateBtn() {
        let formData = new FormData()
        Object.keys(this.userInfo).forEach(k =>
          formData.append(k, this.userInfo[k])
        )
        const userInfo = await this.$http({
          method: "put",
          url: "/user",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: formData,
        })
        console.log(userInfo)
        if (userInfo.status === 400) {
          this.$message.error(
            userInfo.errors.map(item => item.msg).toString() + "!"
          )
        } else if (userInfo.status === 200) {
          this.$message.success("更新成功！")
          this.userInfo.password = ""
          this.getUserInfo()
        } else {
          this.$message.error(userInfo.msg)
        }
      },
      // 退出
      userExitBtn() {
        if (confirm("确定要退出吗？")) {
          this.$storage.clearItem("userInfo")
          this.$router.push("/login")
          this.$message.success("退出成功！")
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        } else {
          this.$message.warning("已取消！")
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
      .imgFile {
        width: 113px;
        height: 113px;
        margin-left: 41%;
        border-radius: 50%;
        padding: 15px;
        img {
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 50%;
        }
      }
      .exit {
        margin: -10px auto;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        button {
          border-radius: 8px;
          border: 1px solid rgb(144, 24, 24);
          background: #fff;
        }
      }
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
      .firstInpt {
        width: 0;
        height: 0;
        display: none;
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
      .updateBtn {
        position: absolute;
        right: 0;
        bottom: 150px !important;
      }
    }
  }
</style>

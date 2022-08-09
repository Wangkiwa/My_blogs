<!--
 * @Descripttion: 注册组件
 * @Author: TaoWang
 * @Date: 2022-08-08 11:00:50
-->
<template>
  <div>
    <Top></Top>
    <div class="login-wrapper">
      <div class="login">
        <h1>注册</h1>
        <router-link to="/login">有一个账户？</router-link>
        <form>
          <div class="unameIpt">
            <input
              type="text"
              placeholder="用户名"
              @blur="userValidate"
              v-model="user.username"
            />
            <span class="userSpan" ref="userRef">用户名不合法！</span>
          </div>
          <div class="emailIpt">
            <input
              type="text"
              placeholder="电子邮件"
              @blur="emailValidate"
              v-model="user.email"
            />
            <span class="emailSpan" ref="emailRef">邮箱不合法！</span>
          </div>
          <div class="pwdIpt">
            <input
              type="text"
              placeholder="密码"
              v-model="user.password"
              @blur="pwdValidate"
            />
            <span class="pwdSpan" ref="pwdRef">密码不合法！</span>
          </div>
          <button class="submitBtn" @click.prevent="registerBtn">注册</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import Top from "./Top.vue"
  export default {
    data() {
      return {
        user: {
          username: "",
          email: "",
          password: "",
        },
      }
    },
    components: {
      Top,
    },
    methods: {
      // 注册
      async registerBtn() {
        if (this.userValidate() && this.emailValidate() && this.pwdValidate()) {
          // 请求
          const res = await this.$http({
            method: "post",
            url: "/users",
            data: this.user,
          })
          // 校验400
          if (res.status === 400) {
            const msgs = res.errors.map(item => {
              return item.msg
            })
            this.$message.error(msgs.toString() + "!")
          } else {
            // 成功
            this.user.username = ""
            this.user.password = ""
            this.user.email = ""
            this.$message.success("注册成功！")
            this.$router.push("/login")
          }
        } else {
          return this.$message.error("请输入正确信息!")
        }
      },
      // 用户名验证
      userValidate() {
        let reg = /[a-zA-Z0-9_-]{2,9}/
        let userName = reg.test(this.user.username)
        if (userName) {
          this.$refs.userRef.style.display = "none"
          return true
        } else {
          this.$refs.userRef.style.display = "block"
          return false
        }
      },
      // 邮箱验证规则
      emailValidate() {
        let reg =
          /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        let email = reg.test(this.user.email)
        if (email) {
          this.$refs.emailRef.style.display = "none"
          return true
        } else {
          this.$refs.emailRef.style.display = "block"
          return false
        }
      },
      // pwd验证规则
      pwdValidate() {
        let reg = /[a-zA-Z0-9]{6,11}/
        let pwd = reg.test(this.user.password)
        if (pwd) {
          this.$refs.pwdRef.style.display = "none"
          return true
        } else {
          this.$refs.pwdRef.style.display = "block"
          return false
        }
      },
    },
  }
</script>

<style lang="less">
  .login-wrapper {
    width: 450px;
    height: 500px;
    margin: 30px auto;
    position: relative;
    .login {
      text-align: center;
      h1 {
        font-size: 50px;
        margin-bottom: 15px;
      }
      a {
        color: #5cb85c;
      }
      form {
        .unameIpt {
          position: relative;
          input {
            width: 450px;
            height: 40px;
            margin-top: 15px;
            font-size: 15px;
            border-radius: 3px;
            padding-left: 8px;
            box-sizing: border-box;
          }
          .userSpan {
            position: absolute;
            top: 25px;
            right: -116px;
            color: red;
            display: none;
          }
        }
        .emailIpt {
          position: relative;
          input {
            width: 450px;
            height: 40px;
            font-size: 15px;
            border-radius: 3px;
            margin: 20px 0;
            padding-left: 8px;
            box-sizing: border-box;
          }
          .emailSpan {
            position: absolute;
            top: 30px;
            right: -100px;
            color: red;
            display: none;
          }
        }

        .pwdIpt {
          position: relative;
          input {
            width: 450px;
            height: 40px;
            font-size: 15px;
            padding-left: 8px;
            box-sizing: border-box;
            border-radius: 3px;
          }
          .pwdSpan {
            position: absolute;
            top: 12px;
            right: -100px;
            color: red;
            display: none;
          }
        }
      }
      .submitBtn {
        width: 80px;
        height: 50px;
        position: absolute;
        right: 0;
        margin-top: 15px;
        background-color: #5cb85c;
        font-size: 15px;
        border-radius: 8px;
        color: #fff;
        cursor: pointer;
        border: none;
      }
    }
  }
</style>

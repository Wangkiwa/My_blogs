<!--
 * @Descripttion: 登录组件
 * @Author: TaoWang
 * @Date: 2022-08-08 11:00:50
-->
<template>
  <div>
    <Top></Top>
    <div class="login-wrapper">
      <div class="login">
        <h1>登录</h1>
        <router-link to="/register">需要一个账户？</router-link>
        <form>
          <div class="emailIpt">
            <input
              type="text"
              placeholder="电子邮件"
              v-model="loginValue.user.email"
              @blur="loginEmailValidate"
            />
            <span class="emailSpan" ref="emailRef">邮箱不合法！</span>
          </div>

          <div class="pwdIpt">
            <input
              type="text"
              placeholder="密码"
              v-model="loginValue.user.password"
              @blur="loginPwdValidate"
            />
            <span class="pwdSpan" ref="pwdRef">密码不合法！</span>
          </div>
          <button class="submitBtn" @click.prevent="loginBtn">登录</button>
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
        loginValue: {
          user: {
            email: "",
            password: "",
          },
        },
      }
    },
    components: {
      Top,
    },
    methods: {
      // 登录
      async loginBtn() {
        if (this.loginEmailValidate() && this.loginPwdValidate()) {
          // 校验成功
          const res = await this.$http({
            method: "post",
            url: "/users/login",
            data: this.loginValue,
          })
          if (res.status === 400) {
            const msgs = res.errors.map(item => item.msg)
            return this.$message.error(msgs.toString(msgs) + "!")
          }
          // TO-DO 登录成功
          this.$router.push("/")
          this.$store.commit("SAVEUSERINFO", res)
          this.$storage.setItem("userInfo", res)
          this.$message.success("登录成功！")
        } else {
          return this.$message.error("请输入正确信息！")
        }
      },
      // 邮箱校验
      loginEmailValidate() {
        let reg =
          /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        let email = reg.test(this.loginValue.user.email)
        if (email) {
          this.$refs.emailRef.style.display = "none"
          return true
        } else {
          this.$refs.emailRef.style.display = "block"
          return false
        }
      },
      // 密码校验
      loginPwdValidate() {
        let reg = /[a-zA-Z0-9]{6,11}/
        let pwd = reg.test(this.loginValue.user.password)
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

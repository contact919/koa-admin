<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <h3 class="title">欢迎登录</h3>
      <el-form-item prop="name">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="name" type="text" v-model="loginForm.name" autoComplete="on" placeholder="userName" />
      </el-form-item>
      <el-form-item prop="passwd">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="passwd" type="passWord" @keyup.enter.native="handleLogin" v-model="loginForm.passwd" autoComplete="on"
          placeholder="passWord"></el-input>
          <!-- <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span> -->
      </el-form-item>
      <el-form-item>
        <el-button type="success" style="width:100%;" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { LoginByUsername, LoginByToken } from '@/api/mgr'
import { setToken, setMgr } from '@/utils/auth'
export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
       if (value == '') {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
        loginForm: {
            name: '',
            passwd: ''
        },
        loginRules: {
            name: [{ required: true, trigger: 'blur', validator: validateUsername }],
            passwd: [{ required: true, trigger: 'blur', validator: validatePass }]
        },
    }
  },
  mounted() {
    this.loginByToken();
  },
  methods: {
    loginByToken() {
      return
      if (localStorage.getItem('token') != '' && localStorage.getItem('token') != null) {
        loginIndex.loginByToken(localStorage.getItem('token'))
        .then(rs => {
          if (rs.status === 200) {
            this.$router.push({ path: '/storeManagement/storeRegistered' })
          }else {
            this.$notify.error({
              title: '错误',
              message: `登录失败！错误代码${res.status}`
            })
          }
        })
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          LoginByUsername(this.loginForm).then(rs => {
            if (rs.status === 200) {
              if (rs.data.data.code === 11) {
                // set jwt token
                this.$store.dispatch('SetToken',rs.data.data.tk)
                setToken(rs.data.data.tk)
                
                // set avatar
                this.$store.dispatch('SetMgr',rs.data.data.mgr)
                setMgr(rs.data.data.mgr)
                
                this.$router.push({ path: '/goodsList' })
              }
              if (rs.data.data.code === -10) {
                this.$message.error('帐号不存在')
              }
              if (rs.data.data.code === -11) {
                this.$message.error('密码错误')
              }            
            }else {
              this.$notify.error({
                title: '错误',
                message: `登录失败！错误代码${res.status}`
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 10px 5px 12px 15px;
      color: #000;
      height: 47px;
      &:-webkit-autofill {
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#333;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background: url('./../../../public/admin_system_login.jpg') no-repeat;
  
  background-size: 100% 100%;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
        &:hover{
          color:#f00;
        }
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .el-button--success{
    background: #ea8740;
    border: 1px solid #ea8740;
  }
  .el-input{
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 1000px rgba(255,255,255,0.9) inset !important;
      -webkit-text-fill-color: #000 !important;
    }
  }
  
}
</style>

<template>
  <div id="register">
    <div class="loginPanel">
      <h1>用户注册</h1>
      <hr style="border:1px solid coral"/>
      <form action="#" @submit.prevent="jump()" method="post">
        <input name="account" class="text long" placeholder="昵称 (必填)" @blur="exist" v-model="username"/><br/>
        <input name="password" class="text long" type="password" placeholder="密码 (必填)" v-model="password"/><br/>
        <input name="email" class="text long" placeholder="邮箱 (必填)" v-model="email"/><br/>
        <input class="submit long" type="submit" value="提交"/>
        <label style="color:red;font-weight:bold">{{this.msg}}</label>
        <a @click="toLogin">登录</a>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      password: '',
      email: '',
      msg: ''
    }
  },
  beforeMount () {
    // axios.get('/api/info/total').then(res => {
    //   if (res.data.code !== -403) {
    //     this.isLogin = true
    //     this.$store.commit('toAdmin', true)
    //   }
    // }).catch(err => err)
  },
  mounted () {
  },
  beforeDestroy () {
    this.$store.commit('toAdmin', false)
  },
  methods: {
    exist () {
      axios.get('/api/account/uxt?nickname=' + this.username).then(res => {
        if (res.data.code === 200) {
          this.msg = res.data.data ? '用户名已存在!' : ''
        } else {
          this.msg = '未知的错误发生'
        }
      }).catch(err => err)
    },
    jump () {
      this.password = this.password.trim()
      if (this.password === '') {
        this.msg = '密码不能为空'
        return
      }
      this.email = this.email.trim()
      if (this.email === '') {
        this.msg = '邮箱不能为空'
        return
      }

      const user = {
        nickname: this.username,
        password: this.$md5(this.password),
        email: this.email
      }
      axios.post('/api/account/create', JSON.stringify(user), {
        headers: {
          'content-type': 'application/json'
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.msg = res.data.data ? '注册成功!' : '注册失败!'
        } else {
          this.msg = '未知的错误发生'
        }
      }).catch(err => err)
    },
    back () {
      this.$router.push('/')
    },
    toLogin () {
      this.$router.push('/account')
    }
  }
}
</script>

<style lang="scss" scoped>
#register{
  font-family: 'dotted';
  width: 100%;
  height: 100%;
  // background-color: rgba($color: #000, $alpha: .2);
  overflow-y: scroll;
  position: fixed;
  .loginPanel{
    width: 400px;
    height: 250px;
    background-color: rgba(255, 255, 255, 0.714);
    box-shadow: 0 0 100px rgba($color: #fff, $alpha: .5);
    margin: 200px auto;
    padding: 20px;
    box-sizing: border-box;
    h1{
      color: rgb(34, 88, 154);
    }
    input.long{
      width: 80%;
      height: 30px;
      margin: 10px 10% 0 10%;
      box-sizing: border-box;
    }
    input.text{
      text-indent: 1rem;
    }
    input.checkbox{
      margin-left: 12%;
      vertical-align: middle;
    }
    input.submit{

    }
    label{
      font-size: 12px;
    }
    a{
      font-size: 12px;
      padding-top: 4px;
      color: rgb(170, 0, 255);
      float: right;
      margin-right: 12%;
    }
  }
  .adminPanel{
    height: 100%;
    .left{
      width: 15%;
      height: 100%;
      position: fixed;
      float: left;
      background-color: #24282daf;
      color: white;
      overflow-y: auto;
      li{
        cursor: default;
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-bottom: 1px solid rgb(36, 30, 30);
        box-sizing: border-box;
        &:first-child{
          height: 100px;
          line-height: 100px;
          overflow: hidden;
        }
        transition: 1s 0 linear;
        &:nth-child(n+2):hover:not(.sub_tab){
          border-left: 10px solid black;
          background-color: rgba(0, 0, 0, 0.552);
          font-size: 18px;
        }
      }
    }
    .right{
      width: 85%;
      float: left;
      padding: 20px;
      box-sizing: border-box;
      margin-left: 15%;
    }
  }
}
.act{
  background-color: #24282dd9;
}
.sub_tab{
  background-color:rgba(255, 255, 255, 0.546);
  color: #000;
  &:hover{
    border-left: 40px solid rgb(255, 255, 113);
    background-color: rgb(227, 227, 130);
    font-size: 18px;
  }
}
.act_sub{
  background-color: rgb(255, 255, 184);
}
</style>

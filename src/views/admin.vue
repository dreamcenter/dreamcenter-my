<template>
  <div id="admin">
    <div class="loginPanel" v-if="!this.isLogin">
      <h1>管理员登录</h1>
      <hr style="border:1px solid coral"/>
      <form action="#" @submit.prevent="jump()" method="post">
        <input name="account" class="text long" placeholder="代号" v-model="username"/><br/>
        <input name="password" class="text long" type="password" placeholder="密码" v-model="password"/><br/>
        <input name="remember" id="remember" class="checkbox" type="checkbox" v-model="remember"/><label for="remember">记住密码</label>
        <a href="#">忘记密码?</a>
        <input class="submit long" type="submit" value="提交"/>
        <label style="color:red;font-weight:bold">{{this.msg}}</label>
      </form>
    </div>
    <div class="adminPanel" v-else>
      <ul class="left">
        <li>
          <h1>小戴主页后台</h1>
        </li>
        <router-link active-class="act" tag="li" to="/Admin/view">概览</router-link>
        <router-link active-class="act" tag="li" to="/Admin/blog">博客</router-link>
        <router-link active-class="act" tag="li" to="/Admin/dynamic">动态</router-link>
        <router-link active-class="act" tag="li" to="/Admin/acgn">番剧</router-link>
        <router-link active-class="act" tag="li" to="/Admin/album">回忆</router-link>
        <!-- <router-link active-class="act" tag="li" to="/Admin/repository">仓库</router-link> -->
        <li @click="expRep=!expRep">仓库</li>
        <router-link v-show="expRep" class="sub_tab" active-class="act_sub" tag="li" to="/Admin/repository">新建项目</router-link>
        <router-link v-show="expRep" class="sub_tab" active-class="act_sub" tag="li" to="/Admin/updateRep">修改项目</router-link>
        <router-link active-class="act" tag="li" to="/Admin/friend">友链</router-link>
        <!-- <li>灵感</li> -->
        <!-- <li>待做</li> -->
        <li @click="back">主页</li>
      </ul>
      <div class="right">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      isLogin: false,
      username: '',
      password: '',
      remember: false,
      msg: '',
      expRep: false
    }
  },
  beforeMount () {
    axios.get('/api/info/total').then(res => {
      if (res.data.code !== -403) {
        this.isLogin = true
        this.$store.commit('toAdmin', true)
      }
    }).catch(err => err)
  },
  mounted () {
  },
  beforeDestroy () {
    this.$store.commit('toAdmin', false)
  },
  methods: {
    jump () {
      axios.post('/api/admin/check',
        `username=${this.username}&password=${this.$md5(this.password)}`)
        .then(res => {
          if (res.data.code === 200) {
            if (this.remember) {
              sessionStorage.token = res.data.data
              this.$cookie.config('10d')
              this.$cookie.set('token', res.data.data)
            } else {
              sessionStorage.token = res.data.data
              this.$cookie.remove('token')
            }
            this.$store.commit('toAdmin', true)
            this.isLogin = true
          } else {
            this.msg = '*' + res.data.msg
          }
        }).catch(err => err)
    },
    back () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
#admin{
  font-family: 'dotted';
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000, $alpha: .2);
  overflow-y: scroll;
  position: fixed;
  .loginPanel{
    width: 400px;
    height: 240px;
    background-color: rgba(255, 255, 255, 0.714);
    box-shadow: 0 0 100px rgba($color: #fff, $alpha: .7);
    margin: 200px auto;
    padding: 20px;
    box-sizing: border-box;
    h1{
      color: rgb(120, 174, 240);
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

<template>
  <div id="admin">
    <div class="loginPanel" v-if="!this.isLogin">
      <h1>管理员登录</h1>
      <hr style="border:1px solid coral"/>
      <form action="#" @submit="jump()" method="post">
        <input name="account" class="text long" placeholder="代号"/><br/>
        <input name="password" class="text long" type="password" placeholder="密码"/><br/>
        <input name="remember" id="remember" class="checkbox" type="checkbox"/><label for="remember">记住密码</label>
        <a href="#">忘记密码?</a>
        <input class="submit long" type="submit" value="提交"/>
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
        <li>番剧</li>
        <li>回忆</li>
        <li>仓库</li>
        <li>灵感</li>
        <li>待做</li>
        <li @click="back">主页</li>
      </ul>
      <div class="right">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLogin: false
    }
  },
  mounted () {
    // to be delete
    this.jump()
  },
  beforeDestroy () {
    this.$store.commit('toAdmin', false)
  },
  methods: {
    jump () {
      this.$store.commit('toAdmin', true)
      this.isLogin = true
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
      overflow-y: scroll;
      li{
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
        &:nth-child(n+2):hover{
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
</style>

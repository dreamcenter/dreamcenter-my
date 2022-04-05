<template>
  <div id="app">
    <div id="nav" v-if="!this.$store.state.isAdmin" :style="{'backgroundColor':(isHome?'':'black')}">
      <img src="/imgs/avatar.jpg" @click="gotoAdmin()" width="40px" style="border-radius:20px"/>
      <span class="sign">时光潜流</span>
      <router-link class="nav-color nav-sub iconfont icon-xiangguan" to="/About" style="margin-right:20px">关于</router-link>
      <router-link class="nav-color nav-sub iconfont icon--todo" to="/Todo">待做</router-link>
      <router-link class="nav-color nav-sub iconfont icon-linggandengpao" to="/Inspire">灵感</router-link>
      <router-link class="nav-color nav-sub iconfont icon-cangku" to="/Repository">仓库</router-link>
      <router-link class="nav-color nav-sub iconfont icon-xiangpian" to="/Album">回忆</router-link>
      <router-link class="nav-color nav-sub iconfont icon-xihongshifanqie" to="/Acgn">番剧</router-link>
      <router-link class="nav-color nav-sub iconfont icon-airudiantubiaohuizhi-zhuanqu_zixundongtai" to="/Dynamic">动态</router-link>
      <router-link class="nav-color nav-sub iconfont icon-bokeyuan" to="/Blog">博客</router-link>
      <router-link class="nav-color nav-sub iconfont icon-zhuye" to="/">首页</router-link>
    </div>
    <!-- <div style="height:60px"></div> -->
    <router-view/>
  </div>
</template>

<script>
// import Vue from 'vue'
export default {
  data () {
    return {
      isHome: true,
      keyDef: 0
    }
  },
  beforeMount () {
    this.isHome = (this.$route.path === '/')
  },
  beforeUpdate () {
    this.isHome = (this.$route.path === '/')
  },
  methods: {
    gotoAdmin: function () {
      this.$router.push('/admin')
    }
  }
}
</script>

<style lang="scss">
#app{
  width: 100%;
  height: 100%;
  background: url('/imgs/background.png') fixed no-repeat;
  background-size: cover;
  overflow: hidden;
  #nav{
    width: 100%;
    padding: 10px;
    position: fixed;
    transition: 1s 0s ease-out;
    z-index: 99999;
    .nav-color{
      color: aqua;
    }
    .sign{
      margin-left: 10px;
      font-size: 30px;
      vertical-align: top;
      line-height: 40px;
      color: aqua;
      // font-weight: bold;
      font-family: 'dotted';
    }
    .nav-sub{
      float: right;
      padding: 10px 10px 5px 10px;
      text-decoration: none;
      font-family: 'dotted';
    }
  }
  #nav:hover{
    background-color: black;
  }
}
</style>

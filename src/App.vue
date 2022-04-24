<template>
  <div id="app">
    <div id="nav" v-if="!this.$store.state.isAdmin" :style="{'backgroundColor':(isHome?'':'black')}">
      <img src="/imgs/avatar.jpg" @click="gotoAdmin()" width="40px" style="border-radius:20px"/>
      <!-- <img src="https://s-bj-2133-dreamcenter.oss.dogecdn.com/fast/avatar.jpg" @click="gotoAdmin()" width="40px" style="border-radius:20px"/> -->
      <span class="sign">时光潜流</span>
      <router-link class="nav-color nav-sub iconfont icon-xiangguan" to="/About" style="margin-right:20px">关于</router-link>
      <!-- <router-link class="nav-color nav-sub iconfont icon--todo" to="/Todo">待做</router-link> -->
      <!-- <router-link class="nav-color nav-sub iconfont icon-linggandengpao" to="/Inspire">灵感</router-link> -->
      <router-link class="nav-color nav-sub iconfont icon-linggandengpao" to="/Inspire">友链</router-link>
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
import axios from 'axios'
// import Vue from 'vue'
export default {
  data () {
    return {
      isHome: true,
      keyDef: 0
    }
  },
  beforeCreate () {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      location.href = '/mobile_deny.html'
      // 手机端
    } else {
      console.log('当前使用pc登录')
    }
  },
  beforeMount () {
    this.isHome = (this.$route.path === '/')
    const token = this.$cookie.get('token')
    if (token) sessionStorage.token = token
    const uri2 = this.$route.path.split('/')[1].toLowerCase()
    if (uri2 === 'blog' || uri2 === 'dynamic' || uri2 === 'album') {
      axios.get('/api/info/increase?target=' + uri2).then(res => res).catch(err => err)
    }
  },
  beforeUpdate () {
    this.isHome = (this.$route.path === '/')
    const uri2 = this.$route.path.split('/')[1].toLowerCase()
    const uri3 = this.$route.path.split('/')[2]
    if ((uri2 === 'blog' || uri2 === 'dynamic' || uri2 === 'album') && (uri3 === undefined || uri3.trim() === '')) {
      axios.get('/api/info/increase?target=' + uri2).then(res => res).catch(err => err)
    }
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
  // background: url('https://s-bj-2133-dreamcenter.oss.dogecdn.com/fast/background.png') fixed no-repeat;
  background-size: cover;
  overflow: hidden;
  #nav{
    width: 100%;
    padding: 10px;
    position: fixed;
    transition: 1s 0s ease-out;
    z-index: 99;
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

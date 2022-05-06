<template>
  <div id="app" @click="()=>listShow=false" :style="{'background': 'url('+appBk+') fixed no-repeat', 'background-size':'cover'}">
    <div id="nav" v-if="!this.$store.state.isAdmin" :style="{'backgroundColor':(isHome || !$store.state.isPc?'':'black')}">
      <span class="forehead">
        <span class="phonelist" v-if="!$store.state.isPc" @click.stop="()=>listShow=!listShow">{{listShow?'×':'≡'}}</span>
        <img src="/imgs/avatar.jpg" @click="gotoAdmin()" width="40px" style="border-radius:20px"/>
        <span class="sign">时光潜流</span>
      </span>
      <span class="foreback" v-show="$store.state.isPc || listShow">
        <router-link class="nav-color nav-sub iconfont icon-xiangguan" to="/About" :style="{'margin-right':$store.state.isPc?'20px':''}">关于</router-link>
        <!-- <router-link class="nav-color nav-sub iconfont icon--todo" to="/Todo">待做</router-link> -->
        <!-- <router-link class="nav-color nav-sub iconfont icon-linggandengpao" to="/Inspire">灵感</router-link> -->
        <router-link class="nav-color nav-sub iconfont icon-linggandengpao" to="/Inspire">友链</router-link>
        <router-link class="nav-color nav-sub iconfont icon-cangku" to="/Repository">仓库</router-link>
        <router-link class="nav-color nav-sub iconfont icon-xiangpian" to="/Album">回忆</router-link>
        <router-link class="nav-color nav-sub iconfont icon-xihongshifanqie" to="/Acgn">番剧</router-link>
        <router-link class="nav-color nav-sub iconfont icon-airudiantubiaohuizhi-zhuanqu_zixundongtai" to="/Dynamic">动态</router-link>
        <router-link class="nav-color nav-sub iconfont icon-bokeyuan" to="/Blog">博客</router-link>
        <router-link class="nav-color nav-sub iconfont icon-zhuye" to="/">首页</router-link>
      </span>
    </div>
    <!-- <div style="height:60px"></div> -->
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import { bkeffectStart } from './js/bkeffect'
import { appBk } from './js/betterUrl'
// import Vue from 'vue'
export default {
  data () {
    return {
      isHome: true,
      keyDef: 0,
      appBk,
      listShow: false
    }
  },
  beforeCreate () {
    /* if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      location.href = '/mobile_deny.html'
      // 手机端
    } else {
      console.log('当前使用pc登录')
    } */
    const res = document.body.clientWidth > 800
    this.$store.state.isPc = res
    if (!res && this.$route.fullPath === '/') {
      this.$router.push('/Dynamic').catch(err => err)
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
  },
  mounted () {
    bkeffectStart()
    console.log('页面装载完毕')
  }
}
</script>

<style lang="scss">
#app{
  width: 100%;
  height: 100%;
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
    display: flex;
    justify-content: space-between;
    .foreback{
      display: flex;
      flex-direction: row-reverse;
      .nav-sub{
        display: flexbox;
        padding: 10px 10px 5px 10px;
        text-decoration: none;
        font-family: 'dotted';
      }
    }
  }
  #nav:hover{
    background-color: black;
  }
}
@media screen and (max-width: 800px){
  #app{
    #nav{
      // width: 100%;
      // border: 1px solid red;
      background-color: white;
      box-sizing: border-box;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.363);
      display: block;
      &:hover{
        background-color: white;
      }
      .forehead{
        display: block;
        color: black;
        text-align: center;
        .phonelist{
          float: left;
          font-size: 40px;
          // border: 1px solid red;
          line-height: 30px;
          font-weight: 300;
          color: gray;
          margin-left: 20px;
        }
        .sign{
          margin-left: -20px;
          // display: block;
          color: rgba(0, 0, 255, 0.443);
          // border: 1px solid red;
          font-weight: bold;
        }
        img{
          // float: right;
          // border: 1px solid rgba(128, 128, 128, 0.508);
          display: none;
        }
      }
      .foreback{
        width: 100px;
        position: fixed;
        flex-direction: column-reverse;
        top: 58px;
        left: 20px;
        border: 1px solid rgb(192, 192, 194);
        .nav-sub{
          display: block;
          background-color: white;
          color: black;
          text-align: center;
          font-size: 12px;
          &:last-child{
            display: none;
          }
          &::before{
            content: '';
          }
        }
      }
    }
  }
}
</style>

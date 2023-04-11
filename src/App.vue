<template>
  <div id="app" @click="()=>listShow=false" :style="{'background': isHome?'rgba(50,50,100,.8)':'url('+appBk+') fixed no-repeat', 'background-size':'cover'}">
    <div id="nav" v-if="!this.$store.state.isAdmin" :style="{'backgroundColor':(isHome || !$store.state.isPc?'':'black')}">
      <span class="forehead">
        <span class="phonelist" v-if="!$store.state.isPc" @click.stop="()=>listShow=!listShow">{{listShow?'×':'≡'}}</span>
        <img id="avatar" src="/imgs/avatar.jpg" @click="gotoAccount()" @dblclick="gotoAdmin()" width="40px" style="border-radius:20px"/>
        <span class="sign">{{this.$store.state.nickname}}</span>
      </span>
      <span class="foreback" v-show="$store.state.isPc || listShow">

        <router-link class="nav-color nav-sub iconfont icon-xiangguan" to="/About" :style="{'margin-right':$store.state.isPc?'20px':''}">关于</router-link>
        <!-- <router-link class="nav-color nav-sub iconfont icon--todo" to="/Todo">待做</router-link> -->
        <!-- <router-link class="nav-color nav-sub iconfont icon-linggandengpao" to="/Inspire">灵感</router-link> -->
        <router-link class="nav-color nav-sub iconfont icon-linggandengpao" to="/Inspire">榜单</router-link>
        <router-link class="nav-color nav-sub iconfont icon-cangku" to="/Repository">工程</router-link>
        <router-link class="nav-color nav-sub iconfont icon-xiangpian" to="/Album">典例</router-link>
        <router-link class="nav-color nav-sub iconfont icon-xihongshifanqie" to="/Acgn">好书</router-link>
        <router-link class="nav-color nav-sub iconfont icon-airudiantubiaohuizhi-zhuanqu_zixundongtai" to="/Dynamic">OJ</router-link>
        <router-link class="nav-color nav-sub iconfont icon-bokeyuan" to="/Blog">博客</router-link>
        <router-link class="nav-color nav-sub iconfont icon-zhuye" to="/">首页</router-link>
      </span>
    </div>
    <!-- <div style="height:60px"></div> -->
    <transition name="nav_list" mode="out-in">
      <router-view/>
    </transition>
    <!-- <Aplayer/> -->
    <!-- <meting-js
      class="music_player"
      server="tencent"
      id="8744319675"
      type="playlist"
      fixed="true"
      mini="true"
      lrc-type="1"
      :autoplay="autoPlay"
      mutex="true"
      list-folded="true"></meting-js> -->
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
      listShow: false,
      autoPlay: false,
      mousePt: [],
      ptmsId: 0,
      ptwait: 0
    }
  },
  beforeCreate () {
    /* if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      location.href = '/mobile_deny.html'
      // 手机端
    } else {
      console.log('当前使用pc登录')
    } */
    const pcJi = document.body.clientWidth > 800
    this.$store.state.isPc = pcJi
    this.$store.commit('changePagerSize')
    if (!pcJi && location.pathname === '/') {
      this.$router.push('/Dynamic').catch(err => err)
    }
  },
  beforeMount () {
    window.onresize = this.sizeChange
    this.isHome = (this.$route.path === '/')
    const token = this.$cookie.get('token')
    if (token) sessionStorage.token = token
    const uri2 = this.$route.path.split('/')[1].toLowerCase()
    if (uri2 === 'blog' || uri2 === 'dynamic' || uri2 === 'album') {
      axios.get('/api/info/increase?target=' + uri2).then(res => res).catch(err => err)
    }

    axios.get('/api/account/fc').then(res => {
      if (res.data.code === 200) {
        this.$store.commit('setNickname', res.data.data)
      }
    }).catch(err => err)
    axios.get('/api/info/total').then(res => {
      if (res.data.code === 200) {
        this.$store.commit('setNickname', '管理员')
      }
    }).catch(err => err)
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
      this.$router.push('/admin').catch(err => err)
    },
    gotoAccount: function () {
      this.$router.push('/account').catch(err => err)
    },
    sizeChange () {
      const res = document.body.clientWidth > 800
      this.$store.state.isPc = res
      this.$store.commit('changePagerSize')
      // console.log(this.$store.state.isPc)
    },
    mouseMoveEv (ev) {
      const MIDU = 20
      if (this.ptwait++ < MIDU) return
      this.ptwait = 0
      if (!(ev.clientX < document.body.clientWidth - MIDU && ev.clientY < document.body.clientHeight - MIDU)) return
      this.mousePt.push({
        x: ev.clientX,
        y: ev.clientY
      })
      if (this.mousePt.length > MIDU) {
        this.mousePt.shift(0)
        if (this.ptmsId === MIDU) this.ptmsId = 0
        const el0 = document.getElementById('ptms-' + this.ptmsId++)
        el0.style.fontSize = Math.random() * 30 + 10 + 'px'
        el0.style.left = ev.clientX + 'px'
        el0.style.top = ev.clientY + 'px'
      } else {
        const el = document.createElement('div')
        el.id = 'ptms-' + this.ptmsId
        el.style.fontSize = Math.random() * 30 + 10 + 'px'
        el.style.fontWeight = 'bold'
        // el.style.width = '20px'
        // el.style.height = '20px'
        el.style.color = `rgba(${Math.random() * 30 + 220},${Math.random() * 30 + 220},${Math.random() * 30 + 220},.3)`
        // el.style.border = '2px solid rgba(100,78,154)'
        el.innerText = '❤'
        el.style.borderRadius = '10px'
        el.style.position = 'absolute'
        el.style.textShadow = '0 0 2px rgba(240,240,240,.5)'
        el.style.left = this.mousePt[this.ptmsId].x + 'px'
        el.style.top = this.mousePt[this.ptmsId].y + 'px'
        document.getElementById('app').appendChild(el)
        this.ptmsId++
      }
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
    #avatar{
      // border: 4px solid rgb(15, 32, 107);
      // box-sizing: border-box;
      &:hover{
        animation: avatarSwag 2s linear 0s infinite reverse none;
      }
      @keyframes avatarSwag {
        25%{
          transform: rotate(40deg);
        }
        75%{
          transform: rotate(-40deg);
        }
      }
    }
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
        transition: .2s 0s ease-out;
        &:hover{
          transform: scale(1.25);
        }
      }
    }
  }
  #nav:hover{
    background-color: black;
  }
  .music_player{
    width: 400px;
    position: absolute;
    bottom: 0;
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
    .music_player{
      // opacity: .1;
      display: none;
    }
  }
}
.nav_list-enter-active,.nav_list-leave-active{
  transition: .3s -0.1s ease-in-out;
}
.nav_list-enter,.nav_list-leave-to{
  margin-top: 50%;
  // opacity: .5;
  // margin-left: 100px;
}
</style>

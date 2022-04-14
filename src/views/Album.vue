<template>
  <div id="album">
    <!-- <h1>秒速之子，回忆杀</h1> -->
      <div v-show="this.isIn">
        <div class="list" @mousewheel="scrollJump" ref="imgList">
          <ul>
            <li v-for="item in imgs" :key="item.id">
              <img :src="item.url | imgHandler" width="200" height="200"/>
              <p>{{item.name}}</p>
            </li>
          </ul>
        </div>
      </div>
      <transition-group tag="ul" name="transUl" mode="in-out">
        <li v-for="(item, index) in album" :key="item.id" :data-id="item.id" @click="inTo(item.id, index)">
          <img :src="item.cover" width="180" height="180" style="object-fit:cover"/>
          <p>{{item.name}}{{item.count}}</p>
        </li>
      </transition-group>
    <!-- </ul> -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      isIn: false,
      album: [],
      albumSec: [],
      tX: 0,
      fX: 0,
      mutex: true,
      imgs: []
    }
  },
  filters: {
    imgHandler (src) {
      return src + '/small'
    },
    imgNameHandler (name) {
      return name.substr(0, 8) + '...'
    }
  },
  beforeMount () {
    axios.get('/api/album/list').then(res => {
      this.album = res.data.data
      this.albumSec = JSON.parse(JSON.stringify(res.data.data))
    }).catch(res => res)
  },
  methods: {
    inTo (id, index) {
      if (this.albumSec) {
        this.album = []
      }
      this.isIn = !this.isIn
      if (this.isIn) {
        axios.get('/api/image/list?aid=' + id).then(res => {
          this.imgs = res.data.data
          console.log(this.imgs)
        }).catch(res => res)
      } else {
        this.imgs = []
      }
      setTimeout(() => {
        if (!this.isIn) this.album = this.albumSec
        else this.album.push(this.albumSec[index])
      }, 400)
    },
    scrollJump (e) {
      if (this.mutex) {
        this.scrollList(e)
      }
    },
    scrollList (e) {
      // this.mutex = false
      const delta = e.deltaY
      const node = this.$refs.imgList
      if (this.tX + delta > node.scrollWidth) {
        this.tX = node.scrollWidth
        return
      }
      if (this.tX + delta < -node.scrollWidth) {
        this.tX = 0
        return
      }

      // const judge = delta > 0
      // setInterval(() => {
      //   if (judge && this.fX < this.tX) {
      //     node.scrollTo(++this.fX, 0)
      //     this.fX += 2
      //   } else if (!judge && this.fX > this.tX) {
      //     node.scrollTo(--this.fX, 0)
      //     this.fX -= 2
      //   } else {
      //     return
      //   }
      //   console.log(1)
      // }, 10)

      // if(delta>=0) {
      //   while (this.fX < this.tX) {
      //     node.scrollTo(++this.fX, 0)
      //   }
      // }
      node.scrollTo(this.tX, 0)
      this.tX += delta
      // this.mutex = true
    }
  }
}
</script>

<style lang="scss">
#album{
  height: 100%;
  overflow-y: scroll;
  h1{
    margin-top: 260px;
    text-align: center;
    font-size: 60px;
    font-family: 'soft';
    font-weight: 200;
    color: gainsboro;
  }
  ul{
    margin-top: 60px;
    list-style: none;
    padding: 10px;
    li{
      width: 200px;
      height: 230px;
      background-color: rgba($color: #fff, $alpha: .5);
      box-shadow: 0px 0px 10px rgba(193, 58, 227, 0.522);
      display: inline-block;
      margin: 20px;
      overflow: hidden;
      text-align: center;
      img{
        margin-top: 10px;
        margin-bottom: 5px;
      }
      transition: .5s 0s ease;
      transform: rotateZ(-5deg);
      &:hover{
        background-color: rgba($color: #fff, $alpha: .7);
        box-shadow: 0px 0px 30px rgba(193, 58, 227, 0.7);
      }
    }
  }
  .transUl-enter-active,.transUl-leave-active{
    transition: all .4s ease-out;
  }
  .transUl-enter,.transUl-leave-to{
    transform: rotateZ(-6deg);
    opacity: 0;
  }
  .list{
    position:absolute;
    top:160px;
    left:100px;
    width: 80%;
    height: calc(100% - 280px);
    background-color: rgba(156, 156, 156, 0.509);
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    scroll-behavior: smooth;
    ul{
      width: 100%;
      // height: 50%;
      box-sizing: border-box;
      li{
        display: inline-block;
        transform: rotateZ(0deg);
        img{
          margin: 0;
        }
        p{
          line-height: 20px;
          font-size: 20px;
        }
      }
    }
  }
}
</style>

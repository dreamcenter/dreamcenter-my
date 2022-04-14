<template>
  <div id="_album">
    <h3>回忆</h3>
    <div class="left">
      <span style="background-color:coral;font-size:20px;margin-left:calc(50% - 40px)">
        <a href="#">添加相册</a>
      </span>
      <ul v-if="albums.length!=0">
        <li v-for="(item, index) in albums" :key="item.id" @click="showAlbum(item.id, index)">
          <b v-if="target===index">&gt;</b>
          <b v-else>|</b>
          <b>{{item.name}}</b>
          <i>{{item.count}}</i>
          <a href="#">编辑</a>
        </li>
      </ul>
    </div>
    <div class="right">
      <p>
        <a href="#">添加图片</a>
      </p>
      <ol v-if="imgs.length!=0">
        <li v-for="item in imgs" :key="item.id" @click="showInfo (item.id)"><img :src="item.url" width="100" height="100"/><p>{{item.name}}</p></li>
      </ol>
      <div class="info" v-show="isInfo">
        <img :src="info.url" width="400" height="300"/>
        <h1>{{info.name}}</h1>
        <p>id:{{info.id}}</p>
        <p>aid:{{info.aid}}</p>
        <p>time:{{info.time}}</p>
        <p>url:<a :href="info.url" target="_blank">链接</a></p>
        <p>describe:</p>
        <span>{{info.describe}}</span>
        <div @click="isInfo=false">X</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      aid: 1,
      target: 0,
      isInfo: false,
      albums: [],
      imgs: [],
      info: {}
    }
  },
  beforeMount () {
    axios.get('/api/album/list').then(res => {
      this.albums = res.data.data
    }).catch(err => err)
    axios.get('/api/image/list?aid=' + this.aid).then(res => {
      this.imgs = res.data.data
    }).catch(err => err)
  },
  methods: {
    showInfo (id) {
      this.isInfo = true
      this.info = this.imgs.find((item) => {
        return item.id === id
      })
    },
    showAlbum (id, index) {
      this.target = index
      axios.get('/api/image/list?aid=' + id).then(res => {
        this.imgs = res.data.data
      }).catch(err => err)
    }
  }
}
</script>

<style lang="scss">
#_album {
  border: 1px solid red;
  overflow: hidden;
  box-sizing: border-box;
  a{
    color: blue;
  }
  .left{
    width: 20%;
    height: 600px;
    float: left;
    overflow-y: scroll;
    background-color: rgba(255, 255, 255, 0.422);
    ul{
      li{
        border-bottom: 1px dashed black;
        overflow: hidden;
        line-height: 20px;
        b,i,a{
          margin: 10px;
        }
        b,i{
          float: left;
        }
        a{
          float: right;
        }
        transition: .3s 0s linear;
        &:hover{
          background-color: rgba(248, 245, 234, 0.845);
        }
      }
    }
  border: 1px solid red;
  box-sizing: border-box;
  }
  .right{
    background-color: rgba(255, 255, 255, 0.433);
    height: 600px;
    width: 80%;
    float: right;
    box-sizing: border-box;
    overflow-y: scroll;
    padding: 20px;
    ol{
      list-style: none;
      li{
        margin: 10px;
        display: inline-block;
        img{
          object-fit: cover;
        }
        p{
          text-align: center;
          cursor: default;
        }
      }
    }
    .info{
      overflow: hidden;
      background-color: rgba(99, 98, 97, 0.804);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      img{
        object-fit: contain;
      }
      h1{
        width: 400px;
        text-align: center;
        color: wheat;
      }
      p,span{
        margin-left: 10px;
        margin-top: 10px;
        font-size: 20px;
        color: wheat;
      }
      div{
        width:180px;
        height: 180px;
        position: absolute;
        color: rgba(255, 255, 255, 0.78);
        background-color: black;
        top: -90px;
        right: -90px;
        border-radius: 80px;
        text-align: left;
        line-height: 260px;
        text-indent: 30px;
        font-size: 60px;
        font-family:'Times New Roman', Times, serif;
        cursor: default;
        transition: .2s 0s ease-out;
        &:hover{
          box-shadow: 0 0 100px rgba($color: #000, $alpha: .5);
          color: white;
        }
      }
    }
  border: 1px solid red;
  }
}
</style>

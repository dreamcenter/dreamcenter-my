<template>
  <div id="_album">
    <h3>回忆</h3>
    <div class="left">
      <!-- <span style="background-color:coral;font-size:20px;margin-left:calc(50% - 40px)">
        <a href="#">添加相册</a>
      </span> -->
      <ul v-if="albums.length!=0">
        <li v-for="(item, index) in albums" :key="item.id" @click="showAlbum(item.id, index)">
          <b v-if="target===index">&gt;</b>
          <b v-else>|</b>
          <b>{{item.name}}</b>
          <i>{{item.count}}</i>
          <a href="#">编辑</a>
        </li>
        <li class="album_add">
          <b v-if="newAlbumName === null" @click="newAlbumName = ''" style="cursor:default;width:80%;text-align:center">添加相册</b>
          <p v-else>
            <input @keyup.enter="newAlbum" v-model="newAlbumName" style="height:20px;width:60%;margin-top:6px;margin-left:20px"/>
            <a href="#" @click="newAlbumName = null">退出</a>
          </p>
        </li>
      </ul>
    </div>
    <div class="right">
      <div>
        <form action="/api/image/add" method="post" enctype="multipart/form-data" @submit.prevent="beforeSubmit()">
          <input name="name" placeholder="更换名字" v-model="tempName"/>
          <input name="file" ref="file" type="file" style="width:200px;border:1px dashed black;margin:10px" accept="image/*"/>
          <input name="describe" placeholder="添加描述" v-model="describe" style="margin-right:10px"/>
          <input type="submit"/>
        </form>
      </div>
      <ol v-if="imgs.length!=0">
        <li v-for="item in imgs" :key="item.id" @click="showInfo (item.id)">
          <img :src="item.url | imgHandler" width="100" height="100"/>
          <p>{{item.name | imgNameHandler}}</p>
        </li>
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
      info: {},
      newAlbumName: null,
      tempTime: '',
      tempName: '',
      file: null,
      describe: ''
    }
  },
  filters: {
    imgHandler (src) {
      return src + '/icon'
    },
    imgNameHandler (name) {
      return name.substr(0, 8) + '...'
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
      this.aid = id
      axios.get('/api/image/list?aid=' + id).then(res => {
        this.imgs = res.data.data
      }).catch(err => err)
    },
    newAlbum () {
      var _name = this.newAlbumName.trim()
      if (_name === '') {
        alert('请填入专辑名称')
      } else {
        axios.post('/api/album/add', 'name=' + this.newAlbumName).then(res => {
          if (res.data.code === 200 && res.data.data === 1) {
            this.newAlbumName = null
            this.freshAlbum()
          } else {
            alert('插入失败')
          }
          console.log(res.data)
        }).catch(() => {
          alert('请检查名称和服务器状态')
        })
      }
    },
    freshAlbum () {
      axios.get('/api/album/list').then(res => {
        this.albums = res.data.data
      }).catch(err => err)
    },
    freshImg () {
      this.freshAlbum()
      axios.get('/api/image/list?aid=' + this.aid).then(res => {
        this.imgs = res.data.data
      }).catch(err => err)
    },
    beforeSubmit () {
      const req = new FormData()
      req.append('aid', this.aid)
      req.append('name', this.tempName)
      req.append('time', this.$time())
      req.append('describe', this.describe)
      const imgFile = this.$refs.file.files[0]
      req.append('file', imgFile)
      axios.post('/api/image/add', req, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        if (res.data.code === 200 && res.data.data === 1) {
          this.freshImg()
          alert('添加成功!')
        } else {
          alert('添加失败!!!!!!!\ndata:' + JSON.stringify(res.data))
        }
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
          font-family: '宋体';
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

<template>
  <div id="_view">
    <h3>full view</h3>
    <div class="status">图床状态<span class="status_color" :style="{'background-color':dogeStatus}"></span></div>
    <p>Blog Visit: {{vBlog}}</p>
    <p>Album Visit: {{vAlbum}}</p>
    <p>Dynamic Visit: {{vDynamic}}</p>
    <p id="drawVisit" v-show="initSync === 3">
      <span :style="{'width': getPcBlogVisit + 'px'}">{{vBlog}}</span>
      <span :style="{'width': getPcAlbumVisit + 'px'}">{{vAlbum}}</span>
      <span :style="{'width': getPcDynamicVisit + 'px'}">{{vDynamic}}</span>
    </p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      dogeStatus: 'red',
      vBlog: 0,
      vAlbum: 0,
      vDynamic: 0,
      initSync: 0
    }
  },
  computed: {
    getPcBlogVisit () {
      return 150 * this.vBlog / (this.vBlog + this.vAlbum + this.vDynamic)
    },
    getPcAlbumVisit () {
      return 150 * this.vAlbum / (this.vBlog + this.vAlbum + this.vDynamic)
    },
    getPcDynamicVisit () {
      return 150 * this.vDynamic / (this.vBlog + this.vAlbum + this.vDynamic)
    }
  },
  beforeMount () {
    axios.get('/api/info/doge').then(res => {
      if (res.data.data === 1) {
        this.dogeStatus = '#0f0'
      } else if (res.data.code === 200) {
        this.dogeStatus = 'orange'
      } else {
        this.dogeStatus = 'red'
      }
    }).catch(err => err)
    axios.get('/api/info/album').then(res => { this.vAlbum = res.data.data; this.initSync++ }).catch(err => err)
    axios.get('/api/info/dynamic').then(res => { this.vDynamic = res.data.data; this.initSync++ }).catch(err => err)
    axios.get('/api/info/blog').then(res => { this.vBlog = res.data.data; this.initSync++ }).catch(err => err)
  },
  mounted () {
  },
  beforeUpdate () {
  }
}
</script>

<style lang="scss">
#_view{
  .status{
    line-height: 20px;
    margin-top: 10px;
    .status_color{
      margin-left: 10px;
      width:12px;
      height: 12px;
      display: inline-block;
      border-radius: 6px;
      border: 2px solid coral;
    }
  }
  #drawVisit{
    width: 150px;
    border: 1px solid black;
    span{
      display: block;
      float: left;
      height: 16px;
      color: white;
      font-family: 'Times New Roman', Times, serif;
      text-align: center;
      line-height: 16px;
      &:nth-child(1){
        background-color: rgb(238, 142, 142);
      }
      &:nth-child(2){
        background-color: rgb(143, 166, 241);
      }
      &:nth-child(3){
        background-color: rgb(157, 233, 134);
      }
    }
    &::after{
      clear: both;
      content: '';
      display: block;
    }
  }
}
</style>

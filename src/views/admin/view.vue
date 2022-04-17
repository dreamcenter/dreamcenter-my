<template>
<!-- echarts -->
  <div id="_view">
    <h3>full view</h3>
    <div class="status">图床状态<span class="status_color" :style="{'background-color':dogeStatus}"></span></div>
    <div id="test" style="width:500px;height:500px;" v-show="initSync === 3"></div>
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
    const myChart = this.$echarts.init(document.getElementById('test'))
    myChart.setOption({
      series: [
        {
          type: 'pie',
          data: [
            {
              value: this.vDynamic,
              name: '动态 [' + this.vDynamic + ']'
            },
            {
              value: this.vBlog,
              name: '博客 [' + this.vBlog + ']'
            },
            {
              value: this.vAlbum,
              name: '相册 [' + this.vAlbum + ']'
            }
          ],
          radius: '150px'
        }
      ]
    })
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
}
</style>

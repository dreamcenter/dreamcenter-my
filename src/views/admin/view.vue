<template>
<!-- echarts -->
  <div id="_view">
    <h3>full view</h3>
    <div class="status">图床状态<span class="status_color" :style="{'background-color':dogeStatus}"></span></div>
    <div id="test" style="width:500px;height:500px;"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      dogeStatus: 'red'
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
  },
  mounted () {
    const myChart = this.$echarts.init(document.getElementById('test'))
    myChart.setOption({
      series: [
        {
          type: 'pie',
          data: [
            {
              value: 335,
              name: '动态'
            },
            {
              value: 234,
              name: '博客'
            },
            {
              value: 1548,
              name: '相册'
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

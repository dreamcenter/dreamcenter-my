<template>
<!-- echarts -->
  <div id="_view">
    <h3>full view</h3>
    <div id="test" style="width:500px;height:500px"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
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

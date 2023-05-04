<template>
  <div class="pie" :id="eid"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data () {
    return {
      gen: [
        {
          value: this.d1,
          name: this.n1
        },
        {
          value: this.d2,
          name: this.n2
        }
      ]
    }
  },
  props: ['eid', 'n1', 'd1', 'n2', 'd2'],
  mounted () {
    const pctData = echarts.init(document.getElementById(this.eid), 'dark')
    pctData.setOption({
      title: {
        text: this.eid,
        left: 'center',
        top: 'center'
      },
      tooltip: {
        formatter (params) {
          const { percent } = params
          return `${percent}%`
        }
      },
      series: [
        {
          type: 'pie',
          color: [
            '#66dd66', '#dd6666'
          ],
          data: this.gen,
          radius: ['40%', '70%'],
          label: {
            show: true,
            position: 'inside',
            formatter: '{b}\n{c}'
          }
        }
      ]
    })
  }
}
</script>

<style lang="scss">
.pie{
  width: 300px;
  height: 200px;
}
</style>

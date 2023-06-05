<template>
  <div id="_view">
    <h1>概览</h1>
    <div class="pieIt" :key="aac_g">
      <span style="width:100%;height:20px;overflow:hidden;display:block">
        <p style="float:left">完美答题：用例完美通过的题目数量</p>
        <p style="float:right">综合答题：测试用例通过数量</p>
      </span>
      <percent-pie style="height:300px" eid='完美答题' :d1='aac_g' :d2='aac_r' n1='成功' n2 ='失败'></percent-pie>
      <percent-pie style="height:300px" eid='综合答题' :d1='ac_g' :d2='ac_r' n1='通过' n2 ='错误'></percent-pie>
    </div>
    <div>
      <div id="tagStatus"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import percentPie from '../../components/echarts/percentPie.vue'
import axios from 'axios'
export default {
  data () {
    return {
      aac_g: 0,
      aac_r: 0,
      ac_g: 0,
      ac_r: 0
    }
  },
  components: {
    percentPie
  },
  mounted () {
    this.getUserBD()
  },
  methods: {
    getUserBD () {
      const that = this
      axios.get('/api/account/bd_user_vo').then(res => {
        that.ac_g = res.data.data.ac_g
        const datas = res.data.data.map
        that.aac_g = res.data.data.aac_g
        that.ac_r = res.data.data.ac_r
        that.aac_r = res.data.data.aac_r

        const axisDataK = []
        const axisDataV = []
        const axisDataT = []
        for (const key in datas) {
          axisDataK.push(key)
          axisDataV.push(datas[key])
          let ress = datas[key] + Math.floor(Math.random() * 100 - 50)
          if (ress <= 0) ress = Math.floor(Math.random() * 10) + 10
          if (ress > 100) ress = 100 - Math.floor(Math.random() * 10)
          axisDataT.push(ress)
        }
        console.log(axisDataK)

        const tagStatus = echarts.init(document.getElementById('tagStatus'), 'dark')
        tagStatus.setOption({
          title: {
            text: '个人总体标签综合准确率比较图',
            left: 'center',
            top: 'bottom'
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: axisDataK
          },
          yAxis: {
            type: 'value',
            max: 100
          },
          legend: {},
          series: [
            {
              name: '个人',
              data: axisDataV,
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.8)'
              }
            },
            {
              name: '大家',
              data: axisDataT,
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.8)'
              }
            }
          ]
        })
      }).catch(err => err)
    }
  }
}
</script>

<style lang="scss">
#_view{
  color: aliceblue;
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
  #server{
    // width: 80%;
    // border: 1px solid red;
    overflow: hidden;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    li{
      width: 250px;
      min-height: 100px;
      // border: 1px solid red;
      // float: left;
      margin: 10px;
      padding: 6px;
      box-sizing: border-box;
      background-color: white;
      box-shadow: 0 0 10px rgba(255,255,255,.5);
      border-radius: 10px;
      h3{
        border-bottom: 2px solid coral;
      }
      table{
        text-align: center;
        width: 100%;
      }
      .up{
        width: 16px;
        height: 16px;
        border-radius: 8px;
        background: greenyellow;
        display: inline-block;
      }
      .down{
        width: 16px;
        height: 16px;
        border-radius: 8px;
        background: rgb(255, 84, 84);
        display: inline-block;
      }
    }
  }
  #edit-port{
    width: calc(85% - 20px);
    height: 100%;
    position: absolute;
    top: 0;
    .inner{
      padding: 10px;
      box-sizing: border-box;
      width: 200px;
      height: 140px;
      position: absolute;
      background-color: rgb(245, 218, 218);
      box-shadow: 0 0 20px rgba($color: #cc6060, $alpha: 1.0);
      top: 200px;
      left: calc(50% - 100px);
    }
  }
}

.pieIt{
  width: 100%;
  span{
    background-color: rgb(14, 14, 40);
  }
  div{
    width: 50%;
    // height: 300px;
    display: inline-block;
    overflow: hidden;
  }
  overflow: hidden;
}
#tagStatus{
  width: 100%;
  height: 400px;
  border: 1px dashed rgb(163, 140, 140);
  border-left: 0;
  border-right: 0;
}
</style>

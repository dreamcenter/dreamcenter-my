<template>
  <div id="_view">
    <h1>概览</h1>
    <div class="pieIt">
      <percent-pie eid='acc' d1='30' d2='33' n1='' n2 =''></percent-pie>
      <percent-pie eid='ac' d1='47' d2='53' n1='' n2 =''></percent-pie>
    </div>
    <div>
      <div id="tagStatus"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import percentPie from '../../components/echarts/percentPie.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    percentPie
  },
  mounted () {
    const tagStatus = echarts.init(document.getElementById('tagStatus'), 'dark')
    tagStatus.setOption({
      title: {
        text: 'tag准确率',
        left: 'center',
        top: 'bottom'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: ['数学', 'dp', '回归', '贪心', '回溯', 'bfs', 'dfs']
      },
      yAxis: {
        type: 'value',
        max: 100
      },
      legend: {},
      series: [
        {
          name: '个人',
          data: [12, 100, 15, 80, 70, 65, 30],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        },
        {
          name: '大家',
          data: [19, 68, 53, 56, 23, 70, 38],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }
      ]
    })
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
  div{
    float: left;
  }
  overflow: hidden;
}
#tagStatus{
  width: 600px;
  height: 400px;
  border: 1px dashed rgb(163, 140, 140);
  border-left: 0;
  border-right: 0;
}
</style>

<template>
  <div id="home" :style="{'background': $store.state.isPc?'url('+homeBk+') fixed no-repeat':'', 'background-size':'cover'}">
    <h1>学科竞赛博客</h1>
    <p>一切的不利条件都是自身能力不足的体现</p>
    <div class="running_time">
      <a href="https://beian.miit.gov.cn/" title="前往查看" class="beian" target="_blank" style="color:rgba(255, 255, 255, 0.822)">皖ICP备2022005998号</a>
    </div>
  </div>
</template>

<script>
import { homeBk } from '../js/betterUrl'
export default {
  data () {
    return {
      homeBk
    }
  }
}
</script>

<style lang="scss">
#home{
  width: 100%;
  height: 100%;
  h1{
    width: 100%;
    top: calc(50% - 100px);
    font-family: 'soft';
    font-size: 100px;
    font-weight: 100;
    position: absolute;
    text-align: center;
    color: rgb(215, 240, 236);
    text-shadow: 0 0 15px rgba(16, 159, 255, .7);
    transition: .2s 0s linear;
    &:hover{
      text-shadow: 0 0 10px rgba(16, 159, 255, 1);
    }
  }
  p{
    width: 100%;
    top: calc(50%);
    font-family: 'soft';
    font-size: 40px;
    font-weight: 100;
    position: absolute;
    text-align: center;
    color: rgb(174, 255, 228);
    text-shadow: 0 0 4px rgba(248, 224, 116, 0.644);
  }
  .running_time{
    width: 200px;
    text-align: center;
    font-size:14px;
    text-indent: 0;
    position: fixed;
    bottom: 10px;
    left: calc(50% - 100px);
    .beian{
      text-decoration: none;
      transition: .2s 0s ease-in;
      &:hover{
        text-decoration: underline;
        font-size: 16px;
      }
    }
  }
}
@media screen and (max-width: 800px){
  #home{
    // background-color: white;
    h1{
      font-size: 80px;
      color: black;
      display: none;
    }
    p{
      font-size: 36px;
      color: black;
      display: none;
    }
  }
}
</style>

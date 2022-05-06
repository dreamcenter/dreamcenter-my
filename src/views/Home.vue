<template>
  <div id="home" :style="{'background': $store.state.isPc?'url('+homeBk+') fixed no-repeat':'', 'background-size':'cover'}">
    <h1>时光潜流</h1>
    <p>任时光流逝，进入无言的虚无。</p>
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

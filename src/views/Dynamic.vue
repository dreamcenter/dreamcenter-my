<template>
  <div id="dynamic">
    <div class="frame left" style="width:20%">THIS IS LEFT</div>
    <div class="frame center" style="width:60%">
      <ul>
        <li v-for="i in 4" :key="i">
          <h1>二零二二 * 四月四日</h1>
          <span>这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
            这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
            这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
            这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
            这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
            这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
            这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
            这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
          </span>
          <div ref="pics" style="text-align:center;background-color:rgba(200,200,200,.5)">
            <img width="100%" src="/imgs/temp.jpg"/>
          </div>
          <div v-for="j in 10" :key="j" style="width:100px;height:100px;display:inline-block;overflow:hidden;margin-top:10px;margin-right:10px">
            <img src="/imgs/temp.jpg" width="100%"/>
          </div>
        </li>
      </ul>
      <div style="height:100px"></div>
    </div>
    <div class="frame right" style="width:20%">THIS IS RIGHT</div>
  </div>
</template>

<script>
export default {
  methods: {
  }
}
</script>

<style lang="scss">
#dynamic{
  height: 100%;
  display: flex;
  overflow-y: scroll;
  .frame{
    margin-top: 60px;
    // border: 1px solid red;
    display: flexbox;
  }
  .center{
    ul{
      list-style-type: none;
      li{
        width: 100%;
        margin-top: 20px;
        box-sizing: border-box;
        font-family: '仿宋';
        padding: 10px;
        background-color: rgba(255,255,255,.6);
        box-shadow: 0 0 15px rgba(0,0,0,.3);
        overflow:hidden;
        span{
          // display: inline-block;
        }
      }
    }
  }
}
</style>

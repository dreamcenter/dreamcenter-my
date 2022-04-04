<template>
  <div id="blog">
    <div class="frame left" style="width:20%">THIS IS LEFT</div>
    <div class="frame center" style="width:60%">
      <ul>
        <li v-for="i in 4" :key="i">
          <h1>
            <b>标题{{i}}</b>
            <p style="float:right;font-size:16px;font-weight:200">2021-12-11</p>
          </h1>
          <p>这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
            这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
            这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
            这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
            这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
            这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容...
          </p>
          <p>
            <span v-for="j in 6" :key="j" style="margin-left:10px;border-radius:2px;background-color:rgba(0,200,120,.2)">#tag{{j}}</span>
          </p>
        </li>
      </ul>
      <div style="height:100px"></div>
    </div>
    <div class="frame right" style="width:20%">THIS IS RIGHT</div>
  </div>
</template>

<style lang="scss">
#blog{
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
        height: 180px;
        margin-top: 20px;
        box-sizing: border-box;
        font-family: '仿宋';
        padding: 10px;
        background-color: rgba(255,255,255,.6);
        box-shadow: 0 0 15px rgba(0,0,0,.3);
        overflow:hidden;
        // border: 1px solid blue;
        p{
          margin-top: 10px;
        }
      }
    }
  }
}
</style>

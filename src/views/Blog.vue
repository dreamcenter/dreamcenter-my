<template>
  <div id="blog">
    <div class="frame left" style="width:20%">THIS IS LEFT</div>
    <div class="frame center" style="width:60%">
      <ul>
        <li v-for="item in blogList" :key="item.id">
          <h1>
            <b>{{item.title}}</b>
            <p style="float:right;font-size:16px;font-weight:200">{{item.time}}</p>
          </h1>
          <p>{{item.content}}...</p>
          <p>
            <span v-for="j in 6" :key="j" style="margin-left:10px;border-radius:2px;background-color:rgba(0,200,120,.2)">#tag{{j}}</span>
          </p>
        </li>
      </ul>
      <div v-if="blogList.length!=0">
        <span v-for="i in 4" :key="i" style="background-color:coral;margin:2px">这是分页</span>
      </div>
      <div v-else><p style="margin-top: 260px;font-size: 100px;font-family: 'soft';font-weight: 200;text-align: center;color: gainsboro;">还是空空如也</p></div>
      <div style="height:100px"></div>
    </div>
    <div class="frame right" style="width:20%">THIS IS RIGHT</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      blogList: []
    }
  },
  beforeMount () {
    axios.post('/api/blog/page', 'pageNo=2&pageSize=7').then(res => {
      this.blogList = res.data.data
      console.log(this.blogList)
    }).catch(err => err)
  }
}
</script>

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
        // height: 180px;
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
        &:hover{
          box-shadow: 0 0 20px rgba(0,0,0,.4);
        }
      }
    }
  }
}
</style>

<template>
  <div id="article">
    <div class="frame left" style="width:20%" v-if="$store.state.isPc"> </div>
    <div class="frame center" :style="{'width':($store.state.isPc?'60%':'80%'),'padding':'10px','box-sizing': 'border-box'}">
      <h1 class="title">{{data.title}}</h1>
      <p class="time">{{data.time}}</p>
      <div v-html="data.content"></div>
      <div style="height:100px"></div>
      <span v-for="j in data.tags" :key="j.name" style="margin-left:10px;border-radius:2px;background-color:rgba(0,200,120,.2)">#{{j.name}}</span>
    </div>
    <div class="frame right" style="width:20%" v-if="$store.state.isPc"> </div>
    <!-- <div style="clear:both"></div> -->
  </div>
</template>

<script>
import axios from 'axios'
// 2 to //
import hljs from 'highlight.js'
import '../../css/a11y-dark.min.css'
export default {
  data () {
    return {
      id: -1,
      data: {
        title: '',
        time: '',
        content: '',
        tags: []
      }
    }
  },
  beforeMount () {
    this.id = this.$route.params.id
    axios.post('/api/blog/id', `id=${this.id}`).then(res => {
      this.data = res.data.data
    }).catch(err => err)
    hljs.highlightAll()
  }

}
</script>

<style lang="scss">
#article{
  height: 100%;
  // display: flex;
  overflow-y: scroll;
  font-family: '仿宋';
  p{
    margin: 10px 0;
  }
  .frame{
    margin-top: 80px;
    // border: 1px solid red;
    // display: flexbox;
  }
  .center{
    margin-left: 20%;
    background-color: rgba(186, 181, 181, 0.1);
    // background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 10px rgba(0,0,0,.5);
    overflow: hidden;
    // min-height: 100%;
    // overflow: scroll;
    .title{
      text-align: center;
      font-family: '宋体';
    }
    .time{
      text-align: center;
      font-size: 12px;
      // margin-right: 100px;
      margin-bottom: 10px;
      color: rgb(111, 106, 106);
    }

    img{
      display: block;
    }
    /* table 样式 */
    table {
      border-top: 1px solid #ccc;
      border-left: 1px solid #ccc;
    }
    table td, table th {
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      padding: 3px 5px;
    }
    table th {
      border-bottom: 2px solid #ccc;
      text-align: center;
    }

    /* blockquote 样式 */
    blockquote {
      display: block;
      border-left: 8px solid #d0e5f2;
      padding: 5px 10px;
      margin: 10px 0;
      line-height: 1.4;
      font-size: 100%;
      background-color: #f1f1f1;
    }

    /* code 样式 */
    code {
      // display: inline-block;
      // display: inline;
      // zoom: 1;
      color: white;
      font-weight: bold;
      font-size: 16px;
      // text-indent: 1rem;
      padding: 2px;
      background-color: #000;
      overflow-x: auto;
      // border-radius: 3px;
      // padding: 3px 5px;
      // margin: 0 3px;
    }
    pre code {
      display: block;
    }

    /* ul ol 样式 */
    ul, ol {
      margin: 10px 0 10px 20px;
    }
  }
  &::after{
    content: '';
    display: block;
    clear: both;
  }
}
@media screen and (max-width: 800px){
  #article{
    .center{
      margin: 80px auto;
    }
  }
}
</style>

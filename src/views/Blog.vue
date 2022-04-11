<template>
  <div id="blog">
    <div class="frame left" style="width:20%"> </div>
    <div class="frame center" style="width:60%">
      <ul>
        <li v-for="item in blogList" :key="item.id" @click="jump(item.id)">
          <h1>
            <b>{{item.title}}</b>
            <p style="float:right;font-size:16px;font-weight:200">{{item.time}}</p>
          </h1>
          <p>{{item.content}}...</p>
          <p>
            <span v-for="j in item.tags" :key="j.name" style="margin-left:10px;border-radius:2px;background-color:rgba(0,200,120,.2)">#{{j.name}}</span>
          </p>
        </li>
      </ul>
      <div v-if="blogList.length!=0">
        <el-pagination
          id="page"
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :current-page="currentPage"
          layout="prev, pager, next, jumper"
          :total="totalSize">
        </el-pagination>
      </div>
      <div v-else><p style="margin-top: 260px;font-size: 100px;font-family: 'soft';font-weight: 200;text-align: center;color: gainsboro;">还是空空如也</p></div>
      <div style="height:100px"></div>
    </div>
    <div class="frame right" style="width:20%"> </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 7,
      blogList: [],
      totalSize: 8
    }
  },
  beforeMount () {
    axios.post('/api/blog/page',
      `pageNo=${this.currentPage}&pageSize=${this.pageSize}`).then(res => {
      this.blogList = res.data.data
      // console.log(this.blogList)
    }).catch(err => err)
    axios.get('/api/blog/count',
      `pageNo=${this.currentPage}&pageSize=${this.pageSize}`).then(res => {
      console.log(res.data)
      this.totalSize = res.data.data
    }).catch(err => err)
  },
  methods: {
    handleCurrentChange (val) {
      axios.post('/api/blog/page',
      `pageNo=${val}&pageSize=${this.pageSize}`).then(res => {
        this.blogList = res.data.data
      }).catch(err => err)
    },
    jump (id) {
      this.$router.push('/Blog/' + id)
    }
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
        cursor: pointer;
        // border: 1px solid blue;
        p{
          margin-top: 10px;
        }
        &:hover{
          box-shadow: 0 0 20px rgba(0,0,0,.4);
        }
      }
    }
    #page{
      width:100%;
      margin-top: 10px;
      li{
        width: 30px;
        padding: 0;
        margin: 0;
        box-shadow: none;
        font-size: 18px;
        font-family: 'dotted';
        font-weight: 300;
      }
    }
  }
}
</style>

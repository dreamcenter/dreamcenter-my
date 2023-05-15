<template>
  <div id="blog">
    <div class="frame left" style="width:20%" v-if="$store.state.isPc"> </div>
    <div class="frame center" :style="{'width':$store.state.isPc?'60%':'80%'}">
      <!-- <ul> -->
      <transition-group tag="ul" name="blog_list">
        <li v-for="item in $store.getters.getBlogsByPage" :key="item.id" @click="jump(item.id)">
          <h2>
            <b>{{item.title}}</b>
            <p style="float:right;font-size:16px;font-weight:200">{{item.time}}</p>
          </h2>
          <p>{{item.content}}...</p>
          <p>
            <span v-for="j in item.tags" :key="j.name" style="margin-left:10px;border-radius:2px;background-color:rgba(0,200,120,.2)">#{{j.name}}</span>
            <span style="margin-right:20px;font-size:12px;float:right;color:gray;">
              <span style="font-size:14px">{{item.nickname}} / </span>
              <span> {{item.visit}} 阅读</span>
            </span>
          </p>
        </li>
      </transition-group>
      <!-- </ul> -->
      <div v-if="$store.getters.getBlogsByPage.length!=0">
        <el-pagination
          id="page"
          @current-change="handleCurrentChange"
          :page-size="$store.state.blogPageSize"
          :current-page="$store.state.blogPage"
          :pager-count="$store.state.pagerCount"
          layout="prev, pager, next"
          :total="$store.state.blogTotalSize" style="text-align:center">
        </el-pagination>
      </div>
      <div v-else><p style="margin-top: 260px;font-size: 100px;font-family: 'soft';font-weight: 200;text-align: center;color: gainsboro;">还是空空如也</p></div>
      <div style="height:100px"></div>
    </div>
    <div class="frame right" style="width:20%;color:white" v-if="$store.state.isPc">
      <div class="suggest">
        <h2>博客推荐</h2>
        <ol>
          <li v-for="item in suggestBlogs" :key="item.id">
            <a :href="'/Blog/'+item.id">{{item.title}}</a>
          </li>
        </ol>
      </div>
    </div>
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
      totalSize: 8,
      suggestBlogs: []
    }
  },
  beforeMount () {
    this.$store.dispatch('getBlogTotalSize')
    this.$store.dispatch('getBlogList')
    axios.get('/api/blog/suggestList').then(res => {
      if (res.data.code === 200) this.suggestBlogs = res.data.data
    }).catch(err => err)
  },
  methods: {
    handleCurrentChange (val) {
      this.$store.commit('changeBlogPage', val)
      this.$store.dispatch('getBlogList')
      document.querySelector('#blog').scrollTo(0, 0)
    },
    jump (id) {
      this.$router.push('/Blog/' + id).catch(err => err)
    }
  }
}
</script>

<style lang="scss">
#blog{
  height: 100%;
  display: flex;
  overflow-y: scroll;
  scroll-behavior:smooth;
  font-family: '仿宋';
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
        color: rgb(198, 215, 231);
        background-color: rgba(59, 56, 56, 0.6);
        box-shadow: 0 0 15px rgba(0,0,0,.3);
        overflow:hidden;
        cursor: pointer;
        // border: 1px solid blue;
        transition: .3s ease-out;
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
        // font-family: 'dotted';
        font-weight: 300;
      }
    }
  }
  .right{
    padding: 70px 0 0 70px;
    .suggest{
      h2{
        margin-left: 20px;
        color: bisque;
      }
      li{
        margin: 10px;
        a{
          text-decoration: none;
          color: white;
          transition: .1s linear;
          &:hover{
            color: wheat;
            font-size: 18px;
          }
        }
      }
      position: fixed;
      top: 100px;
    }
  }
}
@media screen and (max-width: 800px){
  #blog{
    .center{
      margin: 60px auto;
      h1{
        font-size: 24px;
        b{
          display: block;
        }
        p{
          background-color: rgba(244, 255, 127, 0.153);
        }
      }
    }
  }
}

.blog_list-enter-active,.blog_list-leave-active{
  transition: .3s -0.1s ease-in;
}
.blog_list-enter,.blog_list-leave-to{
  opacity: 0;
}
</style>

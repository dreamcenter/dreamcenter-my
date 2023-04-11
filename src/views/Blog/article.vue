<template>
  <div id="article">
    <div class="frame left" style="width:20%" v-if="$store.state.isPc"> </div>
    <div class="frame center" :style="{'width':($store.state.isPc?'60%':'85%'),'padding':'10px','box-sizing': 'border-box'}">
      <h1 class="title">{{data.title}}</h1>
      <p class="time">{{data.time}} &nbsp; 浏览: {{data.visit}}次 &nbsp; 作者: {{data.nickname}}</p>
      <div v-html="data.content"></div>
      <div style="height:100px"></div>
      <span v-for="j in data.tags" :key="j.name" style="margin-left:10px;border-radius:2px;background-color:rgba(0,200,120,.2)">#{{j.name}}</span>
      <div class="rwc">
        <h2>评论区</h2>
        <review id="rw" v-if="parent===0 && $store.state.nickname!==''" :parent='parent' :target='target' :uri='uri' :bid='id' @review_success='reviewSuccess(1)'/>
        <span v-if="$store.state.nickname===''">
          <span>&nbsp;&nbsp;&nbsp;请登录进行评论哦!</span>
          <button @click="gotoLogin()" style="background-color:rgba(255,255,255,.6)">前往登录</button>
          <br/><br/>
        </span>
        <ol>
          <li class="parentReply" v-for="(item, index) in reviewList" :key="item.id">
            <img :src="item.email" width="60" height="60"/>
            <div>
              <b @click="jump(item.url)">{{item.nickname}}</b><br/>
              <i>{{item.time}}</i>
              <p class="rw_msg" style="font-size:16px;font-family:default">{{item.msg}}</p>
              <p @click="reply(index, item.id, item.id)" class="reply">回复</p>
              <ul>
                <li v-for="subItem in item.child" :key="subItem.id">
                  <img :src="subItem.email" width="60" height="60"/>
                  <div>
                    <b @click="jump(item.url)">{{subItem.nickname}}</b><br/>
                    <i>{{subItem.time}}</i>
                    <p style="font-size:16px">@{{subItem.msg}}</p>
                    <p @click="reply(index, item.id, subItem.id)" class="reply">回复</p>
                  </div>
                </li>
              </ul>
            </div>
            <review v-if="parent===item.id && $store.state.nickname!==''" style="width:100%" :parent='parent' :target='target' :uri='uri' :bid='id' @review_success='reviewSuccess'>
              <slot slot="extention">
                <a @click="cancel" style="cursor:default;color:blue;text-decoration:underline;margin:10px">取消回复</a>
              </slot>
            </review>
          </li>
        </ol>
        <div v-if="count!=0">
          <el-pagination
            id="page"
            @current-change="reviewSuccess"
            :page-size="pageSize"
            :current-page="page"
            layout="prev, pager, next, jumper"
            :total="count">
          </el-pagination>
        </div>
      </div>
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
import review from '../../components/review.vue'
export default {
  data () {
    return {
      id: -1,
      data: {
        title: '',
        time: '',
        content: '',
        tags: []
      },
      parent: 0,
      target: 0,
      reviewList: [],
      count: 0,
      page: 1,
      pageSize: 2,
      uri: '/api/bloRw/insert'
    }
  },
  components: {
    review: review
  },
  beforeMount () {
    this.id = this.$route.params.id
    const that = this
    axios.post('/api/blog/id', `id=${this.id}`).then(res => {
      this.data = res.data.data
      // 同步博客浏览量缓存模块
      const blogPage = that.$store.state.blogPage
      that.$store.state.blogList.forEach(el => {
        if (el[0] === blogPage) {
          const lst = el[1]
          for (let i = 0; i < lst.length; i++) {
            if (lst[i].id === Number.parseInt(that.id)) {
              lst[i].visit = that.data.visit
            }
          }
        }
      })
    }).catch(err => err)
    hljs.highlightAll()
    this.reviewSuccess()
  },
  methods: {
    gotoLogin () {
      this.$router.push('/account')
    },
    reply (index, parent, target) {
      this.parent = parent
      this.target = target
    },
    cancel () {
      this.parent = 0
      this.target = 0
    },
    jump (url) {
      if (url === '') return
      window.open(url)
    },
    reviewSuccess (val) {
      this.page = val !== undefined ? val : this.page
      this.cancel()
      axios.get('/api/bloRw/list?size=' + this.pageSize + '&page=' + this.page + '&bid=' + this.id).then(res => {
        this.reviewList = res.data.data.list
        this.count = res.data.data.count
      }).catch(err => err)
    }
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
    font-size: 18px;
    line-height: 30px;
    // font-family: '正楷';
  }
  .frame{
    margin-top: 80px;
    // border: 1px solid red;
    // display: flexbox;
  }
  .center{
    color: #d0e5f2;
    margin-left: 20%;
    background-color: rgba(46, 46, 44, 0.877);
    // background-color: rgba(255, 255, 255, 0.5);
    // box-shadow: 0 0 10px rgba(0,0,0,.5);
    box-shadow: 0 0 10px rgb(102, 102, 100);
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
    pre{
      border-radius: 10px;
      overflow-x: auto;
      background-color: #000;
    }
    code {
      color: rgb(221, 221, 221);
      font-weight: bold;
      font-size: 16px;
      padding: 4px 10px;
    }
    pre code {
      display: block;
    }

    /* ul ol 样式 */
    ul, ol {
      margin: 10px 0 10px 20px;
    }
    .rwc{
      margin-top: 20px;
      background-color: rgba(67, 76, 65, 0.498);
      h2{
        text-align: center;
        padding-top: 10px;
      }
      #rw{
        padding-top: 30px;
        padding-left: 5%;
      }
      ol{
        list-style: none;
        margin: 10px;
        li{
          // width: 90%;
          // background-color: rgba(127, 255, 212, 0.16);
          border-top: 1px solid rgb(202, 202, 202);
          padding: 4px 10px;
          img{
            vertical-align: top;
            border-radius: 30px;
            border: 1px solid gray;
            transition: .2s 0s ease-in-out;
            &:hover{
              transform: rotateZ(-15deg);
            }
            float: left;
          }
          div{
            width: calc(100% - 100px);
            // border:1px solid coral;
            display: inline-block;
            margin-left: 15px;
            b{
              color: blueviolet;
            }
            i{
              font-size: 4px;
              font-style: normal;
              color: gray;
            }
            p{
              font-size: 12px;
              line-height: 18px;
            }
            ul{
              // width: calc(100% + 20px);
              list-style: none;
              margin-left: -50px;
              // border: 1px solid red;
              li{
                width: 100%;
              }
            }
          }
          .rw_msg{
            // border: 1px solid red;
            word-break:break-all;
            white-space: pre-line;
          }
          .reply{
            color: blue;
          }
        }
      }
    }
  }
  &::after{
    content: '';
    display: block;
    clear: both;
  }
  #page{
    text-align: center;
    .el-pager{
      margin: 0 0;
    }
    .btn-prev,.number,.btn-next,.el-input__inner{
      background: rgba(0,0,0,0);
    }
  }
}
@media screen and (max-width: 800px){
  #article{
    .center{
      margin: 80px auto;
      pre::-webkit-scrollbar{
        height: 3px;
      }
    }
  }
}
</style>

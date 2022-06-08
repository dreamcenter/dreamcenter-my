<template>
  <div id="inspire">
    <div class="frame left" style="width:10%" v-if="$store.state.isPc"> </div>
    <div class="frame center" :style="{'width':$store.state.isPc?'60%':'80%'}">
      <h1>友人志</h1>
      <ul>
        <li v-for="item in friendList" :key="item.id" @click="jump(item.url)">
          <img :src="item.avatar" width="60" height="60"/>
          <div>
            <h3>{{item.nickname}}</h3>
            <p>{{item.describe }}</p>
          </div>
        </li>
        <li v-for="i in placeHoldFriend" :key="'k'+i">
          <img src="/imgs/avatar.jpg" width="60" height="60"/>
          <div>
            <h3>占位填充</h3>
            <p>这样看起来就很多了</p>
          </div>
        </li>
        <p v-if="!$store.state.isPc" style="background-color:gray;margin-bottom:10px;color:white;padding:10px">申请友链请转至pc端访问此页面</p>
      </ul>
    </div>
    <div class="frame right" style="width:30%" v-if="$store.state.isPc">
      <h1>申请 &amp; 留言</h1>
      <review  v-if="parent===0" :parent='parent' :target='target' @review_success='reviewSuccess(1)'/>
      <i style="color:red;font-size:12px">*申请友链模板见评论最后一页</i>
      <ol>
        <li class="parentReply" v-for="(item, index) in reviewList" :key="item.id">
          <img :src="item.email" width="60" height="60"/>
          <div>
            <b @click="jump(item.url)">{{item.nickname}}</b><br/>
            <i>{{item.time}}</i>
            <p class="rw_msg" style="font-size:12px;font-family:default">{{item.msg}}</p>
            <p @click="reply(index, item.id, item.id)" class="reply">回复</p>
            <ul>
              <li v-for="subItem in item.child" :key="subItem.id">
                <img :src="subItem.email" width="60" height="60"/>
                <div>
                  <b @click="jump(item.url)">{{subItem.nickname}}</b><br/>
                  <i>{{subItem.time}}</i>
                  <p>@{{subItem.msg}}</p>
                  <p @click="reply(index, item.id, subItem.id)" class="reply">回复</p>
                </div>
              </li>
            </ul>
          </div>
          <review v-if="parent===item.id" style="width:100%" :parent='parent' :target='target' @review_success='reviewSuccess'>
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
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import review from '../components/review.vue'
Vue.component('review', review)
export default {
  data () {
    return {
      friendList: [],
      reviewList: [],
      count: 0,
      page: 1,
      pageSize: 3,
      parent: 0,
      target: 0,
      placeHoldFriend: 14
    }
  },
  beforeMount () {
    axios.get('/api/friend/list').then(res => {
      this.friendList = res.data.data
      if (this.friendList.length < this.placeHoldFriend) {
        this.placeHoldFriend = this.placeHoldFriend - this.friendList.length
      } else {
        this.placeHoldFriend = 0
      }
    }).catch(err => err)
    this.reviewSuccess()
  },
  methods: {
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
      axios.get('/api/friRw/list?size=' + this.pageSize + '&page=' + this.page).then(res => {
        this.reviewList = res.data.data.list
        this.count = res.data.data.count
      }).catch(err => err)
    }
  }
}
</script>

<style lang="scss">
#inspire{
  cursor: default;
  height: 100%;
  display: flex;
  overflow-y: auto;
  .frame{
    margin-top: 60px;
    display: flex;
    h1{
      font-family: 'soft';
      display: block;
      border-right: 2px solid salmon;
      margin: 10px 10px 0 0;
    }
  }
  .center{
    cursor: default;
    ul{
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      li{
        display: flexbox;
        margin: 10px;
        // width: 400px;
        width: 45%;
        height: 80px;
        box-shadow: 0 0 20px rgba(0,0,0,.3);
        padding: 10px;
        box-sizing: border-box;
        overflow: hidden;
        div{
          width: calc(100% - 80px);
          height: 60px;
          display: inline-block;
          // border: 1px solid red;
          vertical-align: top;
          margin-left: 10px;
          overflow: hidden;
          h3,p{
            vertical-align: top;
          }
          h3{
            width: 100%;
            // text-align: center;
            font-family: 'soft';
            font-size: 20px;
            white-space: nowrap;
          }
          p{
            font-family: 'soft';
            margin-top: 4px;
            overflow: hidden;
          }
        }
        transition: .2s 0s linear;
        &:hover{
          box-shadow:0 0 10px rgb(251, 255, 8);
          // color: white;
        }
      }
    }
  }
  .right{
    display: block;
    .reply{
      cursor: default;
      &:hover{
        font-weight: 700;
      }
    }
    ol{
      list-style: none;
      margin: 10px;
      li{
        width: 90%;
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
        }
        div{
          width: calc(100% - 100px);
          // border:1px solid coral;
          display: inline-block;
          margin-left: 15px;
          i{
            font-size: 4px;
            font-style: normal;
            color: gray;
          }
          p{
            font-size: 12px;
          }
          ul{
            width: calc(100% + 20px);
            list-style: none;
            margin-left: -20px;
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
      }
    }
  }
}
@media screen and (max-width: 800px){
  #inspire{
    flex-direction: column;
    .center{
      margin: 60px auto;
      ul{
        li{
          width: 100%;
        }
      }
    }
  }
}
</style>

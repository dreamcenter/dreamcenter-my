<template>
  <div id="dynamic" @scroll="scroll()">
    <div class="frame left" style="width:20%" v-if="$store.state.isPc"> </div>
    <div class="frame center" :style="{'width':$store.state.isPc?'60%':'80%'}">
      <!-- <ul> -->
      <transition-group tag="ul" name="dynamic_list">
        <!-- <li key="ads">
          <ins class="adsbygoogle"
            style="display:block"
            data-ad-format="fluid"
            data-ad-layout-key="-fb+5w+4e-db+86"
            data-ad-client="ca-pub-1328360282542167"
            data-ad-slot="8621483328"></ins>
        </li> -->
        <li v-for="(item, index) in dynamicList" :key="item.id">
          <h2>{{item.time | beautyDate}}#{{item.id}}</h2>
          <span style="margin-right:2rem;font-size:12px">[{{item.time | beautyTime}}]</span>
          <p></p>
          <span v-html="item.content">
          </span>
          <form class="dataSquare">
            <tr>
              <td>答题情况: {{item.acc}} / {{item.total}} [{{item.total==0?'0.00':new Number(item.acc/item.total*100).toFixed(2)}}%]</td>
              <td v-if="$store.state.nickname!='' && $store.state.nickname!='管理员'">提交历史: {{item.history == null ? '-' : item.history}}</td>
              <td v-if="$store.state.nickname!='' && $store.state.nickname!='管理员'"><label>答题</label>:<textarea rows="1" v-model="item.code" placeholder="粘贴代码"/></td>
              <td v-if="$store.state.nickname!='' && $store.state.nickname!='管理员'"><button @click.prevent="ojPush(index)">提交</button></td>
            </tr>
          </form>
        </li>
      </transition-group>

      <!-- </ul> -->
      <div style="height:100px"></div>
    </div>
    <div class="frame right" style="width:20%" v-if="$store.state.isPc">
      <ul>
        <li @click="changeTag('')">全部</li>
        <li v-for="item in dynamicTags" :key="item" @click="changeTag(item)">{{item}}</li>
      </ul>
      <div id="goToTop" @click="toTop">回到顶部</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      sheet: 1,
      dynamicList: [],
      dynamicTags: [],
      stag: '',
      scrollLock: false
    }
  },
  beforeMount () {
    axios.get('/api/dynamic/sheet?sheet=' + this.sheet + `&nickname=${this.$store.state.nickname}&tag=${this.stag}`).then(res => {
      this.dynamicList = res.data.data
    }).catch(err => err)
    axios.get('/api/dynamic/tags').then(res => {
      this.dynamicTags = res.data.data
    }).catch(err => err)
  },
  filters: {
    beautyDate (time) {
      // 二零二二 * 四月四日
      // 2022-04-11 11:12:19
      const arr = '零一二三四五六七八九十'
      let res = ''
      const date = time.split(' ')[0]
      const year = date.split('-')[0]
      const month = date.split('-')[1]
      const day = date.split('-')[2]

      for (var i = 0; i < year.length; i++) { res += arr[year[i]] }
      res += ' * '

      if (month[0] !== '0') {
        if (month[1] === '0') res += '十'
        else res += '十' + arr[month[1]]
      } else {
        res += arr[month[1]]
      }
      res += '月'

      if (day[0] !== '0') {
        if (day[0] !== '1') { res += arr[day[0]] }
        res += '十' + (day[1] !== '0' ? arr[day[1]] : '')
      } else {
        res += arr[day[1]]
      }
      res += '日'

      return res
    },
    beautyTime (time) {
      return time.split(' ')[1]
    }
  },
  methods: {
    changeTag (tag) {
      this.stag = tag
      this.dynamicList = []
      this.sheet = 1
      this.scrollLock = false
      axios.get('/api/dynamic/sheet?sheet=' + this.sheet + `&nickname=${this.$store.state.nickname}&tag=${this.stag}`).then(res => {
        this.dynamicList = res.data.data
      }).catch(err => err)
    },
    getByTag () {

    },
    scroll () {
      if (!this.scrollLock) {
        const cards = document.querySelector('li:last-child')
        if (cards.getBoundingClientRect().top < 1000) {
          console.log('need more')
          this.scrollLock = true
          this.sheet++
          axios.get('/api/dynamic/sheet?sheet=' + this.sheet + `&nickname=${this.$store.state.nickname}&tag=${this.stag}`).then(res => {
            if (res.data.data.length === 0) {
              console.log('已经加载完全部数据啦！')
              this.scrollLock = true
            } else {
              this.dynamicList = [...this.dynamicList, ...res.data.data]
              // console.log(this.dynamicList)
              setTimeout(() => {
                this.scrollLock = false
              }, 1000)
            }
          }).catch(err => err)
        }
      }
    },
    toTop () {
      document.querySelector('#dynamic').scrollTo(0, 0)
    },
    ojPush (index) {
      const tmp = {
        dynamicID: this.dynamicList[index].id,
        code: this.dynamicList[index].code == null ? '' : this.dynamicList[index].code
      }
      axios.post('/api/oj', JSON.stringify(tmp), {
        headers: {
          'content-type': 'application/json'
        }
      }).then(res => {
        const datas = res.data.split(':')
        if (datas[0] === '2') {
          alert(datas[1])
          return
        }
        if (datas[0] === '1') this.dynamicList[index].acc++
        this.dynamicList[index].total++
        this.dynamicList[index].history = datas[1]
      }).catch(err => err)
      // console.log(this.$store.state.nickname)
    }
  }
}
</script>

<style lang="scss">
#dynamic{
  scroll-behavior: smooth;
  height: 100%;
  display: flex;
  overflow-y: scroll;
  font-family: '仿宋';

  .dataSquare{
    background: white;
    margin: 2px;
    text-align: center;
    td{
      width: 20%;
      // border: 1px solid red;
      button{
        width: 80%;
        margin: 2px;
        box-sizing: border-box;
      }
    }
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

  .frame{
    margin-top: 60px;
    // border: 1px solid red;
    display: flexbox;
  }
  .center{
    >ul{
      list-style-type: none;
      >li{
        width: 100%;
        margin-top: 20px;
        box-sizing: border-box;
        font-family: '仿宋';
        padding: 10px;
        background-color: rgba(255, 255, 255, 0.6);
        box-shadow: 0 0 5px rgba(255, 255, 255, 1);
        overflow:hidden;
        span{
          // display: inline-block;
          p{
            margin: 4px 0;
          }
        }
        ul{
          padding-left: 2rem;
          color: #000;
        }
      }
    }
  }
  .right{
    ul{
      color: aliceblue;
      list-style: none;
      margin: 20px;
      position: fixed;
      li{
        display: inline-block;
        background: rgb(64, 125, 127);
        margin: 3px;
        padding: 1px 6px;
        border-radius: 6px;
        &:hover{
          background: rgb(42, 84, 86);
        }
      }
    }
  }
  #goToTop{
    width: 50px;
    height: 50px;
    position: fixed;
    right: 12%;
    bottom: 10%;
    background-color: rgb(133, 114, 230);
    padding: 2px;
    box-sizing: border-box;
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 17px;
    box-shadow: 0px 0px 10px rgba(228, 214, 214, 0.5);
    transition: .4s 0s ease-in;
    cursor: pointer;
    &:hover{
      background-color: rgb(255, 255, 255);
      color: rgb(163, 162, 162);
      box-shadow: 4px 6px 20px rgba(0,0,0,.5);
      transform: rotateZ(360deg);
    }
  }
}
@media screen and (max-width: 800px){
  #dynamic{
    .center{
      margin: 60px auto;
      h1{
        font-size: 22px;
      }
    }
    iframe{
      width: 100%;
    }
  }
}

.dynamic_list-enter-active,.dynamic_list-leave-active{
  transition: .3s -0.1s ease-in;
}
.dynamic_list-enter,.dynamic_list-leave-to{
  opacity: 0;
}
</style>

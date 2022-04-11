<template>
  <div id="dynamic" @scroll="scroll()">
    <div class="frame left" style="width:20%">THIS IS LEFT</div>
    <div class="frame center" style="width:60%">
      <ul>
        <li v-for="item in dynamicList" :key="item.id">
          <h1>{{item.time | beautyDate}}</h1>
          <span style="margin-right:2rem;font-size:12px">[{{item.time | beautyTime}}]</span>
          <p></p>
          <span>{{item.content}}
          <!-- 二零二二 * 四月四日 -->
          </span>
          <div ref="pics" style="text-align:center;background-color:rgba(200,200,200,.5)">
            <img width="100%" src="/imgs/temp.jpg"/>
          </div>
          <div v-for="j in 10" :key="j+1" style="width:100px;height:100px;display:inline-block;overflow:hidden;margin-top:10px;margin-right:10px">
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
import axios from 'axios'
export default {
  data () {
    return {
      sheet: 1,
      dynamicList: [],
      scrollLock: false
    }
  },
  beforeMount () {
    axios.get('/api/dynamic/sheet?sheet=' + this.sheet).then(res => {
      this.dynamicList = res.data.data
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
        res += '十' + arr[month[1]]
      } else {
        res += arr[month[1]]
      }
      res += '月'

      if (day[0] !== '0') {
        if (day[0] !== '1') { res += arr[day[0]] }
        res += '十' + arr[day[1]]
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
    scroll () {
      if (!this.scrollLock) {
        const cards = document.querySelector('li:last-child')
        if (cards.getBoundingClientRect().top < 1000) {
          console.log('need more')
          this.scrollLock = true
          this.sheet++
          axios.get('/api/dynamic/sheet?sheet=' + this.sheet).then(res => {
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
    }
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

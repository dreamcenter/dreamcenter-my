<template>
  <div id="acgn">
    <!-- <h1>现在还不想做啦，にに</h1> -->
    <div class="frame left" style="width:20%"> </div>
    <div class="frame center" style="width:60%">
      <div class="acgn_entry" id="acgn_watching">
        <h2>正在看</h2>
        <div>
          <tab v-for="item in animeList[0]" :key="item.id" :icon="item.icon" :title="item.title" :temp="item.temp" :total="item.total"/>
        </div>
      </div>
      <div class="acgn_entry" id="acgn_toWatch">
        <h2>待看</h2>
        <div>
          <tab v-for="item in animeList[1]" :key="item.id" :icon="item.icon" :title="item.title" :temp="item.temp" :total="item.total"/>
        </div>
      </div>
      <!-- <div class="acgn_entry" id="acgn_review">
        <h2>番评</h2>
        <h3 style="text-align:center;color:gray;margin-top:20px;font-size:50px;font-family:'soft">暂无番评</h3>
      </div> -->
      <div class="acgn_entry" id="acgn_mayWatch">
        <h2>未看</h2>
        <div>
          <tab v-for="item in animeList[2]" :key="item.id" :icon="item.icon" :title="item.title" :temp="item.temp" :total="item.total"/>
        </div>
      </div>
      <div class="acgn_entry" id="acgn_watched">
        <h2>已看</h2>
        <div>
          <tab v-for="item in animeList[3]" :key="item.id" :icon="item.icon" :title="item.title" :temp="item.temp" :total="item.total"/>
        </div>
      </div>
    </div>
    <div class="frame right" style="width:20%">
      <div @click="banned">二次元站</div>
      <div @click="banned">搜番引擎</div>
      <div @click="banned">GALGAME</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import tab from '../components/acgnTab.vue'
import axios from 'axios'
Vue.component('tab', tab)
export default {
  data () {
    return {
      animeList: [
        [], // watching
        [], // toWatch
        [], // mayWatch
        [] // watched
      ]

    }
  },
  beforeMount () {
    axios.get('/api/anime/list').then(res => {
      res.data.data.forEach((item) => {
        this.animeList[item.type - 1].push(item)
      })
      console.log(this.animeList)
    }).catch(err => err)
  },
  methods: {
    banned () {
      alert('该模块还未实现，灵感缺失ing...')
    }
  }
}
</script>

<style lang="scss">
#acgn{
  height: 100%;
  display: flex;
  overflow-y: auto;
  .frame{
    margin-top: 60px;
    // border: 1px solid rgb(115, 0, 255);
    display: flexbox;
    .acgn_entry{
      height: 200px;
      // border: 1px solid red;
      box-sizing: border-box;
      box-shadow: 0px 20px 10px rgba(247, 255, 157,.7) inset;
      div{
        overflow-x: auto;
        white-space: nowrap;
        &::-webkit-scrollbar{
          height: 4px;
        }
      }
      &:first-child{
        margin-top: 20px;
      }
      &:last-child{
        margin-bottom: 20px;
      }
    }
  }

  h1{
    margin-top: 260px;
    font-size: 60px;
    font-family: 'soft';
    font-weight: 200;
    text-align: center;
    color: gainsboro;
  }

  .right{
    div{
      margin: 50px;
      border: 1px solid gray;
      background-color: rgba(128, 128, 128, 0.09);
      text-align: center;
      font-size: 20px;
      cursor: pointer;
    }
  }
}
</style>

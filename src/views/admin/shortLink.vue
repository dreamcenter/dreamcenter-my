<template>
  <div id="shortLink">
    <h1>短链接</h1>
    <form  @submit.prevent="createNew">
      <input name="raw" type="url" v-model="raw" autocomplete="off" placeholder="https://example.com" pattern="http[s]{0,1}://.*" required/>
      <input type="submit" value="生成短链"/>
    </form>
    <table>
      <thead>
        <tr style="border-bottom:1px solid #585">
          <th style="width:20%">短链</th>
          <th style="width:70%">原地址</th>
          <th style="width:10%">操作</th>
        </tr>
      </thead>
      <tr v-for="item in slList" :key="item.link">
        <td style="text-align:left">&nbsp;&nbsp;<a style="color:black;text-decoration:none" :href="prefix + item.link" target="_blank">{{item.link}}</a>&nbsp;<span class="cv" :data-clipboard-text="prefix + item.link">💾</span></td>
        <td>{{item.rawUrl}}</td>
        <td><button @click="delByLink(item.link)">删除</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import axios from 'axios'
export default {
  data () {
    return {
      raw: '',
      slList: [],
      cvInput: '',
      prefix: ''
    }
  },
  beforeMount () {
    this.getList()
    if (location.href.startsWith('http://127.0.0.1')) {
      this.prefix = 'http://127.0.0.1:8080/s1/'
    } else {
      this.prefix = 'https://www.dreamcenter.top/s1/'
    }
  },
  mounted () {
    const clipboard = new Clipboard('.cv')
    clipboard.on('success', (e) => {
      e.trigger.style.color = '#5ab25a'
      e.trigger.innerText = '复制成功！'
      this.backSpl(e.trigger)
    })
    clipboard.on('error', (e) => {
      e.trigger.style.color = 'red'
      e.trigger.innerText = '复制失败！'
      this.backSpl(e.trigger)
    })
  },
  methods: {
    getList () {
      axios.get('/sl/all').then(res => {
        this.slList = res.data.data
      }).catch(err => err)
    },
    backSpl (node) {
      setTimeout(() => {
        node.innerText = '💾'
      }, 3000)
    },
    createNew () {
      axios.post('/sl/new?raw=' + encodeURIComponent(this.raw)).then(res => {
        if (res.data.data === 1) this.getList()
        else alert('生成失败!')
      }).catch(err => err)
    },
    delByLink (link) {
      const res = confirm('确认删除' + link + '?')
      if (!res) return
      axios.get('/sl/del?link=' + link).then(res => {
        console.log(res.data)
        this.getList()
      }).catch(err => err)
    }
  },
  destroyed () {
    this.clipboard.destroyed()
  }
}
</script>

<style lang="scss">
#shortLink{
  font-family: '粗体';
  form{
    margin: 2px;
    box-sizing: border-box;
    input{
      margin: 2px;
    }
  }
  table{
    width: 100%;
    // border: 1px solid red;
    text-align: center;
    border-collapse: collapse;
  }
}
</style>

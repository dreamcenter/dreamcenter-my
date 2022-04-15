<template>
  <div id="_dynamic">
    <h3>动态</h3>
    <button @click="this.toWriting">写一篇动态</button>
    <table>
      <tr>
        <td style="width:6%">id</td>
        <td style="width:20%">time</td>
        <td >content</td>
        <td style="width:10%">操作</td>
      </tr>
      <tr v-for="item in dynamicList" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{item.time}}</td>
        <td class="content">{{item.content}}</td>
        <td><a href="#" @click="delDynamic(item.id)">删除</a></td>
      </tr>
    </table>
    <p class="jump">
      <a href="#" v-if="sheet>1" @click="changePage(-1)">上一页</a>
      <input v-model="sheet" @blur="getPage" @keydown.enter="getPage"/>
      <a href="#" @click="changePage(1)">下一页</a>
    </p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      dynamicList: [],
      sheet: 1
    }
  },
  beforeMount () {
    axios.get('/api/dynamic/sheet?sheet=1').then(res => {
      this.dynamicList = res.data.data
      console.log(res.data)
    }).catch(err => err)
  },
  methods: {
    toWriting () {
      this.$router.push('/Admin/writing?type=dynamic')
    },
    changePage (delta) {
      delta = Number.parseInt(delta)
      this.sheet = Number.parseInt(this.sheet) + delta
      this.getPage()
    },
    getPage () {
      axios.get('/api/dynamic/sheet?sheet=' + this.sheet).then(res => {
        this.dynamicList = res.data.data
      }).catch(err => err)
    },
    delDynamic (id) {
      axios.post('/api/dynamic/delete', 'id=' + id).then(res => {
        if (res.data.code === 200) {
          this.getPage()
        }
      }).catch(err => err)
    }
  }
}
</script>

<style lang="scss">
#_dynamic{
  table{
    font-size: 20px;
    width: 100%;
    border-collapse: collapse;
    margin-top: 50px;
    tr{
      border: 1px solid black;
      &:first-child{
        background-color: rgba(209, 155, 155, 0.609);
      }
      a{
        color: blue;
      }
    }
  }
  .jump{
    // text-align: right;
    margin-top: 10px;
    input{
      width: 50px;
      margin: 0 10px;
      text-align: center;
      font-size: 16px;
    }
    a{
      color: blue;
    }
  }
}
</style>

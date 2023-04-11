<template>
  <div id="_blog">
    <h3>博客</h3>
    <br/>
    <button @click="this.toWriting">写一篇博客</button>
    <br/><br/>
    <hr/>

    <table>
      <thead style="font-weight:bold;border-bottom: 1px solid black;">
        <td>id</td>
        <td>title</td>
        <td>time</td>
        <td>visit</td>
        <td>keywords</td>
        <td colspan="2">操作</td>
      </thead>
      <tbody>
        <tr v-for="item in blogs" :key="item.id">
          <td>{{item.id}}</td>
          <td><a :href="'/Blog/' + item.id" target="_black">{{item.title}}</a></td>
          <td>{{item.time}}</td>
          <td>{{item.visit}}</td>
          <td>{{item.keywords}}</td>
          <td style="color:rgb(100,200,100);cursor:default" @click="editBlog(item)">编辑</td>
          <td style="color:gray;cursor:default">删除</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      blogs: []
    }
  },
  beforeMount () {
    this.getList()
  },
  methods: {
    getList () {
      axios.get('/api/blog/simpleList').then(res => {
        this.blogs = res.data.data
        this.blogs.reverse()
      }).catch(err => err)
    },
    toWriting () {
      this.$router.push('/Account/writing?type=blog').catch(err => err)
    },
    editBlog (item) {
      if (item.keywords == null) item.keywords = ''
      const res = prompt('修改keywords: blog编号 【' + item.id + '】', item.keywords)
      if (res != null) this.changeKeywords(res.trim(), item)
    },
    changeKeywords (val, item) {
      let url = '/api/blog/keywords?id=' + item.id
      if (val !== '') url += '&keywords=' + val
      axios.get(url).then(res => {
        if (res.data.data === 1) item.keywords = val
        else alert('修改失败!')
      }).catch(err => err)
    }
  }
}
</script>

<style lang="scss">
#_blog{
  table{
    width: 100%;
    text-align: center;
    font-family: '仿宋';
    border-collapse: collapse;
    a{
      color: rgb(211, 199, 224);
      text-decoration: none;
    }
    tbody{
      tr{
        &:hover{
          background-color: rgb(69, 66, 60);
        }
      }
    }
  }
  hr{
    background-color: rgb(70, 21, 160);
  }
}
</style>

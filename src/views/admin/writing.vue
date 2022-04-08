<template>
  <div id="_writing">
    <ul class="titleButtons">
      <li><button @click="this.back">返回</button></li>
      <li><button @click="this.clear">清空</button></li>
      <li><button @click="this.commit">提交</button></li>
    </ul><br/>
    <input v-model="title" v-if="this.isBlog" style="height:40px;font-size:36px" placeholder="标题"/>
    <div id="editor"></div>
  </div>
</template>

<script>
import axios from 'axios'
// https://www.wangeditor.com/
import E from 'wangeditor'
export default {
  data () {
    return {
      from: '',
      isBlog: true,
      editor: null,
      title: ''
    }
  },
  mounted () {
    this.from = location.search.substr(1).split('&')
      .find((item) => item.includes('type')).split('=')[1]
    this.isBlog = this.from === 'blog'
    this.editor = new E('#editor')
    this.editor.config.height = 500
    this.editor.create()
  },
  beforeDestroy () {
    this.editor.destroy()
    this.editor = null
  },
  methods: {
    back () {
      this.$router.push('/Admin/' + this.from)
    },
    commit () {
      const time = this.$time()
      const content = this.editor.txt.html()
      console.log(time)
      axios.post('/api/blog/add',
        `title=${this.title}&time=${time}&content=${content}`).then(res => {
        // console.log(res.data)
        if (res.data.code !== 200) alert(res.data.msg)
        else {
          if (res.data.data === 0) alert('创建失败!')
          else alert('创建成功!')
        }
      }).catch(err => err)
    },
    clear () {
      this.editor.txt.clear()
    }
  }
}
</script>

<style lang="scss" scoped>
#_writing{
  .titleButtons{
    width: 100%;
    list-style: none;
    display: flex;
    li{
      width: 15%;
      button{
        width: 100%;
        height: 30px;
      }
      margin: 2px 10px;
    }
  }
}
</style>

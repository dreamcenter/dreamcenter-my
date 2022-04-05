<template>
  <div id="_writing">
    <ul class="titleButtons">
      <li><button @click="this.back">返回</button></li>
      <li><button>清空</button></li>
      <li><button>提交</button></li>
    </ul><br/>
    <div id="editor"></div>
  </div>
</template>

<script>
// https://www.wangeditor.com/
import E from 'wangeditor'
export default {
  data () {
    return {
      from: ''
    }
  },
  mounted () {
    this.from = location.search.substr(1).split('&')
      .find((item) => item.includes('type')).split('=')[1]
    const editor = new E('#editor')
    editor.config.height = 500
    editor.create()
  },
  beforeDestroy () {
    // this.editor.destroy()
    // this.editor = null
  },
  methods: {
    back () {
      this.$router.push('/Admin/' + this.from)
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

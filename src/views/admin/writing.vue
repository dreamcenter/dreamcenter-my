<template>
  <div id="_writing">
    <ul class="titleButtons">
      <li><button @click="this.back">返回</button></li>
      <li><button @click="this.clear">清空</button></li>
      <li><button @click="this.commit">提交</button></li>
      <li><button @click="this._export">导出</button></li>
      <li><button @click="this._import">导入</button></li>
      <li><input type="file" ref="bak" style="width:150px"/></li>
      <li v-if="isBlog"><button @click="this.addCode">插入代码</button></li>
      <li v-if="isBlog"><textarea placeholder="code" v-model="code"></textarea></li>
    </ul><br/>
    <input v-model="title" v-if="this.isBlog" style="height:30px;font-size:30px" placeholder="标题"/>
    <div id="editor"></div>
    <ul class="tags" v-if="isBlog">
      <li v-for="item in tags" :key="item" @click.left="delTag(item)">{{item}}</li>
      <input placeholder="回车添加tag" @keyup.enter="newTag" v-model="tag"/>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
// https://www.wangeditor.com/
import E from 'wangeditor'
import hljs from 'highlight.js'
import '../../css/a11y-light.min.css'

export default {
  data () {
    return {
      from: '',
      isBlog: true,
      isDynamicEdit: false,
      editor: null,
      title: '',
      tags: [],
      tag: '',
      code: ''
    }
  },
  mounted () {
    this.from = location.search.substr(1).split('&')
      .find((item) => item.includes('type')).split('=')[1]
    this.isBlog = this.from === 'blog'

    // // https://bbs-api-static.mihoyo.com/misc/api/emoticon_set
    this.editor = new E('#editor')
    // this.editor.highlight = hljs

    // exclude
    this.editor.config.excludeMenus = ['code']

    // markdown file upload module
    const _that = this
    this.editor.config.customUploadImg = function (resultFiles, insertImgFn) {
      const formData = new FormData()
      formData.append('aid', _that.isBlog ? 2 : 3)
      formData.append('file', resultFiles[0])
      axios.post('/api/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        console.log(res.data)
        if (res.data.errno === 0) {
          insertImgFn(res.data.data[0].url)
        } else {
          alert('图片插入失败!data:' + JSON.stringify(res.data))
        }
      }).catch(err => err)
    }
    this.editor.config.height = 500
    this.editor.create()

    if (this.$store.state.dynamicId !== -1) {
      this.isDynamicEdit = true
      this.editor.txt.html(this.$store.state.dynamicContent)
    }
  },
  beforeDestroy () {
    this.$store.state.dynamicId = -1
    this.$store.state.dynamicContent = ''
    this.isDynamicEdit = false
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
      const cont = this.$xss(encodeURIComponent(content))
      axios.post('/api/' + (this.isBlog ? 'blog' : 'dynamic') + (this.isDynamicEdit ? '/update' : '/add'),
        `id=${this.$store.state.dynamicId}&title=${this.title}&time=${time}&content=${cont}&tags=${this.tags}`).then(res => {
        if (res.data.code !== 200) alert(res.data.msg)
        else {
          if (res.data.data === 0) alert('创建失败!')
          else alert('创建成功!')
        }
      }).catch(err => err)
    },
    clear () {
      this.editor.txt.clear()
    },
    newTag () {
      const _tag = this.tag.trim()
      this.tag = ''
      console.log(this.tags.includes(_tag))
      if (_tag === '') return
      if (this.tags.includes(_tag)) return
      this.tags.push(_tag)
    },
    delTag (tag) {
      this.$delete(this.tags, this.tags.indexOf(tag))
    },
    _export () {
      const myBlob = new Blob([this.editor.txt.html()])

      const toDownload = document.createElement('a')

      toDownload.download = 'log' + this.$time() + '.txt'
      toDownload.href = URL.createObjectURL(myBlob)
      toDownload.click()
      // document.body.removeChild(myBlob)

      // alert('请按F12查看')
      // console.log(this.editor.txt.html())
    },
    _import () {
      const _that = this
      const bak = this.$refs.bak.files[0]
      const bakReader = new FileReader()
      bakReader.readAsText(bak)
      bakReader.onload = function () {
        _that.editor.txt.html(this.result)
      }
    },
    addCode () {
      const res = hljs.highlightAuto(this.code).value
      const codeStr = "<pre><code class='highlight'>" +
        res + '</code></pre><p data-we-empty-p><br></p>'
      this.editor.txt.append(codeStr)
      this.code = ''
    }
  }
}
</script>

<style lang="scss" scoped>
#_writing{
  font-family: '宋体';
  .titleButtons{
    width: 100%;
    list-style: none;
    display: flex;
    li{
      width: 10%;
      button{
        width: 100%;
        height: 30px;
      }
      margin: 2px 10px;
    }
  }
  .tags{
    list-style: none;
    li{
      background-color: aquamarine;
      padding: 2px;
      margin: 2px;
      border-radius: 8px;
      cursor: default;
      font-weight: bold;
      float: left;
    }
    input{
      margin: 2px;
      padding: 2px;
      text-align: center;
      width: 100px;
      height: 16px;
      font-size: 16px;
      border-radius: 8px;
      border: 1px solid coral;
      outline: none;
      color: red;
      font-weight: bold;
    }
  }
}
</style>

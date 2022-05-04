<template>
  <div id="_repository">
    <h3>仓库</h3>
    <button @click="commit">提交</button>
    <button @click="clear">刷新</button>
    <button @click="_export">导出</button>
    <button @click="_import">导入</button>
    <input type="file" ref="bak" style="width:150px;display:inline"/><br/>
    <input placeholder="标题" v-model="repository.title"/>
    <select  v-model="repository.type">
      <option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"/>
    </select>
    <input placeholder="图标链接" v-model="repository.icon"/>
    <div id="repoEditor">
      <h3>技术</h3>
      <p>...</p>
      <h3>功能</h3>
      <p>...</p>
      <h3>操作方式</h3>
      <p>...</p>
      <h3>下载链接</h3>
      <p>...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import E from 'wangeditor'
import qs from 'qs'
export default {
  data () {
    return {
      editor: null,
      typeList: [],
      repository: {
        icon: 'https://s-bj-2133-dreamcenter.oss.dogecdn.com/img/1/1651579569997.png/icon',
        title: '',
        time: '',
        type: 1,
        content: ''
      }
    }
  },
  mounted () {
    axios.get('/api/repository_type/list').then(res => {
      this.typeList.push(...res.data.data)
    }).catch(err => err)

    this.editor = new E('#repoEditor')

    this.editor.config.excludeMenus = ['code']

    this.editor.config.height = 500
    this.editor.create()
  },
  methods: {
    commit () {
      if (this.repository.title.trim() === '') {
        alert('标题不能为空')
        return
      }
      this.repository.content = this.editor.txt.html()
      this.repository.time = this.$time()
      axios.post('/api/repository_proj/add', qs.stringify(this.repository)).then(res => {
        if (res.data.code === 200 && res.data.data === 1) {
          alert('添加成功！')
        } else {
          alert('添加失败!!!')
        }
      }).catch(err => err)
    },
    clear () {
      location.reload()
    },
    _export () {
      const myBlob = new Blob([this.editor.txt.html()])

      const toDownload = document.createElement('a')

      toDownload.download = 'log' + this.$time() + '.txt'
      toDownload.href = URL.createObjectURL(myBlob)
      toDownload.click()
      // document.body.removeChild(toDownload)

      // alert('请按F12查看')
      console.log(this.editor.txt.html())
    },
    _import () {
      const _that = this
      const bak = this.$refs.bak.files[0]
      const bakReader = new FileReader()
      bakReader.readAsText(bak)
      bakReader.onload = function () {
        _that.editor.txt.html(this.result)
      }
    }
  }
}
</script>

<style lang="scss">
#_repository{
  #repoEditor{
    font-family: '微软雅黑';
  }
}
</style>

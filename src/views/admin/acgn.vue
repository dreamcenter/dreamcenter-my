<template>
  <div id="_acgn">
    <h3>番剧</h3>
    <button @click="addAnime">添加番剧</button>
    <div class="content">
      <h4>正在看</h4>
      <tab class="mytab" v-for="item in animeList[0]" :key="item.id" :icon="item.icon" :title="item.title" :temp="item.temp" :total="item.total" @click.native="editAnime(item)"/>
      <h4>待看</h4>
      <tab class="mytab" v-for="item in animeList[1]" :key="item.id" :icon="item.icon" :title="item.title" :temp="item.temp" :total="item.total" @click.native="editAnime(item)"/>
      <h4>未看</h4>
      <tab class="mytab" v-for="item in animeList[2]" :key="item.id" :icon="item.icon" :title="item.title" :temp="item.temp" :total="item.total" @click.native="editAnime(item)"/>
      <h4>已看</h4>
      <tab class="mytab" v-for="item in animeList[3]" :key="item.id" :icon="item.icon" :title="item.title" :temp="item.temp" :total="item.total" @click.native="editAnime(item)"/>
    </div>
    <div class="editTab" v-if="isEdit!=0">
      <div class="editMain">
        <h2>{{toEdit.id}}</h2>
        <table>
          <tr><td>标题</td><td><input v-model="toEdit.title"/></td></tr>
          <tr><td>封面</td><td><input v-model="toEdit.icon"/></td></tr>
          <tr><td>已看</td><td><input type="number" v-model="toEdit.temp" :max="toEdit.total" required/></td></tr>
          <tr><td>总共</td><td><input type="number" v-model="toEdit.total" required/></td></tr>
          <tr>
            <td>状态</td><td>
              <select v-model="toEdit.type" @change="typeChange">
                <option label="正在看" value="1"/>
                <option label="待看" value="2"/>
                <option label="未看" value="3"/>
                <option label="已看" value="4"/>
              </select>
            </td>
          </tr>
        </table>
        <button @click="commit">确认</button>
        <button @click="cancel">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import tab from '../../components/acgnTab.vue'
import qs from 'qs'
export default {
  components: {
    tab
  },
  data () {
    return {
      // id, icon, title, temp, total, type
      animeList: [[], [], [], []],
      isEdit: 0, // 1:edit 2:add
      toEdit: {}
    }
  },
  beforeMount () {
    axios.get('/api/anime/list').then(res => {
      res.data.data.forEach((item) => {
        this.animeList[item.type - 1].push(item)
      })
    }).catch(err => err)
  },
  methods: {
    reloadList () {
      this.animeList = [[], [], [], []]
      axios.get('/api/anime/list').then(res => {
        res.data.data.forEach((item) => {
          this.animeList[item.type - 1].push(item)
        })
      }).catch(err => err)
    },
    addAnime () {
      this.isEdit = 2
      this.toEdit.type = 3
      this.toEdit.temp = 0
      this.toEdit.total = 12
    },
    editAnime (item) {
      this.toEdit = JSON.parse(JSON.stringify(item))
      this.isEdit = 1
    },
    cancel () {
      this.toEdit = {}
      this.isEdit = 0
    },
    typeChange () {
      if (this.toEdit.type === '3') {
        this.toEdit.temp = 0
      }
      if (this.toEdit.type === '4') {
        this.toEdit.temp = this.toEdit.total
      }
    },
    commit () {
      axios.post('/api/anime/' + (this.isEdit === 1 ? 'update' : 'add'), qs.stringify(this.toEdit)).then(res => {
        console.log(res.data)
        if (res.data.code === 200 && res.data.data === 1) {
          this.cancel()
          this.reloadList()
          console.log('成功')
        } else {
          alert('失败')
        }
      }).catch(err => err)
    }
  }
}
</script>

<style lang="scss">
#_acgn{
  .content{
    font-family: '宋体';
    padding: 10px;
    h4{
      background-color: rgba(127, 255, 212, 0.154);
    }
    .mytab{
      overflow-x: auto;
      white-space: nowrap;
      &::-webkit-scrollbar{
        height: 4px;
      }
    }
  }
  .editTab{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(78, 75, 72, 0.041);
    overflow: hidden;
    .editMain{
      width: 300px;
      height: 200px;
      background-color: white;
      margin: 200px auto;
      overflow: hidden;
      font-family: '仿宋';
      padding: 10px;
      button{
        margin-top: 10px;
        margin-left: 10px;
      }
    }
  }
}
</style>

<template>
  <div id="_friend">
    <h3>友链</h3>
    <button @click="() => this.showEditPanel=true">添加新的</button>
    <table>
      <thead style="font-weight:bold;border-bottom: 1px solid black;">
        <td>id</td>
        <td>nickname</td>
        <td>avatar</td>
        <td>host</td>
        <td>describe</td>
        <td colspan="2">操作</td>
      </thead>
      <tbody>
        <tr v-for="item in firends" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.nickname}}</td>
          <td><a :href="item.avatar" target="_black">点击查看</a></td>
          <td><a :href="item.url" target="_black">{{item.url}}</a></td>
          <td>{{item.describe}}</td>
          <td style="color:green;cursor:default" @click="editFri(item)">编辑</td>
          <td style="color:red;cursor:default" @click="deleteFri(item.id)">删除</td>
        </tr>
      </tbody>
    </table>
    <div id="editFriendPanel" v-show="showEditPanel">
      <div class="innerPanel">
        <form @submit.prevent="commitFri">
          <h1>No.{{rawInfo.id}}</h1>
          <table>
            <tr><td>nickname</td><td><input v-model="rawInfo.nickname"/></td></tr>
            <tr><td>_avatar_</td><td><input v-model="rawInfo.avatar"/></td></tr>
            <tr><td>__host__</td><td><input v-model="rawInfo.url"/></td></tr>
          </table>
          <p>describe</p>
          <textarea rows="2" v-model="rawInfo.describe"></textarea>
          <input type="submit"/>
          <button style="margin-left:10px" @click.prevent="cancel">取消</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      firends: [],
      showEditPanel: false,
      rawInfo: {
        id: 0,
        nickname: '',
        avatar: '',
        host: '',
        describe: '',
        type: 1
      },
      copy: {
        id: 0,
        nickname: '',
        avatar: '',
        host: '',
        describe: '',
        type: 1
      }
    }
  },
  beforeMount () {
    this.getList()
  },
  methods: {
    getList () {
      axios.get('/api/friend/list').then(res => {
        this.firends = res.data.data
      }).catch(err => err)
    },
    deleteFri (id) {
      axios.post('/api/friend/delete', `id=${id}`).then(res => {
        if (res.data.code === 200 && res.data.data === 1) {
          this.getList()
        } else {
          alert('del fail')
        }
      }).catch(err => err)
    },
    editFri (item) {
      this.rawInfo = JSON.parse(JSON.stringify(item))
      this.showEditPanel = true
    },
    cancel () {
      this.showEditPanel = false
      this.rawInfo = this.copy
    },
    commitFri () {
      let process
      if (this.rawInfo.id === 0) {
        process = 'add'
      } else {
        process = 'update'
      }
      axios.post('/api/friend/' + process, JSON.stringify(this.rawInfo),
        {
          headers: {
            'content-type': 'application/json'
          }
        }).then(res => {
        if (res.data.code === 200 && res.data.data === 1) {
          console.log('success')
          this.cancel()
          this.getList()
        } else {
          alert('failed')
        }
      }).catch(err => err)
    }
  }
}
</script>

<style lang="scss" scoped>
#_friend{
  table{
    width: 100%;
    text-align: center;
    font-family: '仿宋';
    border-collapse: collapse;
    a{
      color: blueviolet;
    }
  }
  #editFriendPanel{
    width: 100%;
    height: 100%;
    background-color: rgba(106, 107, 106, 0.185);
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    .innerPanel{
      width:300px;
      height:200px;
      background-color: white;
      box-shadow: 0 0 20px rgba(255, 255, 255, 1);
      border-radius: 10px;
      margin: 200px auto;
      padding: 10px;
      box-sizing: border-box;
      textarea{
        width: 100%;
      }
    }
  }
}
</style>

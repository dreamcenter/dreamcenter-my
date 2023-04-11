<template>
  <div id="_updateRep">
    <h1>编辑仓库</h1>
    <table>
      <thead style="font-weight:bold;border-bottom: 1px solid black;">
        <td>id</td>
        <td>title</td>
        <td>type</td>
        <td>icon</td>
        <td colspan="1">操作</td>
      </thead>
      <tbody>
        <tr v-for="item in titleList" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.title}}</td>
          <td>{{item.type | getType(that)}}</td>
          <td><img width="20" height="20" :src="item.icon"/></td>
          <!-- <td style="color:green;cursor:default">编辑</td> -->
          <td style="color:red;cursor:default">删除</td>
          <!-- <td style="color:green;cursor:default" @click="editFri(item)">编辑</td> -->
          <!-- <td style="color:red;cursor:default" @click="deleteFri(item.id)">删除</td> -->
        </tr>
        <tr class="form_update">
          <td><input v-model="rep.id"/></td>
          <td><input v-model="rep.title"/></td>
          <td><input v-model="rep.type"/></td>
          <td><input v-model="rep.icon"/></td>
          <td><button @click="changeRep()">修改</button></td>
        </tr>
      </tbody>
    </table>
    <p>{{getTypeStr}}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      types: [],
      titleList: [],
      that: this,
      rep: {
        id: null,
        title: null,
        type: null,
        icon: null
      }
    }
  },
  filters: {
    getType (id, that) {
      for (let i = 0; i < that.types.length; i++) {
        if (that.types[i].id === id) return that.types[i].name
      }
      return id
    }
  },
  computed: {
    getTypeStr () {
      let str = ''
      for (let i = 0; i < this.types.length; i++) {
        str += '♦' + this.types[i].id + ' : ' + this.types[i].name + ' '
      }
      return str
    }
  },
  beforeMount () {
    axios.get('/api/repository_type/list').then(res => {
      this.types.push(...res.data.data)
    }).catch(err => err)
    this.getList()
  },
  methods: {
    getList () {
      axios.get('/api/repository_proj/list?type=0').then(res => {
        this.titleList = res.data.data
      }).catch(err => err)
    },
    changeRep () {
      const rep = this.rep
      if (rep.id === null) alert('id can not be null!')
      else {
        axios.post('/api/repository_proj/update', JSON.stringify(rep), {
          headers: {
            'content-type': 'application/json;charset=utf8'
          }
        }).then(res => {
          if (res.data.code !== 200) {
            console.log(res.data)
            alert('修改异常，请查看console')
          } else {
            this.getList()
            rep.id = null
            rep.title = null
            rep.type = null
            rep.icon = null
          }
        }).catch(err => err)
      }
    }
  }
}
</script>

<style lang="scss">
#_updateRep{
  table{
    width: 100%;
    text-align: center;
    font-family: '仿宋';
    border-collapse: collapse;
    a{
      color: blueviolet;
    }
  }
  .form_update{
    line-height: 100px;
    input{
      background-color: rgba($color: #efff5e, $alpha: .1);
      border: 0;
      outline: none;
      text-align: center;
      border-top:1px #efff5e solid;
      border-bottom:1px #efff5e solid;
    }
    button{
      background-color: rgba($color: #efff5e, $alpha: .1);
      border:1px #efff5e solid;
    }
  }
}
</style>

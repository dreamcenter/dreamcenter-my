<template>
  <div id="log">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>类型</th>
          <th>访问ip</th>
          <th>内容</th>
          <th>时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in logs" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.type}}</td>
          <td>{{item.addr}}</td>
          <td>{{item.raw}}</td>
          <td>{{item.time}}</td>
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
      logs: []
    }
  },
  beforeMount () {
    axios.get('/api/log/login').then(res => {
      if (res.data.code === 200) {
        this.logs = res.data.data
      }
    }).catch(err => err)
  }
}
</script>

<style lang="scss">
#log{
  table{
    border-collapse: collapse;
    width: 100%;
    text-align: center;
    thead{
      background-color: aquamarine;
    }
    tbody{
      tr{
        background-color: aqua;
      }
    }
  }
}
</style>

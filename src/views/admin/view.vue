<template>
  <div id="_view">
    <h1>概览</h1>
    <div class="status">图床状态<span class="status_color" :style="{'background-color':dogeStatus}"></span></div>
    <p>Blog Visit: {{vBlog}}</p>
    <p>Album Visit: {{vAlbum}}</p>
    <p>Dynamic Visit: {{vDynamic}}</p>
    <p id="drawVisit" v-show="initSync === 3">
      <span :style="{'width': getPcBlogVisit + 'px'}">{{vBlog}}</span>
      <span :style="{'width': getPcAlbumVisit + 'px'}">{{vAlbum}}</span>
      <span :style="{'width': getPcDynamicVisit + 'px'}">{{vDynamic}}</span>
    </p>
    <h2>
      <span>服务监测 </span>
      <!-- <button @click="updateServers()">U</button> -->
      <el-button @click="updateServers()" type="primary" icon="el-icon-refresh" circle="" size="mini"></el-button>
    </h2>
    <ol id="server">
      <li v-for="item in servers" :key="item.ip">
        <h3>{{item.ip}} <span :class="item.up?'up':'down'"></span>
        <!-- <button @click="delServer(item.ip)">D</button> <button @click="toEdit(item.ip)">A</button> -->&nbsp;
        <el-button-group>
          <el-button @click="toEdit(item.ip)" type="primary" icon="el-icon-plus" size="mini"></el-button>
          <el-button @click="delServer(item.ip)" type="danger" icon="el-icon-delete" size="mini"></el-button>
        </el-button-group>
        </h3>
        <div>
          <table>
            <!-- <tr> <td>port</td><td>name</td><td>status</td><td>del</td><td>chg</td> </tr> -->
            <tr v-for="port in item.ports" :key="port.port">
              <td>#{{port.port}}</td>
              <td>{{port.name === '' ? 'DEFAULT' : port.name}}</td>
              <td>{{port.alert ? '√' : 'x'}}</td>
              <td><span :class="port.up?'up':'down'"></span></td>
              <!-- <td><button @click="delPort (item.ip, port.port)">D</button></td>
              <td><button @click="toEdit(item.ip, port)">C</button></td> -->
              <td>
                <el-button-group>
                  <el-button @click="toEdit(item.ip, port)" type="primary" icon="el-icon-edit" size="mini"></el-button>
                  <el-button @click="delPort (item.ip, port.port)" type="danger" icon="el-icon-delete" size="mini"></el-button>
                </el-button-group>
              </td>
            </tr>
          </table>
          <p v-if="item.ports.length===0" style="text-align:center;font-size:14px;padding:10px;color:gray">- 暂无监听的端口 -</p>
        </div>
      </li>
      <li>
        <h3>添加新的服务器</h3>
        <div>
          <p style="padding:4px"><b>IP:</b><input v-model="tmp.ip"></p>
          <button @click="newServer()">提交</button>
        </div>
      </li>
    </ol>
    <div id="edit-port" v-if="editPort.start">
      <div class="inner">
        <h3>编辑:{{editPort.ip}}</h3>
        <input placeholder="端口" v-model="editPort.port"/>
        <input placeholder="名称" v-model="editPort.name"/>
        <p>
          <span>警告:</span>
          <input id="a-1" type="radio" name="alert" value="true" v-model="editPort.alert"/>
          <label for="a-1">开</label>
          <input id="a-0" type="radio" name="alert" value="false" v-model="editPort.alert"/>
          <label for="a-0">关</label>
        </p>
        <button @click="editPortFunc()">确认</button>
        <button @click="cancelEdit()">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      dogeStatus: 'red',
      vBlog: 0,
      vAlbum: 0,
      vDynamic: 0,
      initSync: 3,
      servers: [],
      tmp: {
        ip: ''
      },
      editPort: {
        start: false,
        ip: '',
        port: '',
        name: '',
        alert: false
      }
    }
  },
  computed: {
    getPcBlogVisit () {
      return 150 * this.vBlog / (this.vBlog + this.vAlbum + this.vDynamic)
    },
    getPcAlbumVisit () {
      return 150 * this.vAlbum / (this.vBlog + this.vAlbum + this.vDynamic)
    },
    getPcDynamicVisit () {
      return 150 * this.vDynamic / (this.vBlog + this.vAlbum + this.vDynamic)
    }
  },
  beforeMount () {
    axios.get('/api/info/all').then(res => {
      const result = res.data.data
      this.vBlog = Number.parseInt(result.vBlog / 2)
      this.vAlbum = result.vAlbum
      this.vDynamic = result.vDynamic
      if (result.doge === 1) {
        this.dogeStatus = '#0f0'
      } else if (result.doge !== null) {
        this.dogeStatus = 'orange'
      } else {
        this.dogeStatus = 'red'
      }
    }).catch(err => err)
    this.serverStatus()
  },
  mounted () {
  },
  beforeUpdate () {
  },
  methods: {
    newServer () {
      const v = this.tmp.ip.match(/^\d+\.\d+.\d+.\d+$/g)
      if (v == null) {
        alert('非法的ip地址')
      } else {
        axios.get('/api/dsap/sadd?ip=' + this.tmp.ip).then(res => {
          console.log(res.data)
          if (res.data.code === 200) {
            this.tmp.ip = ''
            if (res.data.data === 1) {
              this.serverStatus()
            } else {
              alert('添加失败')
            }
          }
        })
      }
    },
    serverStatus () {
      axios.get('/api/dsap/all').then(res => {
        this.servers = res.data.data
      })
    },
    clearEdit () {
      this.editPort.ip = ''
      this.editPort.port = ''
      this.editPort.name = ''
      this.editPort.alert = false
    },
    editPortFunc () {
      this.editPort.alert = this.editPort.alert === 'true'
      axios.post('/api/dsap/add?ip=' + this.editPort.ip, JSON.stringify(this.editPort), {
        headers: {
          'content-type': 'application/json'
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.editPort.start = false
          this.serverStatus()
        } else {
          alert('更新失败')
        }
        this.clearEdit()
      })
    },
    cancelEdit () {
      this.editPort.start = false
      this.clearEdit()
    },
    toEdit (ip, port) {
      this.editPort.ip = ip
      if (port !== undefined) {
        this.editPort.port = port.port
        this.editPort.name = port.name
        this.editPort.alert = port.alert
      }
      this.editPort.start = true
    },
    delPort (ip, port) {
      axios.get(`/api/dsap/del?ip=${ip}&port=${port}`).then(res => {
        if (res.data.code === 200) {
          this.serverStatus()
        } else {
          alert('删除失败')
        }
      })
    },
    delServer (ip) {
      axios.get(`/api/dsap/sdel?ip=${ip}`).then(res => {
        if (res.data.code === 200) {
          this.serverStatus()
        } else {
          alert('删除失败')
        }
      })
    },
    updateServers () {
      axios.get('/api/dsap/update').then(() => {
        this.serverStatus()
      })
    }
  }
}
</script>

<style lang="scss">
#_view{
  color: antiquewhite;
  .status{
    line-height: 20px;
    margin-top: 10px;
    .status_color{
      margin-left: 10px;
      width:12px;
      height: 12px;
      display: inline-block;
      border-radius: 6px;
      border: 2px solid coral;
    }
  }
  #drawVisit{
    width: 150px;
    border: 1px solid black;
    span{
      display: block;
      float: left;
      height: 16px;
      color: white;
      font-family: 'Times New Roman', Times, serif;
      text-align: center;
      line-height: 16px;
      &:nth-child(1){
        background-color: rgb(238, 142, 142);
      }
      &:nth-child(2){
        background-color: rgb(143, 166, 241);
      }
      &:nth-child(3){
        background-color: rgb(157, 233, 134);
      }
    }
    &::after{
      clear: both;
      content: '';
      display: block;
    }
  }
  #server{
    // width: 80%;
    // border: 1px solid red;
    color: coral;
    overflow: hidden;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    li{
      width: 268px;
      min-height: 100px;
      // border: 1px solid red;
      // float: left;
      margin: 10px;
      padding: 6px;
      box-sizing: border-box;
      background-color: white;
      box-shadow: 0 0 10px rgba(255,255,255,.5);
      border-radius: 10px;
      h3{
        border-bottom: 2px solid coral;
      }
      table{
        text-align: center;
        width: 100%;
      }
      .up{
        width: 16px;
        height: 16px;
        border-radius: 8px;
        background: greenyellow;
        display: inline-block;
      }
      .down{
        width: 16px;
        height: 16px;
        border-radius: 8px;
        background: rgb(255, 84, 84);
        display: inline-block;
      }
    }
  }
  #edit-port{
    width: calc(85% - 20px);
    height: 100%;
    position: absolute;
    top: 0;
    .inner{
      padding: 10px;
      box-sizing: border-box;
      width: 220px;
      height: 140px;
      position: absolute;
      background-color: rgb(184, 182, 182);
      box-shadow: 0 0 20px rgba($color: #cc6060, $alpha: 1.0);
      top: 200px;
      left: calc(50% - 110px);
    }
  }
}
</style>

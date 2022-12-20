<template>
  <div id="repository">
    <!-- <h1>晚些时候做</h1> -->
    <div id="repo_main">
      <div class="title">
        <ul>
          <li v-for="item in titleList" :key="item.id" :style="{'background-color':activeType == item.id ? 'coral' : ''}" @click="toType (item.id)">{{item.name}}</li>
          <!-- <li>全部</li>
          <li>JAVA</li>
          <li>C++</li>
          <li>Vue</li>
          <li>Springboot</li> -->
        </ul>
      </div>
      <!-- <hr/> -->
      <div class="content">
        <div v-for="item in projectList" :key="item.id" @click="jump(item.id)" v-show="item.type == activeType || activeType==0">
          <img :src="item.icon" width="60" height="60"/>
          <p>{{item.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      titleList: [
        {
          id: 0,
          name: '全部',
          order: 0
        }
      ],
      projectList: [],
      activeType: 0
    }
  },
  beforeMount () {
    axios.get('/api/repository_type/list').then(res => {
      this.titleList.push(...res.data.data)
      // console.log(this.titleList)
    }).catch(err => err)
    axios.get('/api/repository_proj/list?type=0').then(res => {
      this.projectList = res.data.data
    }).catch(err => err)
  },
  methods: {
    toType (id) {
      this.activeType = id
      // axios.get('/api/repository_proj/list?type=' + this.activeType).then(res => {
      //   this.projectList = res.data.data
      // }).catch(err => err)
    },
    jump (id) {
      this.$router.push('/Repository/' + id)
    }
  }
}
</script>

<style lang="scss">
#repository{
  padding: 10px;
  h1{
    margin-top: 260px;
    font-size: 60px;
    font-family: 'soft';
    font-weight: 200;
    text-align: center;
    color: gainsboro;
  }
  #repo_main{
    margin-top: 70px;
    .title{
      // border: 1px solid red;
      li{
        margin-right: 6px;
        margin-bottom: 4px;
        padding: 4px 10px;
        display: inline-block;
        // border: 1px solid blue;
        transform:skewX(-10deg);
        box-shadow: 0 0 4px rgba($color: #000000, $alpha: 1.0);
        cursor: pointer;
        transition: .2s 0s linear;
        &:hover{
          background-color: antiquewhite;
        }
      }
    }
    .content{
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      // box-shadow: 0 0 4px rgba($color: #000000, $alpha: 1.0);
      padding: 10px;
      div{
        width: 100px;
        height: 100px;
        // border: 1px solid green;
        text-align: center;
        padding: 4px;
        box-sizing: border-box;
        &:hover p{
          transform: scale(1.2);
          text-decoration: underline rgb(0, 255, 13);
        }
        &:hover img{
          box-shadow: 0 -10px 6px rgba($color: rgb(232, 165, 165), $alpha: 1.0);
        }
        img{
          padding: 4px;
          border-radius: 16px;
          box-shadow: 0 0 6px rgba($color: #000, $alpha: 1.0);
          transition: .2s ease-in-out;
        }
        p{
          overflow:hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
          // border: 1px solid red;
          transition: .2s ease-in-out;
        }
      }
    }
  }
}
</style>

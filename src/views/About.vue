<template>
  <div id="about">
    <img src="/imgs/A006.jpg" width="100%"/>
    <!-- <img src="https://s-bj-2133-dreamcenter.oss.dogecdn.com/fast/A006.jpg" width="100%"/> -->
    <span>
      <h1>关于</h1><br/>
      <p>这是一个基于大数据的<b style="color:pink">学科竞赛博客</b>网站。</p><br/>
      <p>网站主要为学生提供了可以<i style="color:coral"> 分享技术、交流技术 </i>的平台。于此同时，学生也可以通过OJ系统做题。</p><br/>
      <p>通过分析学生的各种做题习惯、关注点按照一定的算法进行分析与处理，向学生推荐一些文章，以方便进行深入的研究。</p><br/>
      <p>网站设计与维护 : 时光潜流 (QQ:1981669259)</p><br/>
      <p class="running_time" style="border-top:1px solid white;">2022.03 ~ {{nowTime}}</p>
      <p class="running_time">
        <a href="https://beian.miit.gov.cn/" title="前往查看" class="beian" target="_blank" style="color:rgba(255, 255, 255, 0.822)">皖ICP备2022005998号</a>
      </p>
      <p></p><br/>
      <p></p><br/>
      <p></p><br/>
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nowTime: ''
    }
  },
  beforeMount () {
    this.nowTime = this.$time().substr(0, 7).replace('-', '.')
  }
}
</script>

<style lang="scss">
#about{
  height: 100%;
  background-color: rgb(51, 45, 45);
  overflow-y: scroll;
  img{
    margin-top: 60px;
    filter: brightness(50%);
  }
  span{
    display: block;
    color: rgba(255, 255, 255, 0.822);
    margin:0px 20% 0px 20%;
    h1{
      font-size: 40px;
      text-align: center;
      font-weight: 500;
    }
    p{
      font-size: 20px;
      text-indent: 2rem;
      a{
        color: rgb(181, 166, 166);
      }
    }
    .running_time{
      text-align: center;
      font-size:12px;
      text-indent: 0;
    }
  }
  .beian{
    text-decoration: none;
    transition: .2s 0s ease-in;
    &:hover{
      text-decoration: underline;
      // border-bottom: 1px white dashed;
      font-size: 16px;
    }
  }
}
@media screen and (max-width: 800px){
  #about{
    img{
      height: 300px;
      object-fit: cover;
      object-position: 90% 0%;
    }
    span{
      margin: 0 10%;
      h1{
        font-size: 30px;
      }
      p{
        font-size: 18px;
      }
    }
  }
}
</style>

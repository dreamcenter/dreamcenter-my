<template>
  <div id="about">
    <img src="/imgs/A006.jpg" width="100%"/>
    <span>
      <h1>关于</h1><br/>
      <p>Ciallo，大家好，こんばんは、首先<i style="color:pink"> 感谢 </i>大家的访问，对您的到来我感到了万分的荣幸！</p><br/>
      <p>先作一下简单的<i style="color:rgb(193, 127, 255)"> 自我介绍 </i>吧！很显然，时光潜流是我的艺名或者笔名，是从高中时期就开始延用的名字。个人是计算机学院的学生，自初中就开始对编程感兴趣，开始艰难的java自学之路。来到大学后决定走web方向。</p><br/>
      <p>个人的<i style="color:aquamarine"> 兴趣爱好 </i>比较广泛，象棋围棋、编程、phtoshop修图、toonboom动画分镜、sai绘画、阅读、二次元、游戏等等。主要的个人定位是<b>技术宅。</b></p><br/>
      <p>联系方式？额，本尊当然也是会留下来的啦，hiahiahiahia！继续往下看就有啦(尤拉？)！</p><br/>
      <p>QQ : 1981669259 &nbsp;&nbsp;&nbsp;&nbsp; WX : I_love_you_dyh</p><br/>
      <p>b站id: 39403246 &nbsp;&nbsp;&nbsp;&nbsp; github : dreamcenter</p><br/>
      <p>原神UID : 101763822 &nbsp;&nbsp;&nbsp;&nbsp; 碧蓝ID : 265642565</p><br/>
      <p>个人不大喜欢接电话，所以这里就不留我的电话啦！邮箱就是qq邮箱~</p><br/>
      <p></p><br/>
      <p></p><br/>
      <p>水字数，水字数ヽ(￣ω￣(￣ω￣〃)ゝ</p><br/>
      <p style="text-align:center;font-size:12px">2022.03 ~ {{nowTime}}</p>
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
    }
  }
  // &::-webkit-scrollbar{
  //   width: 4px;
  //   background-color: rgb(61, 94, 94);
  // }
  // &::-webkit-scrollbar-thumb{
  //   background-color: rgb(155, 214, 99);
  // }
}
</style>

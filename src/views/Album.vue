<template>
  <div id="album">
    <!-- <h1>秒速之子，回忆杀</h1> -->
    <!-- <ul> -->
      <img v-show="this.isIn" height="400" src="/imgs/bk.jpeg" style="position:absolute;top:200px;left:100px"/>
      <transition-group tag="ul" name="transUl" mode="in-out">
        <li v-for="i in album" :key="i" :data-id="i" @click="inTo(i)">
          <img src="/imgs/bk.jpeg" width="180" height="180" style="object-fit:cover"/>
          <p>小标题{{i}}</p>
        </li>
      </transition-group>
    <!-- </ul> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      isIn: false,
      album: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      albumSec: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  methods: {
    inTo (id) {
      // if(this.albumSec)
      this.album = []
      this.isIn = !this.isIn
      setTimeout(() => {
        if (!this.isIn) this.album = this.albumSec
        else this.album = [id]
      }, 400)
    }
  }
}
</script>

<style lang="scss">
#album{
  height: 100%;
  overflow-y: scroll;
  h1{
    margin-top: 260px;
    text-align: center;
    font-size: 60px;
    font-family: 'soft';
    font-weight: 200;
    color: gainsboro;
  }
  ul{
    margin-top: 60px;
    list-style: none;
    padding: 10px;
    li{
      width: 200px;
      height: 230px;
      background-color: rgba($color: #fff, $alpha: .5);
      box-shadow: 0px 0px 10px rgba(193, 58, 227, 0.522);
      display: inline-block;
      margin: 20px;
      overflow: hidden;
      text-align: center;
      img{
        margin-top: 10px;
        margin-bottom: 5px;
      }
      transition: .5s 0s ease;
      transform: rotateZ(-5deg);
      &:hover{
        background-color: rgba($color: #fff, $alpha: .7);
        box-shadow: 0px 0px 30px rgba(193, 58, 227, 0.7);
      }
    }
  }
  .transUl-enter-active,.transUl-leave-active{
    transition: all .4s ease-out;
  }
  .transUl-enter,.transUl-leave-to{
    transform: rotateZ(-6deg);
    opacity: 0;
  }
}
</style>

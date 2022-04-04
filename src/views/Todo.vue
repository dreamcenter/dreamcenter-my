<template>
  <div id="todo">
    <ul>
      <li v-for="i in 100" :key="i" :style="{'background-color':randomColor()}">todo-{{i}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    getRandomColorNum () {
      return Math.floor(Math.random() * 256)
    },
    randomColor () {
      return 'rgba(' + this.getRandomColorNum() + ',' + this.getRandomColorNum() + ',' + this.getRandomColorNum() + ',.5)'
    }
  }
}
</script>

<style lang="scss">
#todo{
  ul{
    margin-top: 60px;
    li{
      min-width: 100px;
      margin: 10px;
      text-align: center;
      font-size: 20px;
      // background-color: rgba(255, 127, 80, 0.666);
      display: inline-block;
    }
  }
}
</style>

<template>
  <div class="acgn_tab">
    <div style="width:100px;height:100px;overflow:hidden">
      <img :src="icon" width="100" height="100"/>
    </div>
    <span>
      <h3><a :title="title">{{title}}</a></h3>
      <!-- <b>进度: {{temp}}/{{total}}</b> -->
    </span>
  </div>
</template>

<script>
export default {
  props: ['icon', 'title', 'temp', 'total']
}
</script>

<style lang="scss">
.acgn_tab{
  // height: 140px;
  height: 120px;
  width: 100px;
  display: inline-block;
  margin: 5px;
  box-shadow: 0 0 4px rgba(0,0,0,.8);
  overflow: hidden;
  font-family: '仿宋';
  background-color: aliceblue;
  h3{
    font-size: 16px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  img{
    box-sizing: border-box;
    object-fit:cover;
    display: inline-block;
    transition: .1s 0s ease-out;
  }
  span{
    display: inline;
  }
  // h3{
  //   display: inline-block;
  // }
  &:hover{
    img{
      transform: scale(1.2);
    }
  }
}
</style>

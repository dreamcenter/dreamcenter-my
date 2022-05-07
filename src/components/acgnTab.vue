<template>
  <div class="acgn_tab">
    <img :src="icon" width="100" height="100"/>
    <span>
      <h3><a :title="title">{{title}}</a></h3>
      <b>进度: {{temp}}/{{total}}</b>
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
  height: 150px;
  width: 100px;
  display: inline-block;
  margin: 5px;
  box-shadow: 0 0 4px rgba(0,0,0,.8);
  overflow: hidden;
  h3{
    font-size: 16px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  img{
    box-sizing: border-box;
    object-fit:cover;
    display: inline-block;
  }
  span{
    display: inline;
  }
  // h3{
  //   display: inline-block;
  // }
}
</style>

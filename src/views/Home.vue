<template>
  <div id="home">
    <h1>时光潜流</h1>
    <p>任时光流逝，进入无言的虚无。</p>
  </div>
</template>

<script>
</script>

<style lang="scss">
#home{
  width: 100%;
  height: 100%;
  background: url('/imgs/bk.jpeg') fixed no-repeat;
  background-size: cover;
  h1{
    width: 100%;
    top: calc(50% - 100px);
    font-family: 'soft';
    font-size: 100px;
    font-weight: 100;
    position: absolute;
    text-align: center;
    color: rgb(215, 240, 236);
    text-shadow: 0 0 15px rgba(16, 159, 255, .7);
  }
  p{
    width: 100%;
    top: calc(50%);
    font-family: 'soft';
    font-size: 40px;
    font-weight: 100;
    position: absolute;
    text-align: center;
    color: rgb(174, 255, 228);
    text-shadow: 0 0 4px rgba(248, 224, 116, 0.644);
  }
}
</style>

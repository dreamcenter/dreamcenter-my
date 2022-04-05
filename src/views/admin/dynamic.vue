<template>
  <div id="_dynamic">
    <h3>动态</h3>
    <button @click="this.toWriting">写一篇动态</button>
  </div>
</template>

<script>
export default {
  methods: {
    toWriting () {
      this.$router.push('/Admin/writing?type=dynamic')
    }
  }
}
</script>

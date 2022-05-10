<template>
  <div id="_blog">
    <h3>博客</h3>
    <button @click="this.toWriting">写一篇博客</button>
  </div>
</template>

<script>
export default {
  methods: {
    toWriting () {
      this.$router.push('/Admin/writing?type=blog').catch(err => err)
    }
  }
}
</script>

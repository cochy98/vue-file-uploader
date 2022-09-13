<template>
  <div id="app">
    <VueUploader />
  </div>
</template>

<script>
import VueUploader from './components/VueUploader.vue';

export default {
  name: 'App',
  components: {
    VueUploader
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>

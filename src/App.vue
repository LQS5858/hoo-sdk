<template>
  <div id="app">
    <GuideStep />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    GuideStep: () => import('./components/guide')
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

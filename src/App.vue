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
}
</style>

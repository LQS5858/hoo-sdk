<template>
  <div class="mask"
       id="ein-mask"></div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.mask {
  position: fixed;
  background: rgba(0, 0, 0, 0.6);
  left: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  right: 0;
  z-index: 1000;
}
</style>
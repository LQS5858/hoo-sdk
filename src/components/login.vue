<template>
  <div class="login-wrap"
       :style="rootStyle">
    <input type="text"
           v-model="username">
    <div>store{{count}}</div>
    <div>
      <button @click="changCount">改变store</button>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      username: null
    }
  },
  computed: {
    ...mapState({
      count: state => state.basic.count,
      opts: state => state.basic.opts
    }),
    rootStyle () {
      console.log('opts>>>', this.$opts, this.opts);
      const { width = '400px', height } = this.$opts || {}
      return {
        width,
        height
      }
    }
  },
  methods: {
    changCount () {
      let count = this.count
      count = count + 1
      this.$store.commit('COUNT_ADD', count)
    }
  }
}
</script>

<style lang="scss">
.login-wrap {
  background: grey;
  width: 200px;
  height: 500px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
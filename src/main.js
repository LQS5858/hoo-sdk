import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './assets/styles/global.scss'
import { optionalChaining } from './utils/common'
import Ripple from 'vue-ripple-directive'
import configParams from '@/mixins/entry'

Vue.config.productionTip = false

Vue.prototype.$$ = optionalChaining

Vue.directive('ripple', Ripple);
Ripple.color = 'rgba(0, 0, 0, 0.2)'; //自定义水波纹颜色
new Vue({
  store,
  mixins: [configParams],
  render: h => h(App)
}).$mount('#app')

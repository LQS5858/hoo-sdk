import Vue from 'vue'
import Vuex from 'vuex'
import basic from './modules/basic'
Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        basic
    }
})

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './assets/styles/global.scss'
import { optionalChaining } from './utils/common'
import Ripple from 'vue-ripple-directive'
import configParams from '@/mixins/entry'

import Mask from './components/guide/mask.vue'


Vue.prototype.$$ = optionalChaining
Vue.directive('ripple', Ripple);
Ripple.color = 'rgba(0, 0, 0, 0.2)'; //自定义水波纹颜色


export default class Login {
    constructor(opts, cb) {
        this.opts = opts
        this.renderDom(cb)
        this.renderMask(cb)
    }
    async renderMask (cb) {
        const instance = new Vue({
            el: document.createElement('div'),
            render: h => h(Mask)
        })
        document.body.appendChild(instance.$el)
        cb('蒙层插入body')
    }
    async renderDom (cb) {
        let { el = '#root' } = this.opts || {}
        const isEl = document.querySelector(el)
        if (!isEl) {
            const arr = el && el.split("#")
            const createEl = arr && arr[1]
            const dom = document.createElement('div')
            dom.setAttribute('id', createEl)
            document.body.appendChild(dom)
        }
        console.log(el);
        const instance = new Vue({
            el: document.createElement("div"),
            render: h => h(App),
            store,
            mixins: [configParams]
        })
        document.querySelector('#root').appendChild(instance.$el)
        cb('挂载成功>>>')
    }

}

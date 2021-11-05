

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './assets/styles/global.scss'
import { optionalChaining } from './utils/common'
import Ripple from 'vue-ripple-directive'

import Mask from './components/guide/mask.vue'


Vue.prototype.$$ = optionalChaining
Vue.directive('ripple', Ripple);
Ripple.color = 'rgba(0, 0, 0, 0.2)'; //自定义水波纹颜色
/**
 * 单例模式
 */


export default class Guide {
    constructor(opts, successCb, closeCb) {
        this.opts = opts
        this.successCb = successCb
        this.closeCb = closeCb
        if (!Guide.instance) {
            Guide.instance = this
            this.renderMask()
            this.renderDom()
        }
        return Guide.instance
    }
    async renderMask () {
        const instance = new Vue({
            el: document.createElement('div'),
            render: h => h(Mask)
        })
        document.body.appendChild(instance.$el)
    }
    renderDom () {
        const { curStep = 1, stepList } = this?.opts || {}
        console.log('opts>>>2', this.opts);
        if (!curStep || !stepList || !stepList?.length) {
            throw new Error('curStep和stepList为必传参数>>>')
        }
        const { classId } = stepList?.[curStep - 1] || {}
        if (classId) {
            const dom = document.querySelector(classId)
            dom.style.position = 'relative'
            dom.style.zIndex = '5555'
        }
        const instance = new Vue({
            el: document.createElement("div"),
            render: h => h(App),
            store,
            provide: () => {
                return {
                    opts: this.opts,
                    closeCb: this.closeCb
                }
            }
        })
        let dom
        if (classId) {
            dom = document.querySelector(classId)
        } else {
            dom = document.body
        }
        dom && dom.appendChild(instance.$el)
    }
    static async init (opts, successCb, closeCb) {
        console.log('init中opts', Guide.instance.opts);
        if (!this.instance) {
            this.instance = new Guide(opts, successCb, closeCb)
        }
        return this.instance
    }
}
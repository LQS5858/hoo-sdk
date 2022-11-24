

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
    constructor(opts, nextCb, prevCb, completedCb) {
        this.opts = opts
        this.nextCb = nextCb
        this.prevCb = prevCb
        this.targetDom = null
        this.completedCb = completedCb
        this.renderMask()
        if (!Guide.instance) {
            Guide.instance = this
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
    sleep (duration) {
        return new Promise((resolve) => {
            let id = setTimeout(() => {
                resolve()
                id = clearTimeout(id)
            }, duration);
        })
    }
    async renderDom (curStep) {
        const { stepList } = this?.opts || {}
        console.log('opts>>>2', this.opts);
        if (!curStep || !stepList || !stepList?.length) {
            throw new Error('curStep和stepList为必传参数>>>')
        }
        const { classId } = stepList?.[curStep - 1] || {}
        if (classId) {
            this.targetDom = document.querySelector(classId)
            while (!this.targetDom) {
                await this.sleep(1000)
                this.targetDom = document.querySelector(classId)
            }
            try {
                this.targetDom.style.position = 'relative'
                this.targetDom.style.zIndex = '3000'
            } catch (error) {
                console.error(error);
            }

        }
        const instance = new Vue({
            el: document.createElement("div"),
            render: h => h(App),
            store,
            provide: () => {
                return {
                    opts: this.opts,
                    step: curStep,
                    nextCb: this.nextCb,
                    prevCb: this.prevCb,
                    targetDom: this.targetDom,
                    completedCb: this.completedCb
                }
            }
        })

        this.targetDom?.appendChild(instance.$el)
    }
    static async init (opts, nextCb, completedCb) {
        console.log('init中opts', Guide.instance.opts);
        if (!this.instance) {
            this.instance = new Guide(opts, nextCb, completedCb)
        }
        return this.instance
    }
}
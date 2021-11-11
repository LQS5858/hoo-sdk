


//依赖收集类
function defineReactive (data, key, val) {
    //如果有子属性要递归遍历所有子属性
    Observe(val)
    //实例化订阅者
    let dep = new Dep()
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            if (Dep.target) {
                dep.addSub(Dep.target)
            }
            return val
        },
        set: function (newVal) {
            val = newVal
            console.log('属性key被监听了>>>', key);
            //通知订阅者
            dep.notify()
        }
    })
}



// 数据劫持类
function Observe (data) {
    if (!data || typeof data !== 'object') return
    Object.keys(data).forEach(key => {
        defineReactive(data, key, data[key])
    })
}

//订阅器类
function Dep () {
    this.subs = []
}

Dep.prototype = {
    addSub: function (sub) {
        this.subs.push(sub)
    },
    notify: function () {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}

//订阅者类
function Watcher (vm, exp, cb) {
    this.vm = vm
    this.exp = exp
    this.cb = cb
    this.value = this.get()
}

Watcher.prototype = {
    update: function () {
        this.run()
    },
    run: function () {
        let value = this.vm.data[this.exp]
        let oldValue = this.value
        if (value !== oldValue) {
            this.value = value
            this.cb.call(this.vm, value, oldValue)
        }
    },
    get: function () {
        console.log('执行次数>>>');
        Dep.target = this //缓存自己
        let value = this.vm.data[this.exp] //强制执行监听器里面的get
        Dep.target = null //释放自己
        return value
    }
}


function Vue (data, el, exp) {
    this.data = data

    // 绑定代理属性
    Object.keys(data).forEach(key => {
        this.proxyKeys(key)
    })
    // 添加到数据劫持
    Observe(data)
    el.innerHTML = this.data[exp]
    //添加到订阅者
    new Watcher(this, exp, function (value, oldValue) {
        console.log('数据响应的值>>>', value, oldValue);
        el.innerHTML = value
    })
}

Vue.prototype = {
    proxyKeys: function (key) {
        Object.defineProperty(this, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                return this.data[key]
            },
            set: function (newVal) {
                this.data[key] = newVal
            }
        })
    }
}
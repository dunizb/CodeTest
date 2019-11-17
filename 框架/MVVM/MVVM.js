


class Dep {
    constructor() {
        this.subs = []
    }
    // 订阅
    addSub(watcher) {
        this.subs.push(watcher)
    }
    // 发布
    notify() {
        this.subs.forEach(watcher => watcher.update())
    }
}

// 观测者
class Watcher {
    constructor(vm, express, cb) {
        this.vm = vm
        this.express = express
        this.cb = cb
        // 默认先存放一个老值
        this.oldValue = this.get()
    }
    get() {
        Dep.target = this   // 先把自己放在this上
        const value = CompileUitl.getVal(this.vm, this.express)
        Dep.target = null
        return value
    }
    update() { // 更新操作，数据变化后，会调用观察者的updater方法
        const newVal = CompileUitl.getVal(this.vm, this.express)
        if(newVal !== this.oldValue) {
            this.cb(newVal)
        }
    }
}

// 实现数据劫持
class Observe {
    constructor(data) {
        this.observe(data)
    }
    observe(data) {
        // 如果是对象才观察
        if(data && typeof data == 'object') {
            for (const key in data) {
                this.defineReactive(data, key, data[key])
            }
        }
    }
    defineReactive(data, key, value) {
        this.observe(value)
        const dep = new Dep() // 给每一个属性添加具有发布订阅的功能
        Object.defineProperty(data, key, {
            get() {
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set:(newVal) => {
                if (newVal !== value) {
                    this.observe(value)
                    value = newVal
                    dep.notify()
                }   
            }
        })
    }
}

// 编译模板
class Compiler {
    constructor(el, vm) {
        // 判断el是不是一个元素，如果不是元素那就获取他
        this.el = this.isElementNode(el) ? el : document.querySelector(el)
        this.vm = vm
        // 把当前节点中的元素获取到放到内存中
        const fragment = this.node2Fragment(this.el)
        // 把节点中的内容进行替换

        // 编译模板，用数据编译
        this.compile(fragment)
        // 把内容塞到页面中
        this.el.appendChild(fragment)
    }
    // 判断是不是指令
    isDirective(attrName) {
        return attrName.startsWith('v-')
    }
    // 编译元素
    compileElement(node) {
        const attributes = node.attributes
        Array.from(attributes).forEach(attr => { // type="text" v-modle="school.name"
            const { name, value:express } = attr
            // 判断是不是指令
            if(this.isDirective(name)) {
                const [,directive] = name.split('-') // v-modle v-html v-bind
                const [directiveName, eventName] = directive.split(':') // v-on:click
                // 需要调用不同的指令来处理
                CompileUitl[directiveName](node, express, this.vm, eventName)
            }
        })
    }
    // 编译文本
    compileText(node) { // 判断当前文本节点中内容是否包含{{xxx}} {{aaa}}
        const context = node.textContent
        if(/\{\{(.+?)\}\}/.test(context)) {
            // 文本节点
            CompileUitl['text'](node, context, this.vm) // 
        }
    }
    // 核心编译有方法，编译内存中的节点
    compile(node) {
        let childNodes = node.childNodes
        Array.from(childNodes).forEach(child => {
            if(this.isElementNode(child)) {
                this.compileElement(child)
                // 如果是元素的话，需要把自己穿进去 再去遍历自己
                this.compile(child)
            } else {
                this.compileText(child)
            }
        })
    }
    // 把节点移动到内存中
    node2Fragment(node) {
        const fragment = document.createDocumentFragment()
        let firstChild
        while (firstChild = node.firstChild) {
            fragment.appendChild(firstChild)
        }
        return fragment
    }
    isElementNode(node) { // 是不是元素节点
        return node.nodeType === 1
    }
}

CompileUitl = {
    /**
     * 根据表达式取到对应的数据
     * @param {*} vm 
     * @param {*} express 
     */
    getVal(vm, express) { // school.name
        return express.split('.').reduce((data, current) => {
            return data[current]
        }, vm.$data)
    },
    setVal(vm, express, value) {    // vm.$data 'school.name' = 'XXX'
        express.split('.').reduce((data, current,index, arr) => {
            if(index == arr.length - 1) {
                return data[current] = value
            }
            return data[current]
        }, vm.$data)
    },
    /**
     * 解析v-model指令，给输入框赋予value属性
     * @param {*} node 节点
     * @param {*} express 表达式
     * @param {*} vm 实例
     */
    model(node, express, vm) {
        // school.name vm.$data node.value = xxx
        const fn = this.updater['modelUpdater']
        new Watcher(vm, express, (newVal) => {  // 给输入框加一个观察者
            fn(node, newVal)
        })
        node.addEventListener('input', e => {
            const value = e.target.value
            this.setVal(vm, express, value)
        })
        const value = this.getVal(vm, express)
        fn(node, value)
    },
    html(node, express, vm) { // v-html="xxxx"
        const fn = this.updater['htmlUpdater']
        new Watcher(vm, express, (newVal) => {  // 给输入框加一个观察者
            fn(node, newVal)
        })
        const value = this.getVal(vm, express)
        fn(node, value)
    },
    getContentValue(vm, express) {
        // 遍历表达式 将内容重新替换成一个完整的内容 返还回去
        return express.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(vm, args[1])
        })
    },
    on(node, express, vm, eventName) { // v-on:click="change" express
        node.addEventListener(eventName, (e) => {
            vm[express].call(vm, e) // this.change
        })
    },
    text(node, express, vm) { // express, {{b}} {{c}} => b c
        const fn = this.updater['textUpdater']
        const content = express.replace(/\{\{(.+?)\}\}/g, (...args) => {
            // console.log('args', args);
            // 给表达式每个{{}}加上观察者
            new Watcher(vm, args[1], () => {  // 给输入框加一个观察者
                fn(node, this.getContentValue(vm, express)) //返回了一个全的字符串
            })
            return this.getVal(vm,args[1])
        })
        fn(node, content)
    },
    updater: {
        // 把数据插入到节点
        modelUpdater(node, value) {
            node.value = value
        },
        htmlUpdater(node, value) { // xss攻击
            node.innerHTML = value
        },
        textUpdater(node, value) {
            node.textContent = value
        }
    }
}

// 基类
class Vue {
    constructor(options) {
        this.$el = options.el
        this.$data = options.data
        const computed = options.computed
        const methods = options.methods
        // 这个根元素存在 存在编译模板
        if(this.$el) {
            // 数据劫持
            new Observe(this.$data)
            // {{newName}} reduce vm.$data.newName
            for (const key in computed) {
                Object.defineProperty(this.$data, key, {
                    get:() => {
                        return computed[key].call(this)
                    }
                })
            }
            for (const key in methods) {
                Object.defineProperty(this, key, {
                    get:() => {
                        return methods[key]
                    }
                })
            }
            // 把数据获取操作 vm行的取值操作都代理到vm.$data上
            this.proxyVm(this.$data)

            // 模板编译
            new Compiler(this.$el, this)
        }
    }
    proxyVm(data) {
        for (const key in data) {
            Object.defineProperty(this, key, {
                get() {
                    return data[key]    // 进行了转化操作
                },
                set(newVal) {
                    data[key] = newVal
                }
            })
        }
    }
}
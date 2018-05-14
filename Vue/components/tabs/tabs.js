Vue.component('tabs', {
    template: `
    <div class="tabs">
        <div class="tabs-bar">
            <div :class="tabCls(item)"
                v-for="(item, index) in navList"
                @click="handleChange(index)">
                {{item.label}}    
            </div>
        </div>
        <div class="tabs-contents">
            <slot></slot>
        </div>
    </div>`,
    props: {
        value: {
            type: [String, Number]
        }
    },
    data: function() {
        return {
            // 因为不能修改value，所以复制一份自己维护
            currentValue: this.value,
            // tabs标题
            navList: []
        }
    },
    methods: {
        tabCls(item) {
            return ['tabs-tab', {
                // 给当前选中的tab加一个class
                'tabs-tab-active': item.name === this.currentValue
            }]
        },
        handleChange(index) {
            var nav = this.navList[index];
            var name = nav.name;
            // 改变当前选中的 tab，并触发下面的 watch
            this.currentValue = name;
            // 更新value
            this.$emit('input', name);
            // 触发一个自定义事件，供父级使用
            this.$emit('on-click', name);
        },
        getTabs() {
            // 通过遍历子组件，得到所有的pane组件
            return this.$children.filter(function(item) {
                return item.$options.name === 'pane';
            });
        },
        updateNav() {
            this.navList = [];
            var _this = this;
            this.getTabs().forEach(function(pane, index) {
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index
                });

                // 如果没有给pane设置name，默认设置它的索引
                if(!pane.name) pane.name = index;

                if(index === 0) {
                    if(!_this.currentValue) {
                        _this.currentValue = pane.name || index;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus() {
            var tabs = this.getTabs();
            var _this = this;
            tabs.forEach(function(tab, index) {
                return tab.show = tab.name === _this.currentValue;
            });
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
        },
        currentValue() {
            // 在当前选中的tab发生变化时，更新pane的显示状态
            this.updateStatus();
        }
    }
});
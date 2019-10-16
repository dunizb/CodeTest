Component({
  options: {
    // 开启全局样式支持
    addGlobalClass: true,
    // 开启多Slot支持
    multipleSlots: true 
  },
  externalClasses: ['custom-class'],
  relations: {
    './timeline-item/index': {
      type: 'child',
      linked: function (target) {
        // 每次有custom-li被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后
        this._getAllChildren()
      },
      unlinked: function (target) {
        this._getAllChildren()
      }
    }
  },
  properties: {
    reverse: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    _getAllChildren() {
      const nodes = this.getRelationNodes('./timeline-item/index')
      if (nodes.length) {
        const lastIndex = nodes.length - 1
        const { reverse } = this.data
        nodes.forEach((element, index) => {
          const isLast = index === lastIndex
          element.updateIsLastElement({
            index,
            isLast,
            reverse
          })
        })
      }
    }
  }
})

import styleToCssString from '../../../utils/styleToCssString.js'
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  externalClasses: ['timestamp-class', 'content-class'],
  relations: {
    '../../timeline/index': {
      type: 'parent'
    }
  },
  properties: {
    timestamp: String,
    customDot: Boolean,
    dotStyle: {
      type: [String, Object],
      value: '',
      observer(newVal) {
        console.log('styleToCssString', styleToCssString(newVal))
        this.setData({
          extStyle: styleToCssString(newVal),
        })
      },
    },
    color: {
      type: String,
      value: 'currentColor',
      observer(newVal) {
        if (newVal) {
          let extStyle = this.data.extStyle
          if (extStyle) {
            extStyle = extStyle + ';'
          }
          this.setData({
            extStyle: extStyle + `color:${newVal}`
          })
        }
      },
    }
  },
  data: {
    index: 0,
    isLast: false,
    reverse: true,
    extStyle: ''
  },
  methods: {
    updateIsLastElement({ index, isLast, reverse }) {
      this.setData({ index, isLast, reverse })
    }
  }
})

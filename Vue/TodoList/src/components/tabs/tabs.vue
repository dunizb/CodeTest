<script>
  export default {
    name: 'Tabs',
    props: {
      value: {
        type: [String, Number],
        required: true
      }
    },
    data() {
      return {
        panes: []
      }
    },
    render () {
      const contents = this.panes.map(pane => {
        return pane.active ? pane.$slots.default : null;
      });
      return (
        <div class="tags">
          <ul class="tabs-header">
            {this.$slots.default}
          </ul>
          <div class="tab-contents">
            {contents}
          </div>
        </div>
      )
    },
    methods: {
      onChange(index) {
        this.$emit('change', index);
      }
    }
  }
</script>

<style lang="stylus" scoped>
.tabs-header
  display flex
  list-style none
  margin 0
  padding 0
  border-bottom 2px solid #ededed
</style>

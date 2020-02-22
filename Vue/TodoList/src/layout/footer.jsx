import '../assets/styles/footer.styl'

export default {
  data() {
    return {
      author: 'Dunizb',
      blog: 'dunizb.com'
    }
  },
  render(h) {
    return (
      <div id="footer">
        Hosted by <a href="https://pages.coding.me" target="_blank" style="font-weight: bold">Coding Pages</a> &
        Power by <a href="https://wwww.dunizb.com" target="_blank" style="font-weight: bold">{this.author}</a>，
      </div>
    )
  }
}

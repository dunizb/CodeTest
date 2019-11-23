import './index.css'

const dom = document.getElementById('root')
dom.innerHTML = '<div class="calcimg">HtmlWebpackPlugin</div>'

console.log('hello world ****')

const arr = [1,2,3]
const arrMap = arr.map(item => item+'*')
console.log('arrMap', arrMap)
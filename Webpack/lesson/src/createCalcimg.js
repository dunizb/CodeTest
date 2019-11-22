
import calcimg from './calcimg.jpg'
import style from './index.scss'
function createCalcimg() {
    var img = new Image()
    img.src = calcimg
    img.classList.add(style.calcimg)

    document.getElementById('root').append(img)
}

export default createCalcimg
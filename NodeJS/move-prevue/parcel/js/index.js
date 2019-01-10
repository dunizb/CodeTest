function changeTitle () {
  document.getElementById('app').innerText = 'Parcel 打包包'
}

setTimeout(function () {
  changeTitle()
}, 2000)
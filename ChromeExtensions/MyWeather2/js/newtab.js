function getTime(el) {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = m >= 10 ? m : "0" + m;
  s = s >= 10 ? s : "0" + s;
  el.innerHTML = h + ":" + m + ":" + s;
  setTimeout(function () {
    getTime(el);
  }, 1000);
}

function getDate(el) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const week = today.getDay();
  const weeks = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"];
  el.innerHTML = `${year}年${month}月${day}日${weeks[week]}`;
}

function getBackgroundImg() {
  const APIKEY = "563492ad6f91700001000001e82bd3aea51a4f18a30b09ce81aacb33";
  fetch("https://api.pexels.com/v1/curated", {
    method: "GET",
    headers: {
      "Authorization": APIKEY,
    },
    SameSite: "None",
  }).then((res) => res.json()).then((data) => {
    const photos = data.photos.map((item) => {
      return {
        landscape: item.src.landscape,
        photographer: item.photographer,
        photographer_url: item.photographer_url,
      };
    });
    localStorage.setItem("photos", JSON.stringify(photos));
    setBackgroundImg(0);
  });
}

let local_photos = [];
function setBackgroundImg(index) {
  local_photos = JSON.parse(localStorage.getItem("photos") || []);
  // 修改背景图片
  const $body = document.querySelector("body");
  $body.style.backgroundImage = `url(${local_photos[index]["landscape"]})`;
  // 修改作者
  const $authorLink = document.querySelector("#author");
  $authorLink.innerText = local_photos[index]["photographer"];
  $authorLink.href = local_photos[index]["photographer_url"];
}

// 背景图片
getBackgroundImg();

// 显示时间
const $dateTime = document.querySelector(".datetime");
getTime($dateTime);

// 显示日期
const $date = document.querySelector(".date");
getDate($date);

// 切换背景图片
document.querySelector(".changeImg").addEventListener("click", () => {
  const index = Math.floor(Math.random() * local_photos.length);
  setBackgroundImg(index);
}, false);

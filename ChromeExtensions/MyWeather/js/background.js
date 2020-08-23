function pFetch() {
  return new Promise((resolve, reject) => {
    fetch(
      "https://tianqiapi.com/api?version=v6&appid=24222488&appsecret=5rwuHzOJ",
    )
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
  });
}

/**
 * 设置扩展图标
 * @param {String} iconName 天气图片名称
 */
function setIcon(iconName) {
  chrome.browserAction.setIcon({
    path: {
      "128": `http://tq.daodaoim.com/tianqiapi/skin/pitaya/${iconName}.png`,
    },
  });
}

/**
 * 发送桌面通知
 * @param {String} city 城市名称
 * @param {String} iconName 天气图片
 */
function sendNotification(city, iconName) {
  const notification = new Notification(`${city}天气提醒`, {
    body: `${city}的天气有新变化了，快去查看吧`,
    icon: `http://tq.daodaoim.com/tianqiapi/skin/pitaya/${iconName}.png`,
    requireInteraction: true,
  });
  setTimeout(() => {
    notification.close();
  }, 5000);
}

function init() {
  // 上一次天气状态
  let preType = localStorage.getItem("pre_type");
  const timerId = setInterval(() => {
    pFetch().then((data) => {
      console.log(data);
      const wea = data.wea; // 天气，如晴，多云等
      // 和上一次天气不同，天气有变化
      if (preType !== wea) {
        // 设置扩展图标Badge
        chrome.browserAction.setBadgeText({ text: wea });
        chrome.browserAction.setBadgeBackgroundColor(
          { color: [255, 0, 0, 255] },
        );
        // 发送桌面通知
        sendNotification(data.city, wea);
      }
      // 保存这一次天气状态
      localStorage.setItem("pre_type", wea);
      // 修改扩展图标
      setIcon(data.wea_img);
    });
  }, 1000 * 60);
}

init();

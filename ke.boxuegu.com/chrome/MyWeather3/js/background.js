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
  // 3s后关闭
  setTimeout(() => {
    notification.close();
  }, 3000);
}

/**
 * 初始化，程序首先执行这个犯法
 */
function init() {
  let preType = localStorage.getItem("pre_type"); // 上一次天气状态
  const appid = "24222488"; // 上一次天气状态
  const appsecret = "5rwuHzOJ"; // 你的appsecret
  const timerId = setInterval(() => {
    fetch(
      `https://tianqiapi.com/api?version=v6&appid=${appid}&appsecret=${appsecret}`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const wea = data.wea; // 天气，如晴，多云等
        // 当天气相比上次有变化时做一些处理
        if (1 == 1 /*preType !== wea*/) {
          // 设置扩展图标Badge
          chrome.browserAction.setBadgeText({ text: wea });
          chrome.browserAction.setBadgeBackgroundColor(
            { color: [255, 0, 0, 255] },
          );
          // 更换图标
          setIcon(data.wea_img);
          // 发送桌面通知
          sendNotification(data.city, data.wea_img);
        }
        // 保存这一次天气状态
        localStorage.setItem("pre_type", wea);
      });
  }, 1000 * 60); // 3个小时
}
// 调用初始化方法
init();

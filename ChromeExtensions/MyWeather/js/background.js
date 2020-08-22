function pFetch(cityName) {
  return new Promise((resolve, reject) => {
    fetch(`http://wthrcdn.etouch.cn/weather_mini?city=${cityName}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 1000) {
          resolve(data.data);
        } else {
          reject(data.desc);
        }
      }).catch((err) => {
        reject(err);
      });
  });
}

function setIcon(iconName) {
  chrome.browserAction.setIcon({
    path: {
      "128": `images/${iconName}.png`,
    },
  });
}

function sendNotification(cityName, iconName) {
  const notification = new Notification(`${cityName}天气提醒`, {
    body: `${cityName}的天气有新变化了，快去查看吧`,
    tag: "daxin",
    icon: `images/${iconName}.png`,
    requireInteraction: true,
  });
  setTimeout(() => {
    notification.close();
  }, 5000);
}

function init() {
  let cityName = localStorage.getItem("local_city") || "北京";
  // 上一次天气状态
  let todayType = localStorage.getItem("today_type");
  const timerId = setInterval(() => {
    pFetch(cityName).then((data) => {
      const type = data.forecast[0]["type"]; // 晴，多云，小雨...
      if (todayType !== type) {
        chrome.browserAction.setBadgeText({ text: type });
        chrome.browserAction.setBadgeBackgroundColor(
          { color: [255, 0, 0, 255] },
        );
        // 发送桌面通知
        sendNotification(cityName, type);
        todayType = type;
      }
      localStorage.setItem("today_type", todayType);
      // 修改扩展图标
      setIcon(todayType);
    });
  }, 1000 * 60);
}

init();

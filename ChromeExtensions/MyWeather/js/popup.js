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

function init() {
  const city = document.getElementById("city");
  let cityName = localStorage.getItem("local_city") || "北京";
  city.value = cityName;
  getWeather(cityName);

  city.addEventListener("blur", function (e) {
    cityName = e.target.value;
    city.value = e.target.value;
    localStorage.setItem("local_city", cityName);
    getWeather(cityName);
  });
}

function getWeather(cityName) {
  pFetch(cityName).then((data) => {
    const forecast = data.forecast;
    let trHtml = "";
    forecast.forEach((item) => {
      trHtml += `<tr><td>${item.date}</td>
      <td>${item.low}~${item.high}，${item.type}</td></tr>`;
    });
    document.getElementById("result").innerHTML = `
      <table>
        <caption>
          ${data.city}今天：${data.wendu}℃，${data.ganmao}
        </caption>
        <thead>
          <th>日期</th>
          <th>天气</th>
        </thead>
        <tbody>
          ${trHtml}
        </tbody>
      </table>`;
  });
}

init();

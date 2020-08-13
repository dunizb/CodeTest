import { parse } from "https://deno.land/std@0.61.0/flags/mod.ts";
import AsciiTable from "https://deno.land/x/ascii_table/mod.ts";

const args = parse(Deno.args);

if (args.city === undefined) {
  console.error("No city supplied");
  Deno.exit();
}

const appid = "67524265";
const apiKey = "sj4Rwdvn";

const res = await fetch(
  `https://yiketianqi.com/api?version=v9&appid=${appid}&appsecret=${apiKey}`,
);
const data = await res.json();

// console.log(data.data);

interface forecastItem {
  day: string;
  wea: string;
  tem: string;
  air_level: string;
}

const forecast = data.data.map((item: forecastItem) => [
  item.day, // 日期
  item.wea, // 天气
  item.tem, // 实时温度
  item.air_level, // 空气质量等级
]);

// console.log("forecast", forecast);

const table = AsciiTable.fromJSON({
  title: `${args.city}七日天气预报`,
  heading: ["日期", "天气", "温度", "空气质量"],
  rows: forecast,
});

console.log(table.toString());

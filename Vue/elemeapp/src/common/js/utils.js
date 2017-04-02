/**
 * Created by Administrator on 2016/12/8 0008.
 */
/**
 * 解析URL参数
 * @example ?id=12345&a=121
 * @return Object {id:12345, a:121}
 */
export function urlParse() {
  let url = window.location.search;
  let o = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  // ['?id=12345','&=121']
  if (arr) {
    arr.forEach((item) => {
      let tempArray = item.substring(1).split('=');
      let key = decodeURIComponent(tempArray[0]);
      let val = decodeURIComponent(tempArray[1]);
      o[key] = val;
    });
  }
  return o;
}

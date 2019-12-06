const rp = require('request-promise');



return rp(`${baseUrl}/item.htm?id=${id}&clicktitle=${encodeURI(name)}`)
.then((html) => {

  return null
}).catch((err) => {
  console.log(err)
});
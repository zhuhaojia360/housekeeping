const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  getTime: getTime,
  detailTime: detailTime
}

function getTime() {
  var timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  console.log("当前时间戳为：" + timestamp);

  var n = timestamp * 1000;
  var date = new Date(n);
  var Y = date.getFullYear();
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var nowTime = Y + "-" + M + "-" + D;
  return (nowTime);
}

function detailTime() {
  var timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  console.log("当前时间戳为：" + timestamp);

  var n = timestamp * 1000;
  var date = new Date(n);
  var Y = date.getFullYear();
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var detailTime = Y + M + D + h + ":" + m + ":" + s

  console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s);
}


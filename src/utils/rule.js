export function formatObj (date) {
  date = new Date(date)
  var ti =  {
    y: date.getFullYear(),
    m: valZero(date.getMonth() + 1),
    d: valZero(date.getDate()),
    h: valZero(date.getHours()),
    i: valZero(date.getMinutes()),
    s: valZero(date.getSeconds()),
    w: date.getDay()
  }
  var time = ti.y +'-'+ ti.m +'-'+ ti.d + ' ' + ti.h+':'+ti.i+':'+ti.s
  return time
}
const valZero = function (n) {
  return n < 10 ? '0' + n : '' + n;
}
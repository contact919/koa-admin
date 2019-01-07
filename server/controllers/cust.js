const cust = require("../models/cust")
const custList = async function (ctx, next) {
  const data = await cust.query(ctx.request.body)
  ctx.body = {
      data
  }
}
// 导出对象
module.exports = {
  custList
}

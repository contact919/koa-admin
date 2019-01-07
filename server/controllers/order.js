const order = require("../models/order")
const orderList = async function (ctx, next) {
  const data = await order.query(ctx.request.body)
  ctx.body = {
      data
  }
}
// 导出对象
module.exports = {
  orderList
}

const login = require("../models/login")
const loginByUsername = async function (ctx, next) {
  const data = await login.query(ctx.request.body)
  ctx.body = {
      data
  }
}
// 导出对象
module.exports = {
  loginByUsername
}

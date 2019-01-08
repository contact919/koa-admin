const mgr = require("../models/mgr")

const loginByUsername = async function (ctx, next) {
  const data = await mgr.login(ctx.request.body)
  ctx.body = {
      data
  }
}
const info = async function (ctx, next) {
  const data = await mgr.info(ctx.query)    //get请求
  ctx.body = {
      data
  }
}
const changePwd = async function (ctx, next) {
  const data = await mgr.changePwd(ctx.request.body)
  ctx.body = {
      data
  }
}
// 导出对象
module.exports = {
  loginByUsername,
  info,
  changePwd
}

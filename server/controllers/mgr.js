const mgr = require("../models/mgr")

const loginByUsername = async function (ctx, next) {
  const data = await mgr.login(ctx.request.body)
  ctx.body = {
      data
  }
}
const setPwd = async function (ctx, next) {
  const data = await mgr.setPwd(ctx.request.body)
  ctx.body = {
      data
  }
}
const setAvatar = async function (ctx, next) {
  const data = await mgr.setAvatar(ctx.request.body)
  ctx.body = {
      data
  }
}
// 导出对象
module.exports = {
  loginByUsername,
  setPwd,
  setAvatar
}

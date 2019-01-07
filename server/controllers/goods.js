const goods = require("../models/goods")
const goodsList = async function (ctx, next) {
    const data = await goods.query(ctx.request.body)
    ctx.body = {
        data
    }
}
const goodsCreate = async function (ctx, next) {
    const data = await goods.create(ctx.request.body)
    ctx.body = {
        data
    }
}
const goodsDelete = async function (ctx, next) {
    const data = await goods.del(ctx.request.body)
    ctx.body = {
        data
    }
}
const goodsEdit = async function (ctx, next) {
    const data = await goods.edit(ctx.request.body)
    ctx.body = {
        data
    }
}
const goodsUpdate = async function (ctx, next) {
    const data = await goods.update(ctx.request.body)
    ctx.body = {
        data
    }
}
// 导出对象
module.exports = {
    goodsList,
    goodsCreate,
    goodsDelete,
    goodsEdit,
    goodsUpdate
}

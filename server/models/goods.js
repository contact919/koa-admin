const Sequelize =require('sequelize')
const Op = Sequelize.Op     //使用没有别名的 Sequelize 可以提高安全性
const db = require('../config/db.js' )
const model = db.import('../schema/goods.js')
model.sync() //有该表就不变 没有就新建，创建表并且返回一个 Promise 对象 默认情况下 forse = false

const query = async function (obj) {
    const dbGoods = await model.findAndCountAll({ // 查找全部的todolist
        order:[
            ['add_time', 'DESC']
        ],
        where: {
            goods_sn: {
                [Op.like]: `%${obj.id}%`
            },
            name: {
                [Op.like]: `%${obj.keywords}%`
            }
        },              
        offset: (obj.page-1) * obj.limit,
        limit: obj.limit,
        attributes: ['goods_sn','pic_url','id','name','counter_price','retail_price','is_new','gallery','brief','add_time','update_time']
    })    
    return dbGoods 
}
const create = async function (obj) {
    console.log(obj);
    const now = Date.now();
    const gal = JSON.stringify({key: obj.gallery}.key)  //画廊存为json数组字符串形式
    const crGoods = await model.create({
        goods_sn: obj.goods_sn,
        name: obj.name,
        gallery: gal,
        brief: obj.brief,
        is_new: obj.is_new === true ? 1 : 0,
        pic_url: obj.pic_url,
        counter_price: obj.counter_price,
        retail_price: obj.retail_price,
        add_time: now,
        update_time: now
    })    
    console.log(crGoods)
    return crGoods
}
const del = async function (obj) { 
    const deGoods = await model.destroy({
        where:{
            goods_sn: obj.goods_sn
        }
    })
    return
}
const edit = async function (obj) {
    console.log(obj);
    const edGoods = await model.findAll({
        where: {
            goods_sn: obj.id
        },              
        attributes: ['goods_sn','pic_url','id','name','counter_price','retail_price','is_new','gallery','brief','add_time','update_time']
    })    
    return edGoods 
}
const update = async function (obj) {
    const now = Date.now();
    const gal = JSON.stringify({key: obj.gallery}.key)  //画廊存为json数组字符串形式
    const upGoods = await model.update({
        goods_sn: obj.goods_sn,
        name: obj.name,
        gallery: gal,
        brief: obj.brief,
        is_new: obj.is_new === true ? 1 : 0,
        pic_url: obj.pic_url,
        counter_price: obj.counter_price,
        retail_price: obj.retail_price,
        update_time: now
    },{
        where:{
            goods_sn: obj.goods_sn
        }
    })    
    return
}
  
module.exports = {
    query,
    create,
    del,
    edit,
    update
}

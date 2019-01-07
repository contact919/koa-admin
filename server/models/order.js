const Sequelize =require('sequelize')
const Op = Sequelize.Op     //使用没有别名的 Sequelize 可以提高安全性
const model = require('../schema/order.js')
const utils = require('../utils')

const query = async function (obj) {
    // 处理为空查询
    var condit
    obj.status === "" ? condit = {
        order_sn: {
            [Op.like]: `%${obj.sn}%`
        }
    } : condit = {
        order_sn: {
            [Op.like]: `%${obj.sn}%`
        },
        order_status: parseInt(obj.status)
    }
        
    const dbOrder = await model.findAndCountAll({
        order:[
            ['add_time', 'DESC']
        ],
        where: condit,         
        offset: (obj.page-1) * obj.limit,
        limit: obj.limit,
        attributes: ['id','user_id','order_sn','order_status','order_price','add_time','update_time']
    })   

    // 日期格式转化 
    let mapList =dbOrder.rows.map(function (item) {
        return{
            id: item.id,
            user_id: item.user_id,
            order_sn: item.order_sn,
            order_status:  item.order_status,
            order_price:  item.order_price,
            add_time: utils.formatObj(new Date(item.add_time)),
            update_time: utils.formatObj(new Date(item.update_time)),
        }
    })
    dbOrder.rows = mapList
    return dbOrder 
}
  
module.exports = {
    query
}

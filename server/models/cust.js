const Sequelize =require('sequelize')
const Op = Sequelize.Op     //使用没有别名的 Sequelize 可以提高安全性
const model = require('../schema/cust.js')
const utils = require('../utils')

const query = async function (obj) {
    const dbCust = await model.findAndCountAll({ // 查找全部的todolist
        order:[
            ['add_time', 'DESC']
        ],
        where: {
            username: {
                [Op.like]: `%${obj.name}%`
            },
            mobile: {
                [Op.like]: `%${obj.mobile}%`
            }
        },              
        offset: (obj.page-1) * obj.limit,
        limit: obj.limit,
        attributes: ['id','username','password','mobile','address','gender','avatar','add_time','update_time']
    })   
    
    let mapList =dbCust.rows.map(function (item) {
        return{
            id: item.id,
            username: item.username,
            password: item.password,
            mobile:  item.mobile,
            address:  item.address,
            gender: item.gender,
            avatar: item.avatar,
            add_time: utils.formatObj(new Date(item.add_time)),
            update_time: utils.formatObj(new Date(item.update_time)),
        }
    })
    dbCust.rows = mapList
    return dbCust 
}
  
module.exports = {
    query
}

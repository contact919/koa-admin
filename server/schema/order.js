const Sequelize = require('sequelize');
const db = require('../config/db.js' )

const model = db.define('koa_order', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "自增id"
  },
  user_id: {
    type:Sequelize.INTEGER(11),
    allowNull: false,
    comment: "用户表的用户ID"
  },
  order_sn: {
    type: Sequelize.STRING(63),
    allowNull: false,
    comment: "订单编号"
  },
  order_status: {
    type: Sequelize.SMALLINT(6),
    allowNull: false,
    comment: "订单状态"
  },
  order_price: {
    type: Sequelize.DECIMAL(10), 
    comment: "订单费用"
  },
  add_time: {
    type: Sequelize.DATE,
    comment: "创建时间"
  },
  update_time: {
    type: Sequelize.DATE,
    comment: "更新时间"
  },
  deleted: {
    type: Sequelize.TINYINT(1),
    comment: "逻辑删除"
  },
}, { comment: "订单表" })

//有就不变 没有就新建 // 创建表并且返回一个 Promise 对象 可在db文件全局配置
// 默认情况下 forse = false
model.sync();

//先销毁后创建
// model.sync({
//     force: true
// });

module.exports = model;
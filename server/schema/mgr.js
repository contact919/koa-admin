const Sequelize = require('sequelize');
const db = require('../config/db.js' )

const model = db.define('koa_mgr', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "自增id"
  },
  username: {
    type:Sequelize.STRING(63),
    allowNull: false,
    comment: "管理员帐号"
  },
  password: {
    type: Sequelize.STRING(63),
    allowNull: false,
    comment: "管理员密码"
  },
  avatar: {
    type: Sequelize.STRING(255), 
    comment: "管理员头像"
  },
  add_time: {
    type: Sequelize.DATE,
    comment: "创建时间"
  },
  update_time: {
    type: Sequelize.DATE,
    comment: "更新时间"
  }
},{comment:"管理员表"})

//有就不变 没有就新建 // 创建表并且返回一个 Promise 对象 可在db文件全局配置
// 默认情况下 forse = false
model.sync();

//先销毁后创建
// model.sync({
//     force: true
// });

module.exports = model;
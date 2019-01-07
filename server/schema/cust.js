const Sequelize = require('sequelize');
const db = require('../config/db.js' )

const model = db.define('koa_cust', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "自增id"
  },
  mobile: {
    type:Sequelize.STRING(11),
    allowNull: false,
    comment: "用户手机号码"
  },
  username: {
    type: Sequelize.STRING(63),
    allowNull: false,
    comment: "用户名称"
  },
  password: {
    type: Sequelize.STRING(63),
    comment: "用户密码"
  },
  gender: {
    type: Sequelize.TINYINT(3),
    comment: "性别：0 未知， 1男， 1 女"
  },
  avatar: {
    type: Sequelize.STRING(255), 
    comment: "用户头像图片"
  },
  address: {
    type: Sequelize.INTEGER(126),
    allowNull: false,
    comment: "具体收货地址"
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
},{
    indexes: [{
      //普通索引,默认BTREE
      name: "pwd",
      unique: true,
      fields: ['password']
    }],
    comment: "用户表"
  }
);

//有就不变 没有就新建 // 创建表并且返回一个 Promise 对象 可在db文件全局配置
// 默认情况下 forse = false
model.sync();

//先销毁后创建
// model.sync({
//     force: true
// });

module.exports = model;
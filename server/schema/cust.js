module.exports = function(sequelize, DataTypes) {
  return sequelize.define('koa_cust', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "自增id"
    },
    mobile: {
      type:DataTypes.STRING(11),
      allowNull: false,
      comment: "用户手机号码"
    },
    username: {
      type: DataTypes.STRING(63),
      allowNull: false,
      comment: "用户名称"
    },
    password: {
      type: DataTypes.STRING(63),
      comment: "用户密码"
    },
    gender: {
      type: DataTypes.TINYINT(3),
      comment: "性别：0 未知， 1男， 1 女"
    },
    avatar: {
      type: DataTypes.STRING(255), 
      comment: "用户头像图片"
    },
    address: {
      type: DataTypes.INTEGER(126),
      allowNull: false,
      comment: "具体收货地址"
    },
    add_time: {
      type: DataTypes.DATE,
      comment: "创建时间"
    },
    update_time: {
      type: DataTypes.DATE,
      comment: "更新时间"
    },
    deleted: {
      type: DataTypes.TINYINT(1),
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
  })
}
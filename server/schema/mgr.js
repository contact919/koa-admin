module.exports = function(sequelize, DataTypes) {
  return sequelize.define('koa_mgr', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "自增id"
    },
    username: {
      type: DataTypes.STRING(63),
      allowNull: false,
      comment: "管理员帐号"
    },
    password: {
      type: DataTypes.STRING(127),
      allowNull: false,
      comment: "管理员密码"
    },
    avatar: {
      type: DataTypes.STRING(255), 
      comment: "管理员头像"
    },
    add_time: {
      type: DataTypes.DATE,
      comment: "创建时间"
    },
    update_time: {
      type: DataTypes.DATE,
      comment: "更新时间"
    }
  },{comment:"管理员表"})
}
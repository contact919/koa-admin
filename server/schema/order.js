module.exports = function(sequelize, DataTypes) {
  return sequelize.define('koa_order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "自增id"
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "用户表的用户ID"
    },
    order_sn: {
      type: DataTypes.STRING(63),
      allowNull: false,
      comment: "订单编号"
    },
    order_status: {
      type: DataTypes.SMALLINT(6),
      allowNull: false,
      comment: "订单状态"
    },
    order_price: {
      type: DataTypes.DECIMAL(10), 
      comment: "订单费用"
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
  }, { comment: "订单表" })
}
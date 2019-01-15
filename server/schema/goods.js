module.exports = function(sequelize, DataTypes) {
  return sequelize.define('koa_goods', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "自增id"
    },
    goods_sn: {
      type:DataTypes.STRING(63),
      allowNull: false,
      comment: "商品编号"
    },
    name: {
      type: DataTypes.STRING(127), //长度最大10的字符串
      comment: "商品名称"
    },
    category_id: {
      type: DataTypes.INTEGER(11), 
      comment: "商品所属类目ID"
    },
    brand_id: {
      type: DataTypes.INTEGER(11),
    },
    gallery: {
      type: DataTypes.STRING(10230),
      comment: "商品宣传图片列表，采用JSON数组格式"
    },
    keywords: {
      type: DataTypes.INTEGER(255),
      comment: "商品关键字，采用逗号间隔"
    },
    brief: {
      type: DataTypes.STRING(255),
      comment: "商品简介"
    },
    is_on_sale: {
      type: DataTypes.TINYINT(1),
      comment: "是否上架"
    },
    sort_order: {
      type: DataTypes.SMALLINT(4),
    },
    pic_url: {
      type: DataTypes.STRING(255),
      comment: "商品页面商品图片"
    },
    share_url: {
      type: DataTypes.STRING(255),
      comment: "商品分享朋友圈图片"
    },
    share_url: {
      type: DataTypes.STRING(255),
      comment: "商品分享朋友圈图片"
    },
    is_new: {
      type: DataTypes.TINYINT(1),
      comment: "是否新品首发，如果设置则可以在新品首发页面展示"
    },
    is_hot: {
      type: DataTypes.TINYINT(1),
      comment: "是否人气推荐，如果设置则可以在人气推荐页面展示"
    },
    share_url: {
      type: DataTypes.STRING(255),
      comment: "商品分享朋友圈图片"
    },
    unit: {
      type: DataTypes.STRING(31),
      comment: "商品单位，例如件、盒"
    },
    counter_price: {
      type: DataTypes.DECIMAL(10),
      comment: "专柜价格"
    },
    retail_price: {
      type: DataTypes.DECIMAL(10),
      comment: "零售价格"
    },
    detail: {
      type: DataTypes.TEXT,
      comment: "商品详细介绍，是富文本格式"
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
      unique: true,
      fields: ['goods_sn','category_id','brand_id','sort_order']
    }],
    comment: "商品基本信息表"
  })
}
const Sequelize =require('sequelize')

const mysqlconnection = new Sequelize('koa-admin', 'root', 'root1234',  {
  host: '127.0.0.1',    //数据库地址,默认本机
  port:'3306',
  dialect: 'mysql',
  operatorsAliases: 0,  //不允许使用别名
  timezone: "+08:00",  //nodejs中json序列化Date类型时，默认转为UTC格式 不带时区，数据库里的时区是中国标准时 直接过去会少8小时
  pool: {   //连接池设置
    max: 5, //最大连接数
    min: 0, //最小连接数
    idle: 10000
  },
  // 数据库默认参数,全局参数
  define:{
    // 如果为 true 则表的名称和 model 相同、为 false MySQL创建的表名称会是复数 后面多一个s、如果指定的表名称本就是复数形式则不变
    freezeTableName: true,
    timestamps: false //数据库表中可以没有 createdAt、updatedAt 这2个字段。
  }
 });

module.exports = mysqlconnection
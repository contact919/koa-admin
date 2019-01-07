// const Sequelize =require('sequelize')
// const Op = Sequelize.Op     //使用没有别名的 Sequelize 可以提高安全性
const model = require('../schema/login.js')
const createToken = require('../config/createToken')

const query = async function (obj) {
  const dbUser = await model.find({
      where: {
          username: obj.name
      }
  })
  if (!dbUser) {
    return {
      code: -10,
      msg: "帐号不存在"
    }
  }   

  const dbLogin = await model.find({
      where: {
          username: obj.name,
          password: obj.passwd
      }
  })   
  if (!dbLogin) {
    return {
      code: -11,
      msg: "密码错误"
    }
  }else{
    let tk = createToken({ user: dbLogin.username, id: dbLogin.id })  //token中要携带的(jwt payload属性)信息
    return {
      tk,
      code: 11,
      msg: "登录成功"
    }
  }  
}
  
module.exports = {
    query
}

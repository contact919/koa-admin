// const Sequelize =require('sequelize')
// const Op = Sequelize.Op     //使用没有别名的 Sequelize 可以提高安全性
const model = require('../schema/mgr.js')
const createToken = require('../config/createToken')
const jwt = require('jsonwebtoken')

const login = async function (obj) {
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
      },
      attributes: { exclude: ['password', 'add_time', 'update_time'] }
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
      msg: "登录成功",
      mgr: dbLogin
    }
  }  
}

const info = async function (obj) {
  let token =  jwt.decode(obj.token, 'runner2019')  //解密token 获取管理员id
  const dbInfo = await model.find({
      where: {
          id: token.id
      },
      attributes: { exclude: ['password'] }
  })

  return dbInfo
}

const changePwd = async function (obj) {
  const user = await model.find({
      where: {
          id: obj.id,
          password: obj.oldPassword
      }
  })

  if(!user) {    //先验证原密码
      return {
        code: -18,
        msg: "原密码错误"
      }
  }else {       //更新密码
      const now = Date.now();
      const upInfo = await model.update({
        password: obj.newPassword,
        update_time: now
      },{
          where:{
            id: obj.id
          }
      })  

      return
  }  
}
  
module.exports = {
    login,
    info,
    changePwd
}

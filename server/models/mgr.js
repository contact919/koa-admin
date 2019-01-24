const db = require('../config/db.js' )
const model = db.import('../schema/mgr.js')
model.sync()
const fs = require('fs')
const bcrypt = require('bcryptjs')
const createToken = require('../config/createToken')

const login = async function (obj) {
  const dbUser = await model.find({
      where: {
          username: obj.name
      },
      attributes: { exclude: ['add_time', 'update_time'] }
  })
  if (!dbUser) {
    return {
      code: -10,
      msg: "帐号不存在"
    }
  }   

  if (!bcrypt.compareSync(obj.passwd, dbUser.password)) {
    return {
      code: -11,
      msg: "密码错误"
    }
  }else{
    let tk = createToken({ user: dbUser.username, id: dbUser.id })  //token中要携带的(jwt payload属性)信息
    return {
      tk,
      code: 11,
      msg: "登录成功",
      mgr: dbUser
    }
  }  
}

const setPwd = async function (obj) {
  const info = await model.find({
      where: {
          id: obj.id
      }
  })
  if (!bcrypt.compareSync(obj.oldPassword, info.password)) {  
      return {
        code: -18,
        msg: "原密码错误"
      }
  }else {       //更新密码
      const now = Date.now();
      const salt = bcrypt.genSaltSync(12);    //定义密码加密的计算强度,默认10
      const hash = bcrypt.hashSync(obj.newPassword, salt); 
      await model.update({
        password: hash,
        update_time: now
      },{
          where:{
            id: obj.id
          }
      })  

      return
  }  
}

const setAvatar = async function (obj) {
  // 删除原头像
  const org = await model.find({
    where:{
      id: obj.id
    }
  })
  await fs.unlink('static'+org['avatar'].substring(21), (err) => {
    if (err) console.log(err)
  })
  // 更新头像
  const now = Date.now()
  const upAvatar = await model.update({
    avatar: obj.avatar,
    update_time: now
  },{
      where:{
        id: obj.id
      }
  })

  return
}
  
module.exports = {
    login,
    setPwd,
    setAvatar
}

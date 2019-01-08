const jwt = require('jsonwebtoken')

module.exports = function(userinfo) {
    const token = jwt.sign({
      user: userinfo.user,
      id: userinfo.id         //将id作为JWT Payload的一个属性
    }, 'runner2019', {expiresIn: '3000s'})

    return token
}
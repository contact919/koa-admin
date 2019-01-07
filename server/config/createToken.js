const jwt = require('jsonwebtoken')

module.exports = function(userinfo) {
    const token = jwt.sign({
      user: userinfo.user,
      id: userinfo.id         //将id作为JWT Payload的一个属性
    }, 'sinner77', {expiresIn: '300s'})

    return token
}
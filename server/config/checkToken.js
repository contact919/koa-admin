const jwt = require('jsonwebtoken')
/**
 * jwt.decode(token, 'xxx') 只是把信息解密出来，然后再验证是否还在有效期以内
 * 但是这个'xxx'的参数是无效的，直接使用jwt.decode(token)或者jwt.decode(token, 'xxx')
 * 解密出来的信息都是一致的，相当于没有对这个token是否合法进行验证！！！ 应使用jwt.verify
 */

module.exports = async function (ctx, next) {
  if(ctx.request.header['authorization']) {
    let token = ctx.request.header['authorization'].split(' ')[1]
    console.log(jwt.decode(token, 'sinner77'))
    try {
        tokenContent = await jwt.verify(token, 'sinner77');     //如果token过期或验证失败，将抛出错误
        await next()
    } catch (err) {
      ctx.status = 401
      ctx.body = {
        code: 401,
        msg: "token verify false"
      }
    }
  }else{
    ctx.throw(401, 'no token detected in http header "Authorization"')
  }
}
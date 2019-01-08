const mgr = require('../controllers/mgr')  //登录 改密 个人设置
const goods = require('../controllers/goods')  //商品管理
const order = require('../controllers/order')  //订单管理
const cust = require('../controllers/cust')  //用户管理
const upload = require('../config/upload')
const checkToken = require('../config/checkToken')
const koaRouter = require('koa-router')
const router = new koaRouter()

router.post('/Mgr/loginByUsername', mgr.loginByUsername)
router.get('/Mgr/info', checkToken, mgr.info)
router.post('/Mgr/changePwd', checkToken, mgr.changePwd)
router.post('/Goods/goodsList', checkToken, goods.goodsList)
router.post('/Goods/goodsCreate', checkToken, goods.goodsCreate)
router.post('/Goods/goodsDelete', checkToken, goods.goodsDelete)
router.post('/Goods/goodsEdit', checkToken, goods.goodsEdit)
router.post('/Goods/goodsUpdate', checkToken, goods.goodsUpdate)

router.post('/Order/orderList', checkToken, order.orderList)
router.post('/Cust/custList', checkToken, cust.custList)

router.post('/UploadPic', upload.single('file'), async (ctx) => {
  try {
    ctx.body = {
      code: 200,
      file: ctx.origin + '/uploads/' + ctx.req.file.filename,  //使用koa-static中间件响应资源 返回路径。 path不能用 因为它在linux 上和 windows 是不同的
    }
  } catch (error) {
      console.log('图片上传失败'+error)
  }
  
})


//导出router实例对象 
module.exports = router
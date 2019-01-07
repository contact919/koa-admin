const Koa = require('koa')
const app = new Koa()
const koaBodyparser = require('koa-bodyparser')
const router = require('./server/routes/index.js')
const cors = require('koa2-cors');
const static = require('koa-static')
const path = require('path')           //路径管理

// 静态资源目录对于相对入口文件app.js的路径
const staticPath = './static'
app.use(static(path.join( __dirname, staticPath)))
app.use(cors());
app.use(koaBodyparser())
app.use(router.routes()).use(router.allowedMethods())

app.on('error', function (err, ctx) {
  console.log('server error', err)
})

app.listen(3000, () => {
  console.log(`Koa is listening in 3000`)
})

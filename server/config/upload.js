/**
 * koa-multer文件上传
 */
const multer = require("koa-multer")

const storage = multer.diskStorage({
  destination:'static/uploads/',
  filename(ctx, file, cb) {
      const filenameArr = file.originalname.split('.');
      cb(null, Date.now()+ '.' +filenameArr[filenameArr.length-1])
  }
})
const upload = multer({ storage })

module.exports = upload
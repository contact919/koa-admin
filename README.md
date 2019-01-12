# koa-admin

## 技术栈
> 1. 前端vue
> 2. 后端koa2
> 3. mysql

## 快速启动
1. 安装最小运行环境
    * [Nodejs](https://nodejs.org/en/download/)
    * [MySQL](https://dev.mysql.com/downloads/mysql/)
2. 数据库导入serve文件夹下的koa-admin.sql文件。
    * 注意要先建一个名字叫koa-admin的数据库，在这个数据库下面执行该sql文件
    * 更改server->config目录下的db.js文件，现在数据库帐号密码用的是root，root1234.把它改为你本地mysql的帐号密码
3. 启动管理后台的前后端服务
    打开命令行，输入以下命令
    ```
    cd koa-admin
    npm install
    node app
    npm run serve
    ```
    OK，一切就绪！打开浏览器，输入网址`http://localhost:8080`, 进入页面。


### 主要技术说明
- 搭建koa2环境 配置app.js,配置sequelize; 搭建前端服务 配置vue.config.js以及环境变量
- 前端使用了cli的3.0版本，相关配置和2.x存在一些区别。身份认证使用了token，请求统一做了错误处理，在全局守卫做了路由的统一处理。node后端方面使用了koa-bodyparser解析上下文，它无法解析图片，使用了koa-multer处理图片上传。其他点包括跨域处理，koa-static静态资源加载，jwt token身份认证等。

##### 图片上传
- koa-bodyparser 无法解析文件 使用了koa-multer处理图片上传 在routers文件下做了相关配置
- 单个图片上传成功后服务器会返回该图片的路径 ，使用koa-static中间件 访问web服务器静态资源，前端直接显示该图片 
- 画廊图片上传只把图片路径发送给了后台，上传成功后的预览不需要后台再返回图片路径 看图片url应该是基于基于Blob的分片上传


##### mysql
> mysql8以上版本默认使用caching_sha2_password加密方式 node暂时不支持，需要把加密方式改为mysql_native_password。否则node服务会报错

> nodejs中json序列化Date类型时，默认转为UTC格式 不带时区，数据库里的时区是中国标准时 直接过去会少8小时。配置timezone: "+08:00"

##### svg-sprite-loader
> 用来根据导入的 svg 文件自动生成 symbol 标签并插入 html，接下来就可以在模版中方便地使用 svg-sprite 技术了

1. 封装全局icon组件
2. webpack 配置,在Vue.config.js加入处理 svg 的 loader
3. 实现自动导入

#### others
- node10环境下可能需要更新node-sass依赖 删除package-lock，然后npm rebuild node-sass OR 更改node-sass版本号 然后重新install
- node新版本加入了npm检查 可能某些包需要手动修复

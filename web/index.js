const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const views = require('koa-views')
const statics = require('koa-static')
const Router = require('koa-router')
const ViewConfig = require('./config/view')
const errorFunc = require('./config/error')
const logger = require('./config/logger')
const port = require('./config/port')
const index = require('./router/index')
const router = new Router

/*
  1. 程序启动 从 app = new Koa() 到 app.listen() 。 这时候程序开始监听指定端口
  2. app.use 里面都是装载中间件。 使用的函数都是异步的。可以看logger ／ errorFunc。
  中间件的意义：
    1. 当请求发起的时候，程序会接受到请求。这个请求信息，会向一条河流一样流过程序的所有中间件。
    目前这个程序的请求信息流流向
    -> logger -> bodyParser() -> errorFunc -> statics(ViewConfig.static) -> views(ViewConfig.view, { extension: 'ejs' })
    最后到达路由处理那里（也是一个特殊的中间件）

    2. 每个中间件都会接收到这么两个参数：ctx, next。
    ctx：包含了请求对象和响应对象
    next： 下一个中间件的执行体
 */
const app = new Koa()
// 日志打印
app.use(logger)
// 配置错误处理
app.use(errorFunc)
// 配置body解析器：支持json和form表单
app.use(bodyParser())
// 配置静态文件路径
app.use(statics(ViewConfig.static))
// 配置模版文件:EJS
app.use(views(ViewConfig.view, { extension: 'ejs' }))
// 配置路由
router.use('/', index.routes(), index.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())
// 处理错误
app.on('error', (err)=>{
  console.log(err)
})
app.listen(process.env.PORT || port)

const Koa = require('Koa')
const bodyParser = require('bodyParser')
const views = require('views')
const statics = require('statics')
const ViewConfig = require('ViewConfig')
const errorFunc = require('errorFunc')
const redisCache = require('redisCache')
const index = require('index')
const Router = require('Router')
const redisCacheFLAG = "sanyue"
const router = new Router
const port = 3000

const app = new Koa()
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// 配置body解析器：支持json和form表单
app.use(bodyParser())
// 配置错误处理
app.use(errorFunc)
// redis 缓存
app.use(redisCache(redisCacheFLAG))
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

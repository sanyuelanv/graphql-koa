import Koa from "koa";
import bodyParser from 'koa-bodyparser';
import views from 'koa-views';
import statics from 'koa-static';
import session from 'koa-session';
import csrf from 'koa-csrf';
import sessionConfig from './config/session';
import ViewConfig from './config/view';
import errorFunc from './func/error';
import redisCache from './func/redis'
import index from './router/index';
import Router from "koa-router";
const router = new Router

const app = new Koa();
const port = 3000;
// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 配置session:在配置文件可以改造使用redis还是本地内存
app.keys = ["sanyue","csrfSanyue"]
app.use(session(sessionConfig, app));
// 配置body解析器：支持json和form表单
app.use(bodyParser());
// CSRF
app.use(new csrf({
  invalidSessionSecretMessage: 'Invalid session secret',
  invalidSessionSecretStatusCode: 403,
  invalidTokenMessage: 'Invalid CSRF token',
  invalidTokenStatusCode: 403,
  excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
  disableQuery: false
}));
// 配置错误处理
app.use(errorFunc);
// redis 缓存
app.use(redisCache('sanyue'));
// 配置静态文件路径
app.use(statics(ViewConfig.static))
// 配置模版文件
app.use(views(ViewConfig.view, { extension: 'ejs' }));
// 配置路由
router.use('/', index.routes(), index.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());
// 处理错误
app.on('error', (err)=>{
  console.log(err);
});


app.listen(process.env.PORT || port);

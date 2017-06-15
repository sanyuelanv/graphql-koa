'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaViews = require('koa-views');

var _koaViews2 = _interopRequireDefault(_koaViews);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaSession = require('koa-session');

var _koaSession2 = _interopRequireDefault(_koaSession);

var _koaCsrf = require('koa-csrf');

var _koaCsrf2 = _interopRequireDefault(_koaCsrf);

var _session = require('./config/session');

var _session2 = _interopRequireDefault(_session);

var _view = require('./config/view');

var _view2 = _interopRequireDefault(_view);

var _error = require('./func/error');

var _error2 = _interopRequireDefault(_error);

var _redis = require('./func/redis');

var _redis2 = _interopRequireDefault(_redis);

var _index = require('./router/index');

var _index2 = _interopRequireDefault(_index);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter2.default();

const app = new _koa2.default();
const port = 3000;
// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 配置session:在配置文件可以改造使用redis还是本地内存
app.keys = ["sanyue", "csrfSanyue"];
app.use((0, _koaSession2.default)(_session2.default, app));
// 配置body解析器：支持json和form表单
app.use((0, _koaBodyparser2.default)());
// CSRF
app.use(new _koaCsrf2.default({
  invalidSessionSecretMessage: 'Invalid session secret',
  invalidSessionSecretStatusCode: 403,
  invalidTokenMessage: 'Invalid CSRF token',
  invalidTokenStatusCode: 403,
  excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
  disableQuery: false
}));
// 配置错误处理
app.use(_error2.default);
// redis 缓存
app.use((0, _redis2.default)('sanyue'));
// 配置静态文件路径
app.use((0, _koaStatic2.default)(_view2.default.static)
// 配置模版文件
);app.use((0, _koaViews2.default)(_view2.default.view, { extension: 'ejs' }));
// 配置路由
router.use('/', _index2.default.routes(), _index2.default.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());
// 处理错误
app.on('error', err => {
  console.log(err);
});

app.listen(process.env.PORT || port);
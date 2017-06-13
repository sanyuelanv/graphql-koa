'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaViews = require('koa-views');

var _koaViews2 = _interopRequireDefault(_koaViews);

var _koaCsrf = require('koa-csrf');

var _koaCsrf2 = _interopRequireDefault(_koaCsrf);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaSession = require('koa-session');

var _koaSession2 = _interopRequireDefault(_koaSession);

var _session = require('./config/session');

var _session2 = _interopRequireDefault(_session);

var _view = require('./config/view');

var _view2 = _interopRequireDefault(_view);

var _error = require('./func/error');

var _error2 = _interopRequireDefault(_error);

var _redis = require('./func/redis');

var _redis2 = _interopRequireDefault(_redis);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default();
// 配置session:在配置文件可以改造使用redis还是本地内存
app.keys = ["sanyue", "csrfSanyue"];
app.use((0, _koaSession2.default)(_session2.default, app));
// 配置body解析器：支持json和form表单
app.use((0, _koaBodyparser2.default)());
// 配置错误处理
app.use(_error2.default);
// csrf
app.use(new _koaCsrf2.default());
// redis 缓存
app.use((0, _redis2.default)('sanyue'));
// 配置静态文件路径
app.use((0, _koaStatic2.default)(_view2.default.static)
// 配置模版文件
);app.use((0, _koaViews2.default)(_view2.default.view, { extension: 'ejs' }));
// 配置路由
app.use(_router2.default.routes()).use(_router2.default.allowedMethods());

app.listen(3000);
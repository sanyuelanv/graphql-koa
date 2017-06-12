'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redis = require('./redis');

var _redis2 = _interopRequireDefault(_redis);

var _koaRedis = require('koa-redis');

var _koaRedis2 = _interopRequireDefault(_koaRedis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Store = (0, _koaRedis2.default)({ redisConfig: _redis2.default });
const sessionConfig = {
  key: 'sanyue',
  maxAge: 86400000, // one day
  store: Store,
  overwrite: true,
  httpOnly: false,
  signed: true
};
exports.default = sessionConfig;
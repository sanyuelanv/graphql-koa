'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _coRedis = require('co-redis');

var _coRedis2 = _interopRequireDefault(_coRedis);

var _redis3 = require('../config/redis');

var _redis4 = _interopRequireDefault(_redis3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const redisCache = (prefix, expire = 86400) => {
  // expire = expire || 86400;
  _redis4.default.expire = expire;
  let redisAvailable = false;

  const redisClient = (0, _coRedis2.default)(_redis2.default.createClient(_redis4.default));
  redisClient.on('error', err => {
    redisAvailable = false;
  });
  redisClient.on('end', () => {
    redisAvailable = false;
  });
  redisClient.on('connect', () => {
    redisAvailable = true;
  });

  const setCache = async (key, value, option = {}) => {
    if (!redisAvailable) {
      return;
    }
    if (value === null) {
      return;
    }
    const ttl = option.expire || expire;
    await redisClient.setex(`${prefix}${key}`, ttl, JSON.stringify(value));
  };
  const getCache = async key => {
    if (!redisAvailable) {
      return;
    }
    const data = await redisClient.get(`${prefix}${key}`);
    if (!data) {
      return null;
    }
    return JSON.parse(data.toString());
  };
  const removeCache = async key => {
    if (!redisAvailable) {
      return;
    }
    await redisClient.del(`${prefix}${key}`);
  };
  const cacheMiddleware = async function (ctx, next) {
    ctx.cache = {
      get: getCache,
      set: setCache,
      del: removeCache
    };
    await next();
  };

  return cacheMiddleware;
};

exports.default = redisCache;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _coRedis = require('co-redis');

var _coRedis2 = _interopRequireDefault(_coRedis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const redisCache = (redisUrl, options = {}) => {
  const prefix = options.prefix || 'hawkeye-cache:';
  const expire = options.expire || 86400; // one day

  let redisAvailable = false;

  const redisClient = (0, _coRedis2.default)(_redis2.default.createClient(redisUrl, {
    prefix,
    parser: 'hiredis'
  }));
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
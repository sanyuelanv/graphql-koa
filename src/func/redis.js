import Redis from 'redis';
import wrapper from 'co-redis';
import redisConfig from '../config/redis';

const redisCache = (prefix,expire = 86400) => {
  // expire = expire || 86400;
  redisConfig.expire = expire
  let redisAvailable = false;

  const redisClient = wrapper(Redis.createClient(redisConfig));
  redisClient.on('error', (err) => {redisAvailable = false;});
  redisClient.on('end', () => {redisAvailable = false;});
  redisClient.on('connect', () => {redisAvailable = true;});

  const setCache = async(key, value, option = {}) => {
    if (!redisAvailable) {return;}
    if (value === null) {return;}
    const ttl = option.expire || expire;
    await redisClient.setex(`${prefix}${key}`, ttl, JSON.stringify(value));
  };
  const getCache = async(key) => {
    if (!redisAvailable) {return;}
    const data = await redisClient.get(`${prefix}${key}`);
    if (!data) {return null;}
    return JSON.parse(data.toString())
  };
  const removeCache = async(key) => {
    if (!redisAvailable) {return;}
    await redisClient.del(`${prefix}${key}`);
  };
  const cacheMiddleware = async function(ctx, next) {
    ctx.cache = {
      get: getCache,
      set: setCache,
      del: removeCache
    };
    await next();
  };

  return cacheMiddleware;
};

export default redisCache;

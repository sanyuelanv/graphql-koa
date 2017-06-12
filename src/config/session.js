import redisConfig from './redis';
import redisStore from 'koa-redis';
const Store = redisStore({redisConfig});
const sessionConfig = {
  key: 'sanyue',
  maxAge: 86400000,// one day
  store:Store,
  overwrite: true,
  httpOnly: false,
  signed: true,
}
export default sessionConfig;

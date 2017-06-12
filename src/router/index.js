const Router = require('koa-router');
const router = new Router();
const {Home} = require('../controller');

router.get('/', Home.home);
router.get('/list', Home.data);
router.post('/post', Home.post);

module.exports = router;

import Router from "koa-router";
const router = new Router();
const {Home} = require('../controller');

router.get('/', Home.home);
router.get('list', Home.list);
router.post('post', Home.post);

module.exports = router;

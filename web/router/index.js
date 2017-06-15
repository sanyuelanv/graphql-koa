'use strict';

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter2.default();
const { Home } = require('../controller');

router.get('/', Home.home);
router.get('list', Home.list);
router.post('post', Home.post);

module.exports = router;
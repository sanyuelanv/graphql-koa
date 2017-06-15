'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../model/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let User = {
  home: async ctx => {
    let _token = ctx.cookies.get('_token');
    let views = ctx.session.views || 0;
    ctx.session.views = ++views;

    let res = await ctx.cache.set('token', 456);
    let value = await ctx.cache.get('token');

    if (!_token) {
      ctx.cookies.set('_token', '12345', {
        maxAge: 10 * 60 * 1000, // cookie有效时长
        expires: new Date('2017-02-15'), // cookie失效时间
        httpOnly: false // 是否只用于http请求中获取
      });
    }
    await ctx.render('index', { title: views });
  },
  list: async ctx => {
    const { query } = ctx.request;
    let name = query.name;
    // let tagList = await Tag.findAll({
    //   attributes:['name','tagnumber']
    // })
    // let tagArr = tagList.map((item,index)=>{
    //   return item.get()
    // })
    // console.log(tagArr);
    const data = {
      state: 200,
      data: [{ id: 1, name: name }, { id: 2, name: name }, { id: 3, name: name }]
    };
    ctx.body = JSON.stringify(data);
  },
  post: async ctx => {
    const body = ctx.request.body;
    let name = body.name;
    const data = {
      state: 200,
      data: [{ id: 1, name: name }, { id: 2, name: name }, { id: 3, name: name }]
    };
    ctx.body = JSON.stringify(data);
  }
};
exports.default = User;
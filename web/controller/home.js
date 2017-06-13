'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
let User = {
  home: async ctx => {
    let _token = ctx.cookies.get('_token');
    let views = ctx.session.views || 0;
    ctx.session.views = ++views;

    let res = await ctx.cache.set('token', 456);
    let value = await ctx.cache.get('token');
    console.log(value);

    if (!_token) {
      ctx.cookies.set('_token', '12345', {
        maxAge: 10 * 60 * 1000, // cookie有效时长
        expires: new Date('2017-02-15'), // cookie失效时间
        httpOnly: false // 是否只用于http请求中获取
      });
    }
    await ctx.render('index', { title: views });
  },
  data: async ctx => {
    const { query } = ctx.request;
    let name = query.name;
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
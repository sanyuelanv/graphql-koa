const {userModel} = require('../model/user');
let User = {
  home:async (ctx) => {
    let title = "TEST"
    await ctx.render('index', {title:title});
  },
  list:async (ctx) => {
    const {query} = ctx.request
    let name = query.name
    const data = {
      state:200,
      data:[
        {id:1,name:name},
        {id:2,name:name},
        {id:3,name:name},
      ]
    }
    ctx.body = data
  },
  post:async (ctx) => {
    const body = ctx.request.body;
    let name = body.name
    const data = {
      state:200,
      data:[
        {id:1,name:name},
        {id:2,name:name},
        {id:3,name:name},
      ]
    }
    ctx.body = data
  },
}
module.exports = User

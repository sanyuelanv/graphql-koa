let Home = {
  home:async (ctx) => {
    let title = "TEST"
    await ctx.render('index', {title:title});
  },
  list:async (ctx) => {
    const {query} = ctx.request
    let text = query.text
    const data = {
      state:200,
      data:[
        {id:1,text},
        {id:2,text},
        {id:3,text},
      ]
    }
    ctx.body = data
  },
  post:async (ctx) => {
    const {body} = ctx.request;
    let text = body.text
    const data = {
      state:200,
      data:[
        {id:1,text},
        {id:2,text},
        {id:3,text},
      ]
    }
    ctx.body = data
  },
}
module.exports = Home

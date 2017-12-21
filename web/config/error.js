let errorFunc = async (ctx,next)=>{
  if(ctx.url == '/'){
    console.log("-----------执行错误信息中间件");
  }
  try {
    await next();
    const status = ctx.status || 404;
    if (status === 404) {
      ctx.body = { message: status };
    }
  } catch (e) {
    console.log(e);
    ctx.status = e.status || 500;
    ctx.body = { message: e.status };
  }
};
module.exports = errorFunc

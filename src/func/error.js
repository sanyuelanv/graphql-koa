let errorFunc = async (ctx,next)=>{
  try {
    await next();
    const status = ctx.status || 404;
    if (status === 404) {
      ctx.body = { message: status };
    }
  } catch (e) {
    ctx.status = e.status || 500;
    ctx.body = { message: e.message };
  }
};
export default errorFunc;

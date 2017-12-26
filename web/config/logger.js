let logger = async (ctx, next) => {
  const start = new Date()
  await next()
  if(ctx.url == '/'){
    console.log("-----------执行打印信息中间件2");
  }
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
}

module.exports = logger

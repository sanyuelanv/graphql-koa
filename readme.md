# koa2 服务器配置  

1. 全面使用ES6语法： 主要是import/export : 配置了babel的transform-es2015-modules-commonjs   
2. 使用```koa-router```路由处理
3. 使用自己写的错误处理函数去统一处理所有路由的错误信息。
4. ```koa-bodyparser```处理```post```请求的类型
5. 模版文件：ejs-按照官网例子进行配置
6. 静态文件处理／上线之后应该交由CDN去处理
7. cookieParser配置(ctx自带的:npm的cookies模块) / session配置( koa-session / redis)
8. mysql/redis/mongdb配置
9. 配置bin/www文件
10. favicon

# todo  

1.

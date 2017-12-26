```
├── package.json
├── readme.md
├── static //静态文件
│   └── css
│       └── app.css
├── views   // 视图模版
│   └── index.ejs
└── web  //后端逻辑
    ├── config   //各种配置
    │   ├── error.js  配置错误打印
    │   ├── logger.js 配置logger信息
    │   ├── port.js   配置端口
    │   └── view.js   配置view 模版 / static 静态文件
    ├── controller  //控制器：处理请求的
    │   ├── home.js
    │   └── index.js
    ├── index.js  //程序入口
    └── router  // 路由
        └── index.js
```

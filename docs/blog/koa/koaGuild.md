### 一、快速搭建一个koa项目  
***
1. 检查Node版本，至少在7.6.0以上。  
2. 使用快速搭建工具 `npm install koa-generator -g`  
3. 生成项目 `koa2 project-name`  
4. 安装依赖 `npm install`    
5. 运行 `npm start` 打开 http://localhost:3000  
***  
***  
### 二、手动搭建一个koa项目  
***  
1. 检查Node版本，至少在7.6.0以上。
2. 创建并进入项目文件夹，`npm init`, 初始化packjson.js
3. 安装koa`npm install koa --save`
4. 在根目录下创建`app.js`  
   ```
    const Koa = require('koa');
    const app = new Koa();  
    app.use(async ctx => {
    ctx.body = 'Hello koa!';
    });    
    app.listen(3000);
   ```  
5. 在`package.json`添加启动命令`"start": "node app.js"`  
6. `npm run start`启动服务，打开`http://localhost:3000`，这样koa的房产证:house:就拿到啦！下面让我们来开始搬砖建房子:muscle:  
7. 在项目下创建一个存放html文件的目录views，并在该目录下创建一个`index.html`，然后修改`app.js`  
    ```
    // app.js// 原生路由
    const Koa = require('koa');
    const fs = require('fs');
    const app = new Koa(); 
    app.use(async (ctx, next) => {
    if (ctx.request.path === '/index') {
    ctx.type = 'text/html';
    ctx.body = fs.createReadStream('./views/index.html');
    } else {
    await next();
    }
    });
    app.listen(3000);
    ```  
8. 安装路由中间件`npm install koa-router -S`  
9. 新建`routes`目录，用来存放路由文件，并在目录下创建`index.js`
    ```
    // routes/index.js

    const fs = require('fs');
    const router = require('koa-router')()

    router.get('/', async (ctx, next) => {
    ctx.type = 'text/html';
    ctx.body = fs.createReadStream('./views/index.html');
    });

    module.exports = router
    ```  
    这样直接访问页面出来的就是:point_right:view文件夹下index.html的内容了
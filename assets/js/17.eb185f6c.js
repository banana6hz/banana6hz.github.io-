(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{226:function(s,a,e){"use strict";e.r(a);var n=e(0),t=Object(n.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h3",{attrs:{id:"一、快速搭建一个koa项目"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#一、快速搭建一个koa项目"}},[s._v("#")]),s._v(" 一、快速搭建一个koa项目")]),s._v(" "),e("hr"),s._v(" "),e("ol",[e("li",[s._v("检查Node版本，至少在7.6.0以上。")]),s._v(" "),e("li",[s._v("使用快速搭建工具 "),e("code",[s._v("npm install koa-generator -g")])]),s._v(" "),e("li",[s._v("生成项目 "),e("code",[s._v("koa2 project-name")])]),s._v(" "),e("li",[s._v("安装依赖 "),e("code",[s._v("npm install")])]),s._v(" "),e("li",[s._v("运行 "),e("code",[s._v("npm start")]),s._v(" 打开 http://localhost:3000")])]),s._v(" "),e("hr"),s._v(" "),e("hr"),s._v(" "),e("h3",{attrs:{id:"二、手动搭建一个koa项目"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#二、手动搭建一个koa项目"}},[s._v("#")]),s._v(" 二、手动搭建一个koa项目")]),s._v(" "),e("hr"),s._v(" "),e("ol",[e("li",[s._v("检查Node版本，至少在7.6.0以上。")]),s._v(" "),e("li",[s._v("创建并进入项目文件夹，"),e("code",[s._v("npm init")]),s._v(", 初始化packjson.js")]),s._v(" "),e("li",[s._v("安装koa"),e("code",[s._v("npm install koa --save")])]),s._v(" "),e("li",[s._v("在根目录下创建"),e("code",[s._v("app.js")]),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v(" const Koa = require('koa');\n const app = new Koa();  \n app.use(async ctx => {\n ctx.body = 'Hello koa!';\n });    \n app.listen(3000);\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br")])])]),s._v(" "),e("li",[s._v("在"),e("code",[s._v("package.json")]),s._v("添加启动命令"),e("code",[s._v('"start": "node app.js"')])]),s._v(" "),e("li",[e("code",[s._v("npm run start")]),s._v("启动服务，打开"),e("code",[s._v("http://localhost:3000")]),s._v("，这样koa的房产证🏠就拿到啦！下面让我们来开始搬砖建房子💪")]),s._v(" "),e("li",[s._v("在项目下创建一个存放html文件的目录views，并在该目录下创建一个"),e("code",[s._v("index.html")]),s._v("，然后修改"),e("code",[s._v("app.js")]),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("// app.js// 原生路由\nconst Koa = require('koa');\nconst fs = require('fs');\nconst app = new Koa(); \napp.use(async (ctx, next) => {\nif (ctx.request.path === '/index') {\nctx.type = 'text/html';\nctx.body = fs.createReadStream('./views/index.html');\n} else {\nawait next();\n}\n});\napp.listen(3000);\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br")])])]),s._v(" "),e("li",[s._v("安装路由中间件"),e("code",[s._v("npm install koa-router -S")])]),s._v(" "),e("li",[s._v("新建"),e("code",[s._v("routes")]),s._v("目录，用来存放路由文件，并在目录下创建"),e("code",[s._v("index.js")]),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("// routes/index.js\n\nconst fs = require('fs');\nconst router = require('koa-router')()\n\nrouter.get('/', async (ctx, next) => {\nctx.type = 'text/html';\nctx.body = fs.createReadStream('./views/index.html');\n});\n\nmodule.exports = router\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br")])]),s._v("这样直接访问页面出来的就是👉view文件夹下index.html的内容了")]),s._v(" "),e("li",[s._v("安装koa-static，并新建public文件夹存放静态资源，运行"),e("code",[s._v("npm install koa-static -S")]),s._v(",然后在app.js里添加以下代码"),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("const static = require('koa-static')// allowedMethods 用于校验请求的方法，如果用 post 请求访问 get 接口，就会直接返回失败     \nconst main = static(_dirname + '/public')// 将 public 目录设置为静态资源目录      \napp.use(main)\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br")])])]),s._v(" "),e("li",[s._v("安装koa-views "),e("code",[s._v("npm install koa-views -S")]),s._v(",在app.js添加一下代码"),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("const views = require('koa-views')\napp.use(views(_dirname + '/views')\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br")])])]),s._v(" "),e("li",[s._v("然后在路由文件中，就能使用 render 方法了"),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("// routes/index.js\n\nconst router = require('koa-router')()\n\nrouter.get('/index', async (ctx, next) => {\nawait ctx.render('index');\n});\n\nmodule.exports = router\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br")])])])]),s._v(" "),e("p",[s._v("https://www.jb51.net/article/132352.htm")])])}),[],!1,null,null,null);a.default=t.exports}}]);
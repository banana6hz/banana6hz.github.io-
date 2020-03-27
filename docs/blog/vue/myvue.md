## 手动搭建Vue项目
::: tip  
💡 为了能更好的学习和理解Vue以及webpack的配置，所以试一下不用vue-cli,手动搭建一下Vue项目。🙋‍♀️
:::
### 一、初始化项目

👉 新建一个项目文件夹，进入文件夹,运行 `npm init -y` 初始化项目(-y可以直接跳过输入，直接初始化)，初始化成功之后项目会生成package.json文件  

👉 安装 vue和webpack-cli(因为webpack4之后强制要求安装webpack-cli),   然后执行 `npm i webpack-cli vue -D`

👉 安装项目所需要的标配依赖包，运行 `npm i vue-loader css-loader style-loader vue-template-compiler -D`
- vue-loader: 处理.vue文件  
- css-loader: 加载.css文件，处理css中url的路径，解析@import等语句
- style-loader: 用style标签将css-loader解析出来的内部样式注入到我们的HTML页面
- vue-template-compiler: 处理template模板的依赖包

👉 在根目录新建src文件夹（存放项目源代码），在src文件夹创建index.js文件和app.vue文件；在根目录下创建build文件夹(存放webpack配置)，并在文件夹下新建webpack.config.js文件  
项目结构如下：  
::: tip  
    |——build  
    |   |__webpack.config.js  
    |——node_module  
    |——src  
    |   |——app.vue  
    |   |__index.js      
    |——package-lock.json  
    |——package.json  
:::

👉 在index.js和app.vue加入以下代码  
- index.js 
```js
// index.js入口文件
import Vue from 'vue'
import App from './app.vue'

// 创建一个Vue实例App, mount就是讲我们的App挂载到root这样一个根节点中去
new Vue({
    render: (h) =>h(App)
}).$mount('#app')
```

- app.vue  
```js
<template>
    <div>
        <h1 class="txt">{{text}}</h1>
        <div class="play"></div>
        <router-view/>
    </div>
</template>
<script>
export default {
    data(){
        return{
            text:'Hello banana 🍌'
        }
    }
}
</script>
<style>
.txt{color:brown;text-align:center;}
</style>
```

👉 打开webpack.config.js开始进行webpack的基本配置
```js
//webpack.config.js 基本配置
const path = require('path');//nodejs里面的基本包，用来处理路径
const { VueLoaderPlugin } = require('vue-loader');//或者const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    // 入口文件
    entry: path.join(__dirname,'../src/index.js'),
    // 出口文件
    output:{
        filename: 'boundle.js',
        path: path.join(__dirname,'../dist')
    },
    mode:'none',//none development production
    plugins:[
        new VueLoaderPlugin()// make sure to include the plugin for the magic
    ],
    module:{
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader'//通过vue-loader来识别以vue结尾的文件
            },
            {
                test: /\.css$/,//css的处理方式不同，有嵌入在页面style标签里的，有从外部文件引入的，我们这里用use来声明
                use:[
                    'style-loader',//注意：style-loader要在css-loader前面
                    'css-loader'
                ]
            }
        ]
    }
}
```

👉 在package.json添加打包命令 "biu" 
```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "biu": "webpack --config build/webpack.config.js"
  },
```
这个时候就可以运行`npm run biu`了， biu一下会发现出来了一个dist文件夹，如果boundle.js生成成功就说明打包成功啦🎉

#### 二、实现打包图片和sass、less文件

👉 接下来试着打包一下图片和scss文件（同less文件）。先在src下新建images和styles文件夹。然后加入图片和样式文件，添加成功后的项目结构就像这样：
::: tip  
    |——build  
    |   |__webpack.config.js  
    |——node_module  
    |——src  
    |   |——images
    |   |   |__play.jpg
    |   |——styles
    |   |   |__global.scss
    |   |——app.vue  
    |   |__index.js      
    |——package-lock.json  
    |——package.json  
:::

在index.js添加代码 `import './assets/styles/global.scss'` 引进scss文件

在webpack.config.js添加处理图片和scss（less）文件的loader
```js
    {
        test: /\.scss$/,// 处理顺序是从sass-loader到style-loader
        use:[
            'style-loader',
            'css-loader',
            'sass-loader'
        ]
    },
    {
        test: /\.scss$/,// 处理顺序是从sass-loader到style-loader
        use:[
            'style-loader',
            'css-loader',
            'less-loader'
        ]
    },
    {
        test:/\.(gif|jpg|jpeg|svg)/i,
        use:[{
            loader:'url-loader',
            options:{
                limit:8192,// 当文件大小小于limit byte时会把图片转换为base64编码的dataurl，否则返回普通的图
                name:'../dist/assets/images/[name]-[hash:5].[ext]'// 图片文件名称加上内容哈希
            }
        }]
    }
```

同时不要忘记要install一下`npm i sass-loader node-sass file-loader`(less less-loader),然后biu一下~
- node-sass: sass-loader是对node-sass进行了一个封装，依赖于node-sass,所以要一起安装;
- file-loader: url-loader可以设置limit，当图片大小小于上限值，url-loader可以将图片转base64字符串，能更快的加载图片；一旦图片过大，就需要使用file-loader加载图片，都是为了提高浏览器加载图片速度。同样，url-loader也依赖于file-loader。   

biu~ 成功之后就能在dist下面看到打包出来的图片啦

#### 三、打包 html 文件

👉 添加 html-webpack-plugin，自动生成 index.html 的内容  
修改 webpack.config.js
```js
const { VueLoaderPlugin } = require('vue-loader');//或者const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口文件
    entry: path.join(__dirname,'../src/index.js'),
    // 出口文件
    output:{
        filename: 'boundle.js',
        path: path.join(__dirname,'../dist')
    },
    mode:'none',//none development production
    plugins:[
        new VueLoaderPlugin(),// make sure to include the plugin for the magic
        new HtmlWebpackPlugin({
            filename: 'index.html', // 生成的文件名称
            template: 'index.html', // 指定用index.html做模版
            inject: 'body' // 指定插入的<script>标签在body底部
        })
    ],
```

#### 四、配置本地服务器
👉 添加 webpack-dev-server，配置更友好的开发环境，在本地启动一个服务器  
修改 package.json 里的 scripts,运行 `npm i webpack-dev-server -D` 
```js
"biu": " webpack --config build/webpack.config.js",
"dev": "webpack-dev-server --config build/webpack.config.js"
```
修改 webpack.config.js,添加devServer配置
```js
devServer : {
        // contentBase: path.join(__dirname, 'dist'),
        port: 8000,// 端口
        host: '0.0.0.0', // 配置成0.0.0.0的话通过ip，localhost都能访问
        overlay: {
            errors: true // 如果有编译错误的话直接显示到页面上
        }
    }
```
然后打开 http://0.0.0.0:8000/ 就能看到dist文件夹下面的index.html啦

#### 五、配置router
👉 因为vue是单页面项目，页面之间都是通过路由管理器进行部分页面的显示与刷新（是这样说吗？？？）运行`npm i vue-router -D`,在src文件夹下新建router.js(配置路由页面)，新建components文件夹（放组件）,随便写一个组件，helloworld吧，hellowrold.vue吧,接下来进行router.js的配置
```js
// router.js 配置项目路由
import Vue from 'vue'
import Router from 'vue-router'
import Hello from './components/helloworld.vue'

Vue.use(Router);

export default new Router({
    routes:[
        {
            path: '/',//路径
            name: 'Hello',
            component: Hello
        }
    ]
})
```
在app.vue添加`<router-view/>`
```js
<template>
    <div>
        <h1 class="txt">{{text}}</h1>
        <div class="play"></div>
        <router-view/>
    </div>
</template>
```
然后 `npm run dev` 一下可以在index页面看到helloworld的内容，就说明组件helloworld就挂上去啦  

#### 六、添加 clean-webpack-plugin，每次 build 之前可以自动先清除输出文件夹  
`npm i clean-webpack-plugin --save-dev` ,在webpack.config.js添加如下代码
```js
    //webpack.config.js 基本配置
    const path = require('path');//nodejs里面的基本包，用来处理路径
    const { VueLoaderPlugin } = require('vue-loader');//或者const VueLoaderPlugin = require('vue-loader/lib/plugin');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
  + const { CleanWebpackPlugin } = require("clean-webpack-plugin");


    module.exports = {
        // 入口文件
        entry: path.join(__dirname,'../src/index.js'),
        // 出口文件
        output:{
            filename: 'boundle.js',
            path: path.join(__dirname,'../dist')
        },
        mode:'none',//none development production
        plugins:[
            new VueLoaderPlugin(),// make sure to include the plugin for the magic
            new HtmlWebpackPlugin({
                filename: 'index.html', // 生成的文件名称
                template: 'index.html', // 指定用index.html做模版
                inject: 'body' // 指定插入的<script>标签在body底部
            }),
      +     new CleanWebpackPlugin()
        ],
        module:{
            rules:[
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'//通过vue-loader来识别以vue结尾的文件
                },
                {
                    test: /\.css$/,//css的处理方式不同，有嵌入在页面style标签里的，有从外部文件引入的，我们这里用use来声明
                    use:[
                        'style-loader',//注意：style-loader要在css-loader前面
                        'css-loader'
                    ]
                },
                {
                    test: /\.scss$/,// 处理顺序是从sass-loader到style-loader
                    use:[
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.less$/,// 处理顺序是从sass-loader到style-loader
                    use:[
                        'style-loader',
                        'css-loader',
                        'less-loader'
                    ]
                },
                {
                    test:/\.(gif|jpg|jpeg|svg)/i,
                    use:[{
                        loader:'url-loader',
                        options:{
                            limit:8192,// 当文件大小小于limit byte时会把图片转换为base64编码的dataurl，否则返回普通的图
                            name:'../dist/assets/images/[name]-[hash:5].[ext]'// 图片文件名称加上内容哈希
                        }
                    }]
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/, // 不处理这两个文件夹里的内容
                    loader: 'babel-loader'//转译 es6 代码为 es5 代码
                }
            ]
        },
        devServer : {
            // contentBase: path.join(__dirname, 'dist'),
            port: 8000,
            host: '0.0.0.0', // 配置成0.0.0.0的话通过ip，localhost都能访问
            overlay: {
                errors: true // 如果有编译错误的话直接显示到页面上
            }
        }
    }
```
这个时候发现dev时也把dist文件夹给删掉了，这不是需要的结果，解决办法就是分离开发环境和生产环境。安装一个可以跨平台设置环境和使用环境变量的cross-env,执行`npm i cross-env -D`,在build文件夹新增webpack.dev.conf.js(开发环境配置)、webpack.prod.conf.js(生产环境配置)两个文件,分离之后三个文件的代码如下：
- webpack.base.conf.js
```js
//webpack.config.js 基本配置
const path = require('path');//nodejs里面的基本包，用来处理路径
const { VueLoaderPlugin } = require('vue-loader');//或者const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV=process.env.NODE_ENV;

module.exports = {
    // 入口文件
    entry: path.join(__dirname,'../src/index.js'),
    // 出口文件
    output:{
        filename: 'boundle.js',
        path: path.join(__dirname,'../dist')
    },
    plugins:[
        new VueLoaderPlugin(),// make sure to include the plugin for the magic
        new HtmlWebpackPlugin({
            filename: 'index.html', // 生成的文件名称
            template: 'index.html', // 指定用index.html做模版
            inject: 'body' // 指定插入的<script>标签在body底部
        })
    ],
    module:{
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader'//通过vue-loader来识别以vue结尾的文件
            },
            {
                test: /\.css$/,//css的处理方式不同，有嵌入在页面style标签里的，有从外部文件引入的，我们这里用use来声明
                use:[
                    'style-loader',//注意：style-loader要在css-loader前面
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,// 处理顺序是从sass-loader到style-loader
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.less$/,// 处理顺序是从sass-loader到style-loader
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.(gif|jpg|jpeg|svg)/i,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:8192,// 当文件大小小于limit byte时会把图片转换为base64编码的dataurl，否则返回普通的图
                        name:'../dist/assets/images/[name]-[hash:5].[ext]'// 图片文件名称加上内容哈希
                    }
                }]
            }
        ]
    }
}

```

- webpack.dev.conf.js
```js
//引入webpack-merge插件进行合并
const merge = require('webpack-merge');
//引入webpack.base.conf.js文件
const base = require('./webpack.base.conf');
//引入webpack
const webpack = require('webpack');
//进行合并，将webpack.base.conf.js中的配置合并到这
module.exports = merge(base, {
   //模块参数
    mode: 'development',
    devServer: {
        port: '8000',//端口号
        inline: true,
        historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        hot: true//允许热加载
    },
    plugins: [
       //定义全局变量
        new webpack.DefinePlugin({
         //这里必须要解析成字符串进行判断，不然将会被识别为一个变量
            DEV: JSON.stringify('dev')
        })
    ]
});
```

- webpack.prod.conf.js
```js
const merge = require('webpack-merge');
const base = require('./webpack.base.conf');
const webpack = require('webpack');

const  { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(base, {
    mode: 'production',
    plugins:[
     //使用插件定义全局变量DEV
        new webpack.DefinePlugin({
            DEV:JSON.stringify('production')
        }),
       new CleanWebpackPlugin(),
    ]

});
```

然后记得修改package.json的script标签  
```js
"biu": "cross-env NODE_ENV=production webpack --config build/webpack.prod.conf.js",
"dev": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.dev.conf.js"
```

#### 七、配置bable-loader  
- webpack.config.js 添加module规则
```js
{
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/, // 不处理这两个文件夹里的内容
    loader: 'babel-loader'//转译 es6 代码为 es5 代码
}
```
运行 `npm i babel-loader@7 babel-core babel-preset-env -D`  

- 在根目录下添加.babelrc  
```js
{"presets": [
    ["@babel/preset-env", { "modules": false }]
  ]
}
```

- webpack.base.conf.js
```js
{
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'babel-loader',
        options: {
        presets: ['@babel/preset-env']
        }
    }
}
```
- 在index.js添加测试代码，然后biu一下  
```js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    sayHello() {
        console.log(`Hello, my name is ${this.name}`);
    }
}
const person = new Person("Ben", 28);
person.sayHello();
```








## 手动搭建Vue项目
::: tip  
💡 为了更好的学习和理解Vue的配置，所以试一下不用vue-cli手动搭建一下Vue项目。
:::

👉:one: 新建一个项目文件夹，进入文件夹,运行 `npm init -y` 初始化项目[-y可以直接跳过输入，直接初始化]，初始化成功之后项目会生成package.json文件  

👉:two: 安装 webpack-cli(因为webpack4之后强制要求安装webpack-cli)和vue,   然后执行 `npm i webpack-cli vue -D`

👉:three: 安装项目所需要的标配依赖包，运行 `npm i vue-loader css-loader style-loader vue-template-compiler -D`
- vue-loader: 处理.vue文件  
- css-loader: 加载.css文件，解析@import等语句
- style-loader: 用style标签将css-loader解析出来的内部样式注入到我们的HTML页面
- vue-template-compiler: 处理template模板的依赖包

👉:four: 在根目录新建src文件夹，存放项目源代码，在src文件夹创建index.js文件和app.vue文件；在根目录下创建build文件夹(存放webpack配置)，并在文件夹下新建webpack.config.js文件  
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

👉:five: 在index.js和app.vue加入以下代码  
- index.js 
```js
// index.js入口文件
import Vue from 'vue'
import App from './app.vue'

// 创建一个Vue实例App, mount就是讲我们的App挂载到root这样一个根节点中去
new Vue({
    render: (h) =>h(App)
}).$mount(body)
```

- app.vue  
```js
<template>
    <div>
        <p class="txt">{{text}}</p>
    </div>
</template>
<script>
export default {
    data(){
        return{
            text:'hello banana🍌'
        }
    }
}
</script>
<style>
.txt{color:brown}
</style>
```

👉:six: 打开webpack.config.js开始进行webpack的基本配置
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
                test: /.vue$/,
                loader: 'vue-loader'//通过vue-loader来识别以vue结尾的文件
            },
            {
                test: /.css$/,//css的处理方式不同，有嵌入在页面style标签里的，有从外部文件引入的，我们这里用use来声明
                use:[
                    'style-loader',//注意：style-loader要在css-loader前面
                    'css-loader'
                ]
            }
        ]
    }
}
```

👉:seven: 在package.json添加打包命令 "biu" 
```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "biu": "webpack --config build/webpack.config.js"
  },
```
这个时候就可以运行`npm run biu`了， biu一下会发现出来了一个dist文件夹，如果boundle.js生成成功就说明打包成功啦🎉







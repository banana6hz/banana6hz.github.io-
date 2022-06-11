## :white_medium_square: 1. Webpack 配置中用过哪些 Loader ？都有什么作用？
首先我们要知道为什么需要loader，这是因为webpack默认只能处理js和json文件，当遇到一些比如css这样的文件时，需要先将这些文件进行转化成webpack能识别的文件，这就需要loader来对不同类型的文件进行处理了。
webpack 支持 loader 的链式调用，即一个文件可以经多个 loader 处理。当一个文件使用多个 loader 处理时，他的处理顺序是倒序的，即传入 loader 数组的从右到左执行。
- css-loader ：负责解析css代码, 处理css中的依赖，将多个css文件整合到一起
- style-loader ：将处理好的 css 通过 style 标签的形式添加到页面上。(核心逻辑：通过动态添加 style 标签的方式，将样式引入页面)
- postcss-loader：自动添加 CSS3 部分属性的浏览器前缀（eg:transform: translateX(-50%);，需要加上不同的浏览器前缀)
- less-loader:  处理less文件
- sass-loader：处理sass文件，注意还需要搭配 node-sass
- file-loader：解决图片引入问题，比如background样式用url引入背景图，file-loader可以解析项目中的url引入（不仅限于css），根据我们的配置，将图片拷贝到相应的路径，默认为 dist，再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件
- url-loader：依赖 file-loader，当图片/文字文件小于 limit 值的时候，会将图片转为 base64 编码，大于 limit 值的时候依然是使用 file-loader 进行拷贝（在 webpack5，内置了资源处理模块，file-loader 和 url-loader 都可以不用安装）
- img-loader：压缩图片
- babel-loader： 将ES6转换为了 ES5， 为了避免 webpack.config.js 太臃肿，babeld的配置一般会单独提取到一个文件，在babel的配置文件里面也可以配置一些插件
>在这里补充下babel的其他知识
- @babel/core Babel 编译的核心包
- @babel/preset-env Babel 编译的预设，可以理解为 Babel 插件的超集
```js
// ./babelrc.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        // useBuiltIns: false 默认值，无视浏览器兼容配置，引入所有 polyfill
        // useBuiltIns: entry 根据配置的浏览器兼容，引入浏览器不兼容的 polyfill
        // useBuiltIns: usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加
        useBuiltIns: "entry",
        corejs: "3.9.1", // 是 core-js 版本号
        targets: {
          chrome: "58",
          ie: "11",
        },
      },
    ],
  ],
};
```

>对于正在提案中，还未进入 ECMA 规范中的新特性，Babel 是无法进行处理的，必须要安装对应的插件，并加上插件的配置
- vue-loader: 主要用来处理vue组件文件
- eslint-loade: 将EsLint集成到webpack中
- cache-loader：缓存一些性能开销比较大的 loader 的处理结果，提高构建速度

## 什么是bundle、chunk、module
## webpack的构建流程
## webpack各个loader的作用
- babel-loader：转换ES6代码
- css-loader：
- style-loader：
## webpack打包是如何优化前端性能
- 压缩各类文件
- 
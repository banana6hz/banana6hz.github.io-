<!-- ## 目录  
[HTTP协议](./http)  
[TCP/IP协议](./tcp)  
[输入URL到页面渲染出来，浏览器经历了什么](./url)  
[cookie与session](./session_cookie)   -->

## 浏览器内核有哪些？
目前主流的浏览器有：**Chrom**、**Firefox**、**Safari**、**IE**、**Opera**

浏览器的内核是浏览器的核心，也称“渲染引擎”，它决定了浏览器如何显示网页内容以及页面的格式信息。  

浏览器|内核|JavaSript引擎
:--:|:--:|:--:
Chrome|Blink(28~)<br>Webkit(Chrome 27)|V8
Firefox|Gecko|SpiderMonkey
Safari|Webkit|JavaScriptCore
IE|Trient|Chakra(for JScript)

## 浏览器兼容性问题解决方案
- 样式偏差  
解决办法：CSS使用通配符 `*{margin:0;padding:0}`

### 什么是渐进兼容和优雅降级？
- 渐进兼容：针对低版本浏览器构建页面，保证最基本的功能，然后再针对高级的浏览器进行效果、交互等改进和追加功能达到更好的用户体验。 （从基础到最优）
- 优雅降级：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。（最优然后细节） 

### 常用框架的兼容性
```js
Bootstrap(>=IE8)
jQuery 1.~ (>=IE6), jQuery 2.~ (>=IE9)
Vue(>=IE9)
```

### 常用方法
🌈 **条件注释**（IE10不支持条件注释）  
🌈 **CSS Hack**:点击[CSS hack](https:browserhacks.com) 查 Hack 的写法   
🌈 **JS能力检测**  
🌈 **html5shiv.js**：用于解决IE9以下对HTML5新标签不识别，并导致CSS不起作用短的问题。  
🌈 **Respond.js**：用于为IE6-8以及不支持CSS媒体查询功能的浏览器提供媒体查询的min-width和max-width特性，实现响应式网页设计   
🌈 **CSS Reset**：覆盖浏览器的CSS默认属性  
🌈 **Normalize.css**：一个可以定制的CSS文件，它让不同的浏览器在渲染网页元素的时候形式更统一   
🌈 **Modernizr**：一个 JavaScript 库。用于检测用户浏览器的 HTML5 与 CSS3 特性。  
🌈 **PostCSS**
点击[caniuse.com](https://caniuse.com/)查看属性的兼容性

### 问题集锦

## 如何解决css中margin的重叠问题  
只有普通文档流中块框的垂直边界才会发生边界叠加。行内框、浮动框或绝对定位框之间的边界不会叠加。   
1. 用padding代替margin  
2. 后面的元素用float脱离文本流 `float:left;display:inline;`  
3. 用绝对定位，`position:absolute;` 
4. 中间用一个边框为透明的div占位 `border:1px solid transparent;`
5. 添加 `overflow:hidden;` 的外层父元素  
6. 添加 `padding:1px;` 的外层父元素

## CSS实现水平垂直居中
### 一、内联元素居中布局    
  - **水平居中：**   
    - 行内元素:  
    >`text-align:center`    
  - **垂直居中**   
    - 单行文本父元素确认高度：
    >`line-height:height;`  
    - 多行文本父元素确认高度: 
    >`display:table-cell;vertical-align:center`
     
### 二、块级元素居中布局
  - **水平居中：**   
    - `margin:0 auto`  
    - `margin-left:auto;margin-right:auto`  
  - **垂直居中：**
    - `(父)display:flex;justify-content:center;`
    - `(父)display:flex;(子)margin:auto;;` 
    - `(父)position:relative;(子)position:absolute;margin:auto;`
    - `(父)position:relative;(子)position:absolute;top:50;transform:translateY(-50%);` 
    - 设置inline-block（多个块状元素）
      ```js
      .center{text-align:center;}
      .inlineblock-div{display:inline-block;}
      <div class="center">
        <div class="inlineblock-div">1</div>
        <div class="inlineblock-div">2</div>
      </div>
      ``` 
  [...](https://juejin.im/entry/55a8ce76e4b0c78cf60ac924)

## 清除浮动的方式
浮动的缺点：浮动元素一旦脱离了文档流，就无法撑起父元素，会造成父级元素的高度塌陷。  
**清除浮动**：
- 添加空元素`<div style="clear:both"></div>`
- 父元素设置`overflow:hidden;`
- 添加伪类`.parent:after{content:'';display: block;height:0;visibility:hidden;clear:both;}`

## Sass和Less的相同之处与不同之处？  
**Sass**和**Less**都是CSS的预处理器。  
其基本思想是：用一种专门的编译语言，为CSS增加一些编程的特性，并将CSS作为目标生成文件。  

### 相同之处
- **混入(Mixins)**--class中的class
```js
//Sass
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
.notice {
  background-color: green;
  border: 2px solid #00aa00;
  @include rounded-corners;
}
//Less
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
.post a {
  color: red;
  .bordered();
}
```
- **参数混入**：可以传递参数的class，就像函数一样

- **嵌套规则**
```js
//Sass
#content {
  article {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
  }
}
//Less
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
```
- **运算**：CSS中用上数学,可以编辑颜色。
```js
@color: #224488 / 2; //结果是 #112244
background-color: #112244 + #111; // 结果是 #223355
```
- **作用域**
```js
//Less
@var: red;
#page {
  @var: white;
  #header {
    color: @var; // white
  }
}
```
- **继承**
```js
//Sass
.block {
  margin: 10px 5px;
  padding: 2px;
}
p {
  @extend .block; /* Inherit styles from '.block' */
  border: 1px solid #EEE;
//Less 更像是混入写法
.block {
  margin: 10px 5px;
  padding: 2px;
}
p {
  .block; /* Inherit styles from '.block' */
  border: 1px solid #EEE;
}
```

- **导入**
```js
//不需指明被导入文件的全名。
//Sass 
@import "color";//color.scss
//Less
@import "library"; // library.less
@import "typo.css";
```

### 不同之处  
- **运行环境**：Sass基于Ruby,通过服务器处理；Less基于JS，通过客户端处理；所以Sass会解析地比Less快一点。(Less也可在服务端运行 (借助 Node.js)。)  
- **定义变量**：Sass用$定义变量，Less用@定义变量
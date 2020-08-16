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
  - tabel  
  父元素 `dispaly:table` ,子元素`text-align:center`,`vertical-align:middle`  
  父元素 `display:table`, 子元素 `display:table-cell;vertical-align:middle;`
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

## 布局方法
#### 响应式布局
- @media
- 百分比
- rem/em
- flex
- 视口单位 vw/vh  
  *和百分比很像，区别是百分比基于祖先元素，vw/vh基于视窗（横屏之后宽高对换）*
- 栅格系统`Bootrap`

#### 三栏布局
- left块为左浮动，right为右浮动，center放中间不设宽就会自动撑开
- 绝对定位，左边left:0;右边right:0,中间设置相应的left、right
- 容器设置display:tabel,容器内items设display:tabel-cell,左右设宽，中间自动撑开
- 设置容器为flex,左右两边设宽，中间flex:1

#### 几种布局的区别
- 静态布局：定宽布局
- 流式布局：页面元素根据屏幕分辨率进行适配调整，整体布局不变，代表：栅格系统
- 响应式布局：通过媒体查询等方法，针对不同尺寸大小的终端显示令人满意的效果
- 自适应布局：通过检测访问设备(PC、Ipad、手机)，返回相应的页面

## 如何响应式设计viewport
**viewport**：是指网页的可视区域。
- width：控制 viewport 的大小，可以指定的一个值，如 600，或者特殊的值，eg: width=device-width 表示页面宽度为设备的宽度）。
- height：和 width 相对应，指定高度。
- initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例。eg:initial-scale=1.0代表初始页面不缩放。
- maximum-scale：允许用户缩放到的最大比例。
- minimum-scale：允许用户缩放到的最小比例。
- user-scalable：用户是否可以手动缩放。eg:user-scalable=0代表可以缩放

通常网页的写法都是
`<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />`  
-  为什么有了`width=device-width`规定网页展示大小和设备大小一样了，还要加上`initial-scale=1.0`呢？  
因为iphone、ipad以及IE 会横竖屏不分，通通以竖屏的ideal viewport宽度为准。所以，最完美的写法应该是，两者都写上去，这样就 initial-scale=1 解决了 iphone、ipad的毛病，width=device-width则解决了IE的毛病。
- 如果width 和 initial-scale=1同时出现，并且还出现了冲突，如下：
`<meta name="viewport" content="width=400, initial-scale=1">`  

页面会以哪个为标准呢？  
<font color="#f34134;">会以数值大的那个为标准</font>。如果initial-scale=1的数值为500，大于width的数字400，页面的展示宽度则以initial-scale=1为准；如果initial-scale=1的数值为370，小于width的400，页面的展示则以width=400为准。  
- css中的1px并不等于设备的1px  
在桌面浏览器中，我们可以近似的理解为浏览器中css的1个像素对应着电脑屏幕的1个物理像素（但并不意味这是完全的对等，只是在此不讨论）  
在移动设备中，分辨率为320x480的iphone3的一个css像素确实是等于一个屏幕物理像素，。但随着技术不断的更新，出现了更高的分辨率以及更复杂的像素密度等级，设备上的一个css像素相当于多少个屏幕物理像素，因设备的不同而不同。

## 什么是BFC(Block formatting contexts)？
**BFC**：是一个独立不干扰外界也不被外界干扰的盒子——块格式化上下文  
**如何创建一锅BFC**：  
- float不为none
- 绝对定位position为absolute或fixed
- display:inline-block/tabel-cell/tabel-caption
- overflow不为visible
- 弹性盒子  

**特点**: 
- 让处于BFC内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。
- 一个元素不能同时存在于两个BFC中。
- 内部的盒会在垂直方向一个接一个排列（可以看作BFC中有一个的常规流）；
- 处于同一个BFC中的元素相互影响，可能会发生margin collapse；
- 每个元素的margin box的左边，与容器块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此；
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然；
- 计算BFC的高度时，考虑BFC所包含的所有元素，连浮动元素也参与计算；
浮动盒区域不叠加到BFC上；

实际应用
- 可以闭合浮动
- 防止与浮动元素重叠

## px、rem和em的原理和区别
**px像素(Pixel)**：相对单位，相对于显示器屏幕分辨率。  
一般电脑分辨率有1920 * 1024、1024 * 768、1280 * 768，所以1px在这些分辨率不同的电脑上显示的实际大小是不一样的。  

*今天面试完才知道自己之前对 rem 和 em 的理解是错的？*  
**rem**作用于<font color="#f34134">非根元素</font>时，相对于根元素字体大小；  
**rem**作用于<font color="#f34134">根元素</font>字体大小时，相对于其出初始字体大小。  
**原理**：将不同的屏幕划分为相同的份数，让同一个元素在不同的屏幕上占据相同比例的空间。    
假设把屏幕分为十等分，那1rem等于多少px呢：  
`1em = document.documentElement.clientWidth / 10 + 'px'`  
所以说它和视窗大小是有关的呀！！ 

em：相对单位，相对于其父元素
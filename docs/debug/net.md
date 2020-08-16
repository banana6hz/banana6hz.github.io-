## 浏览器兼容性问题
在开发过程中，不可避免会遇到兼容性的问题，出现这些问题是因为不同种类浏览器的内核是不一样的，而不同的浏览器内核对代码的解析存在着差异，所以页面出现了不同的的渲染效果。

目前主流的浏览器内核主要有一下几种：  
浏览器|内核
:--:|:--:
Chrome|Blink
Safair|Webkit
Firefox|Gecko
IE|Trident(IE内核)
Opera浏览器|Blink（最初是自己的Presto内核）
百度浏览器|IE内核
360浏览器|IE+Chrome双内核
QQ浏览器|Trident（兼容模式）+Webkit（高速模式）

---

⭕**CSS兼容**  
:one: 不同的margin和padding  
💡 通过通配符选择器，全局重置样式：`*{margin:0;padding:0}`  

:two: IE6下元素浮动之后margin值变成双倍  
💡`{ display: inline;}`  

:three: IE9以下浏览器不能使用opacity  
💡
```js
 opacity: 0.5;
 filter: alpha(opacity = 50);
 //IE6-IE8我们习惯使用filter滤镜属性来进行实现
 filter: progid:DXImageTransform.Microsoft.Alpha(style = 0, opacity = 50);
 //IE4-IE9都支持滤镜写法progid:DXImageTransform.Microsoft.Alpha(Opacity=xx)
```

:four: firefox不支持cursor:hand  
💡统一使用pointer`cursor:pointer;`

:five: li中内容超过长度后以省略号显示  
💡适用与IE、Opera、safari、chrom浏览器，FF暂不支持  
```js
white-space:nowrap;
text-overflow:ellipsis;
-o-text-overflow:ellipsis;
```

⭕**JS兼容**  
:one: ajax  
💡IE：ActiveXObject  其他：xmlHttpReuest
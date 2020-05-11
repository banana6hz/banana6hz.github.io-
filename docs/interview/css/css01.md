### 一. 如何解决css中margin的重叠问题  
只有普通文档流中块框的垂直边界才会发生边界叠加。行内框、浮动框或绝对定位框之间的边界不会叠加。   
1. 用padding代替margin  
2. 后面的元素用float脱离文本流 `float:left;display:inline;`  
3. 用绝对定位，`position:absolute;` 
4. 中间用一个边框为透明的div占位 `border:1px solid transparent;`
5. 添加 `overflow:hidden;` 的外层父元素  
6. 添加 `padding:1px;` 的外层父元素


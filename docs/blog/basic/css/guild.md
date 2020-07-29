![CSS](../../../.vuepress/imgs/common/logo_big.jpg)  
如果把HTML当成是建房子🏠的精钢水泥，那么CSS就是在给房子装潢🏡。  
## CSS3
![CSS](../../../.vuepress/imgs/blog/css/CSS3.jpg) 

## 介绍一下CSS的盒子模型
盒子模型分为两种
- W3c标准的盒子模型（标准盒模型） 
![CSS](../../../.vuepress/imgs/blog/css/box.jpg)  
**标准盒模型下盒子的大小  = content + border + padding + margin**
- 第二种IE标准的盒子模型（怪异盒模型）
![CSS](../../../.vuepress/imgs/blog/css/ieBox.jpg)   
**怪异盒模型下盒子的大小=width（content + border + padding） + margin**
## CSS选择符有哪些？哪些属性可以继承？
## CSS优先级算法如何计算？
CSS 优先规则1： 最近的祖先样式比其他祖先样式优先级高。  
CSS 优先规则2："直接样式"比"祖先样式"优先级高。  
CSS 优先规则3：优先级关系：内联样式 > ID 选择器 > 类选择器 = 属性选择器 = 伪类选择器 > 标签选择器 = 伪元素选择器  

## SVG和Canvas的区别？
- **SVG**是矢量图形，放大不会失真。**Canvas**是标量图形，放大会失真或有锯齿。  
- **SVG**绘制出来的每一个图形都是独立DOM节点，能都方便绑定事件和修改。**Canvas**绘制出来是一整张画布
![CSS](../../../.vuepress/imgs/blog/css/canvas_svg.png)  

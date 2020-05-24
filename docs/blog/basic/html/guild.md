![HTML](../../../.vuepress/imgs/common/logo_big.jpg)

**HTML**称为<U>超文本标记</U>语言，是一种标识性的语言,不是编程语言哦。HTML文档=网页。  

## HTML常用标签

![html](../../../.vuepress/imgs/blog/html/html.jpg)

## HTML5新标签
HTML5 是最新的 HTML 标准。
![html5](../../../.vuepress/imgs/blog/html/html5.jpg)

## 题解
### Doctype的作用？
声明位于HTML文档中的第一行、告知浏览器的解析器用什么文档标准解析这个文档

### 页面导入样式时，使用link和@import有什么区别？
- 用途：
   - link属于XHTML标签，除了加载CSS外，还能用于定义RSS, 定义rel连接属性等作用；
   - 而@import是CSS提供的，只能用于加载CSS;  
- 加载：
   - 页面被加载的时，link会同时被加载  
   - 而@import引用的CSS会等到页面被加载完再加载;  
- 兼容性
   - import是CSS2.1 提出的，只在IE5以上才能被识别，
   - 而link是XHTML标签，无兼容问题;  
## Markdown  
Markdown是一种纯文本格式的标记语言。通过简单的标记语法，它可以使普通文本内容具有一定的格式。  [Markdown规范（Google）](https://github.com/google/styleguide/blob/gh-pages/docguide/style.md)  
### 一、标题 
    # 这是一级标题
    ## 这是二级标题
    ### 这是三级标题
    #### 这是四级标题
    ##### 这是五级标题
    ###### 这是六级标题    
用法：#后加空格再加内容，一级的字号最大  
### 二、字体样式
 Num |源代码|效果
:---:|:--:|:---:
  1  |`*斜体*或_斜体字_`|*斜体*  
  2  |`**加粗**或__粗体__`|**加粗**
  3  |`***加粗斜体***或___加粗斜体___`|***加粗斜体***
  4  |`~~删除线~~`|~~删除线~~  
  5  |`<u>下划线</u>`|<u>下划线</u>
  6  |`X<sup>2</sup>`|X<sup>2</sup>  
  7  |`H<sub>2</sub>O`|H<sub>2</sub>O 
  8  |`字体颜色<font face="微软雅黑" size=6 color=#FF0000 >微软雅黑字体</font>`|<font face="微软雅黑" size=6 color=#FF0000 >微软雅黑字体</font>   
  9  |`下划线 $\underline{X}$上划线 $\overline{X}$`| $\underline{X}$上划线 $\overline{X}$
### 三、引用  
在引用内容前面加>即可，可嵌套加多个>  
>这是引用内容 `>这是引用内容` 
>>这是引用内容 `>>这是引用内容`  
### 四、分割线    
- 三个或三个以上的-或者*  `---` `***`
 ---  
### 五、图片
`![图片alt](图片地址 ''图片title'')`  
图片alt就是显示在图片下面的文字，相当于对图片内容的解释。  
图片title是图片的标题，当鼠标移到图片上时显示的内容。title可加可不加  
### 六、超链接  
源代码|效果
:--:|:---:  
`[百度](http://baidu.com "超链接title")`<br>*title可加可不加*|[百度](http://baidu.com "超链接title") 
`<a href="http://baidu.com" target="_blank">百度</a>`|<a href="http://baidu.com" target="_blank">百度</a>    
`直接链接：<http://baidu.com>`|直接链接：<http://baidu.com>  
### 七、列表  
- **无序列表:** - + *任一种加**空格**再加列表名称
```
- 无序列表1
* 无序列表2
+ 无序列表3
```  
- 无序列表1
* 无序列表2
+ 无序列表3   
- **有序列表：** 数字加.再加空格再加列表名称  
```
1. 有序列表1 
2. 有序列表2
3. 有序列表3
```  
1. 有序列表1 
2. 有序列表2
3. 有序列表3  
- **有序列表嵌套：** 上一级和下一级之间敲三个空格即可  
```
1. 有序列表1   (三个空格)
1.1 有序列表    
1.1.1  
2. 有序列表2
3. 有序列表3 
```
1. 有序列表1   
1.1 有序列表  
2. 有序列表2
3. 有序列表3  
- **无序列表嵌套：**
```
- 1. 有序列表1  
  - 1.1 有序列表  
    - 1.1.1 有序列表 
```
- 1. 有序列表1  
  - 1.1 有序列表  
    - 1.1.1 有序列表 
### 八、表格  
```
居左对齐（默认）|居中对齐|居右对齐
---|:--:|---:
1|2|3
内容|内容|内容

第二行分割表头和内容。
- 有一个就行，为了对齐，多加了几个
文字默认居左
-两边加：表示文字居中
-右边加：表示文字居右
注：原生的语法两边都要用 | 包起来。此处省略
```
居左对齐（默认）|居中对齐|居右对齐
:---|:--:|---:
1|2|3
内容|内容|内容  
### 九、代码
- 单行代码：左右用`包裹 
``` 
`代码内容`
```
- 多行代码：代码之间分别用三个反引号包起来，且两边的反引号单独占一行  
```
(```)
  代码...
  代码...
  代码...
(```)
```
注：为了防止转译，前后三个反引号处加了小括号，实际是没有的。这里只是用来演示，实际中去掉两边小括号即可。
- 代码块中的行高亮  
VuePress 使用了 Prism 来为 markdown 中的代码块实现语法高亮。Prism 支持大量的编程语言，你需要做的只是在代码块的开始倒勾中附加一个有效的语言别名：  

输入：
```
(```js {4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```) 
```
注：为了防止转译，前后三个反引号处加了小括号，实际是没有的。 
输出：
```js {4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```   
### 十、流程图
```mermaid
	graph TB
	A[Apple]-->B{Boy}
	A---C(Cat)
	B.->D((Dog))
	C==喵==>D
	style A fill:#2ff,fill-opacity:0.1,stroke:#faa,stroke-width:4px
	style D stroke:#000,stroke-width:8px;
```
为什么不粗来，我困了...:tea:🙃    
st=>start: Start:>https://www.zybuluo.com
io=>inputoutput: verification
op=>operation: Your Operation
cond=>condition: Yes or No?
sub=>subroutine: Your Subroutine
e=>end

st->io->op->cond
cond(yes)->e
cond(no)->sub->io  
好像还是不行...未解之谜:boom::boom:?
### 十一、其他  

- **Markdown 换行：**`<br>`  
- **背景色**  
```
<table><tr><td bgcolor=#FAEBD7>#7FFFD4，rgb(127, 255, 212)</td></tr></table> 
```
<table><tr><td bgcolor=#FAEBD7>#7FFFD4， rgb(127, 255, 212)</td></tr></table> 

- **Markdown 段首缩进：**  

| Num |                    源代码               |    效果       |
|:---:|                   :--:                 |:---:          |
|  1  |`&ensp;` or `&#8194;` 表示一个半角的空格  |/&ensp;/       |
|  2  |`&emsp;` or `&#8195;`  表示一个全角的空格 |/&emsp;/       |
|  3  |`&emsp;&emsp;` 两个全角的空格（用的比较多）|/&emsp;&emsp;/ |
|  4  |`&nbsp;` or `&#160;` 不断行的空白格       |/&nbsp;/       |  
- **自定义容器**
```
::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

```
::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger  
这是一个危险警告
:::

- **目录**    
输入 `[[toc]]`  

--- 
[HTML字符](https://www.w3school.com.cn/tags/html_ref_symbols.html)
[emiji](https://emojipedia.org/)
## 如何解决css中margin的重叠问题  
只有普通文档流中块框的垂直边界才会发生边界叠加。行内框、浮动框或绝对定位框之间的边界不会叠加。   
1. 用padding代替margin  
2. 后面的元素用float脱离文本流 `float:left;display:inline;`  
3. 用绝对定位，`position:absolute;` 
4. 中间用一个边框为透明的div占位 `border:1px solid transparent;`
5. 添加 `overflow:hidden;` 的外层父元素  
6. 添加 `padding:1px;` 的外层父元素

## CSS实现水平垂直居中
#### 一、内联元素居中布局    
  - **水平居中：**   
    - 行内元素:  
    >`text-align:center`  
    - flex元素设置父元素： 
    >`display:flex;justify-content:center;`  
  - **垂直居中**   
    - 单行文本父元素确认高度：
    >`line-height:height;`  
    - 多行文本父元素确认高度: 
    >`display:table-cell;vertical-align:center`<br><br>vvv    
#### 二、定宽高块级元素居中布局
  - **水平居中：**   
    - `margin:0 auto`  
    - `margin-left:auto;margin-right:auto`  
  - **垂直居中：**
#### 三、不定宽块级元素:
  - 设置table
      ```
      display:table;
      margin:0 auto;
      ```  
  - 设置inline-block（多个块状元素）
    ```
      .center{text-align:center;}
      .inlineblock-div{display:inline-block;}

      <div class="center">
        <div class="inlineblock-div">1</div>
        <div class="inlineblock-div">2</div>
      </div>
    ```  
  - 定位居中 

  [1](https://juejin.im/entry/57ea0f78a22b9d006163ea8f) 
  [2](https://juejin.im/entry/55a8ce76e4b0c78cf60ac924)




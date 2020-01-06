CSS实现水平垂直居中
---
### 一、内联元素居中布局    
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
### 二、定宽高块级元素居中布局
  - **水平居中：**   
    - `margin:0 auto`  
    - `margin-left:auto;margin-right:auto`  
  - **垂直居中：**
### 三、不定宽块级元素:
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


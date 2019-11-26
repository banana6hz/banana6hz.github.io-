CSS实现水平垂直居中
---
####一、水平居中
    1. 行内元素： `text-align:center`
    2. 定宽块级元素： `margin:0 auto`
    3. 不定宽块级元素:
        3.1 设置table
            ```
            display:table;
            margin:0 auto;
            ```
        3.2 设置inline-block（多个块状元素）
        ```
          .center{text-align:center;}
          .inlineblock-div{display:inline-block;}
          <div class="center">
            <div class="inlineblock-div">1</div>
            <div class="inlineblock-div">2</div>
          </div>
        ```

**事件**：文档与浏览器窗口中发生的一些特定的交互瞬间。 

**事件流**：从页面中接受事件的顺序。  
- 事件冒泡：向上传播，从具体到不那么具体 `阻止冒泡：stopPropagation()`
- 事件捕获：向下传播，从不那么具体到具体。 
- DOM事件流：事件捕获阶段、处于目标阶段（事件发生）、事件冒泡阶段  

**事件处理程序**：响应某个事件的函数 （以"on"开头）
- HTML处理程序
```js
<input type="button" value="click" onclick="alert('clicked')">
<input type="button" value="click" onclick="showMesssage()">
```
- DOM0级事件处理程序
```js
var btn = document.getElementById("mybtn");
btn.onclick = function(){
    alert(this.id);
};
btn.onclick = null;
```
- DOM2级事件处理程序
```js
//addEventListener(事件名，函数，布尔值),可添加多个事件处理程序
var btn = document.getElementById("mybtn");
btn.addEventListener("click",function(){
    alert("冒泡阶段调用");
},false)//false表示在冒泡阶段调用
btn.addEventListener("click",function(){
    alert("捕获阶段调用");
},true)//true表示在捕获阶段调用

//removeEventListener(),通过addEventListener()添加的事件处理程序只能使用removeEventListener()移除，且removeEventListener()不能移除匿名函数
var btn = document.getElementById("mybtn");
var handler = function(){
    alert("冒泡阶段调用");
}
btn.addEventListener("click",handler,false)
btn.removeEventListener("click",handler,false)
```
- IE事件处理程序
```js
//attachEvent(函数名称，函数)
var btn = document.getElementById("mybtn");
//第一个参数是onclick
btn.attachEvent("onclick",function(){
    alert(this===window);//true  注意这里和DOM0的区别，这里的this等于window，因为他是在全局环境中执行的，而DOM0在局部环境执行
})

//detachEvent(函数名称，函数)
var btn = document.getElementById("mybtn");
var handler = function(){
    alert(1314);
}
btn.attachEvent("onclick",handler)
btn.detachEvent("onclick",handler)
```
- 跨浏览器的事件处理程序:结合能力检测就行

**事件委托（代理）**：给DOM树中尽量最高的的层次上添加一个事件处理程序。可以提升性能，可以减少绑定给每个子节点。
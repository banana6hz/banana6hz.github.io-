## JS基础 
一、闭包  

二、 执行上下文  
执行上下文可以理解为当前代码的执行环境，它会形成一个作用域。执行环境：全局环境、局部环境、eval    

因此在一个JavaScript程序中，必定会产生多个执行上下文。

JavaScript引擎会以堆栈的方式来处理它们，这个堆栈，我们称其为函数调用栈(call stack)。栈底永远都是全局（环境）上下文，而栈顶就是当前正在执行的上下文。 

当代码在执行过程中，遇到以上三种情况，都会生成一个执行上下文，放入栈中，而处于栈顶的上下文执行完毕之后，就会自动出栈。  

🌰我们来看个栗子：
```js
var color = 'blue';
function changeColor() {
    var anotherColor = 'red';
    function swapColors() {
        var tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
    }
    swapColors();
}
changeColor();
```
我们用ECStack来表示处理执行上下文组的堆栈。  
- 全局上下文入栈  
- changeColor EC入栈  
- swapColors EC入栈
- swapColors EC出栈
- changeColor EC出栈
![estrack01](../../../.vuepress/imgs/blog/js/estrack01.png)  

通常情况下，全局上下文在浏览器窗口关闭后出栈。

<u>注意：函数中，遇到return能直接终止可执行代码的执行，因此会直接将当前上下文弹出栈。</u>

🌰再来看个栗子：
```js
function f1(){
    var n=18;
    function f2(){
        alert(n);
    }
    return f2;
}
var result=f1();
result(); // 18
```
因为f1中的函数f2在f1的可执行代码中，并没有被调用执行，因此执行f1时，f2不会创建新的上下文，而直到result执行时，才创建了一个新的。具体演变过程如下。  
![estrack02](../../../.vuepress/imgs/blog/js/estrack02.png)  

🌰再来看个栗子：
```js
console.log('global begin: ' + i); // ?
var i = 1;
foo(1);
function foo(i) {
    if (i == 4) {
        return;
    }
    console.log('foo() begin: ' + i); // ?
    foo(i+1);
    console.log('foo() end: ' + i); // ?
}
console.log('global end: ' + i); // ?
```

这个栗子的堆栈如图：  
![estrack03](../../../.vuepress/imgs/blog/js/estrack03.jpg)  

所以这个栗子的输出结果依次为：undefined、1、2、3、3、2、1、1
<!-- 函数  
原型链  
闭包  
类 
语法糖  
同步异步  
ajax  
渣渣 -->



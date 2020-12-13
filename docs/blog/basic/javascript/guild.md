## JS数据类型
- 基本类型：`Number`、`String`、`Boolean`、`null`、`undefined`、`Symbol`、`Bigint`
- 引用类型：`Object`、`Array`、`Date`、`RegExp`、`Math` `Function`

### 基本类型和引用类型的区别
- 基本类型是<font color="#f34134">按值传递</font>，可以直接操作保存在变量中的实际值
```js
var a = 3;
var b = a;
b = 4;
console.log(a)//3
```
- 引用类型是<font color="#f34134">按地址传递</font>，是保存在堆内存中的对象
```js
var obj1 = {};
var obj2 = obj1;
obj2.name = "banana";
console.log(obj1.name); // banana
```
```js
function fun(person) {
  person.age = 26
  person = {
    name: 'lhz',
    age: 18
  }
  return person
}
const p1 = {
  name: 'banana',
  age: 19
}
const p2 = fun(p1)
console.log(p1) // -> ?
console.log(p2) // -> ?
```
<details><summary><b>答案</b></summary>
<p>p1：{name: “lhz”, age: 26}</br>
p2：{name: “banana”, age: 18}</p>
</details>

### 数据类型的检测
- typeof：检测给定变量的数据类型
```js
// 基本类型
console.log(typeof 13);//number
console.log(typeof true);//boolean
console.log(typeof a);//undefined
console.log(typeof "banana");//string
var sym = Symbol();
console.log(typeof sym);//symbol
// 引用类型：除了function,其他引用类型都会显示Object
var obj = {};
console.log(typeof obj);//object
var fun = function(){};
console.log(typeof fun);//function
```
- instanceof：用于判断一个变量是否某个对象的实例,
```js
var arr = new Array();
console.log(arr instanceof Array);//true
var date  = new Date();
console.log(date instanceof Date);//true
var reg = new RegExp();
console.log(reg instanceof RegExp);//true
//更重要的一点是 instanceof 可以在继承关系中用来判断一个实例是否属于它的父类型。
function Foo(){}
function Aoo(){} 
Foo.prototype = new Aoo();//JavaScript 原型继承：子的原型等于父的实例
var foo = new Foo(); //通过构造函数创建
console.log(foo instanceof Foo)//true 
console.log(foo instanceof Aoo)//true
```
- Object.prototype.toString.call()
```js
var arr = new Array()
Object.prototype.toString.call(arr)// "[object Array]"
```

### 数据类型的转换
js的类型转换有以下3种：
- 转换成数字number
- 转换成布尔值
- 转换成字符串

原始值|转换目标|结果
:--:|:--:|---
string|number|''=>0, '1'=>1, 'a'=>NaN, '1a1'=>NaN,
boolean|number|true=>1, false=>0
array|number|[]=>0, [6]=>6（存在一个元素且为数字）, 其他情况=>NaN
null|number|0
除了数组的引用类型｜number|NaN
symbol|number|抛错
-|-|-
string|boolean|''=>false,其他都为true
number|boolean|0=>false, -0=>false, NaN=false
null、undefined|boolean|false
引用类型|boolean|true
-|-|-
number|string|eg:5=>'5'
boolean|string|true=>'true', false=>'false'
array|string|[]=>'', [1,2]=>'1,2'
对象|string|'[Object Object]'

📝来做个练习吧
```js
//=>number
Number('')
Number('1')
Number('11a')
Number('abc')
Number(true)
Number(false)
Number([])
Number([3])
Number([1,2])
Number(null)
var a = new Symbol()
Number(a)
```
<details><summary>答案</summary>
<p>Number('') //0</br>
Number('1') //1</br>
Number('11a') //NaN</br>
Number('abc') //NaN</br>
Number(true) //1</br>
Number(false) //0</br>
Number([]) //0</br>
Number([3]) //3</br>
Number([1,2]) //NaN</br>
Number(null) //0</br>
var a = new Symbol()</br>
Number(a)</p>// Uncaught TypeError: Cannot convert a Symbol value to a number</br>
</details>

📝来做个练习吧
```js
// =>string
String(1)
String(true)
String(false)
String([])
String([1,2])
var p = new Object;
String(p)
```
<details><summary>答案</summary>
<p>String(1) //"1" </br>
String(true) //"true" </br>
String(false)//"false" </br>
String([])   //""  </br>
String([1,2])// "1,2"</br>
var p = new Object;</br>
String(p) //"[object Object]"</p>
</details>

📝来做个练习吧
```js
// =>boolean
Boolean(0)
Boolean(-0)
Boolean(NaN)
Boolean(a)
Boolean(1)
Boolean('')
Boolean('1')
Boolean(null)
Boolean(undefined)
Boolean([])
Boolean([1])
```
<details><summary>答案</summary>
<p>Boolean(0) // false</br>
Boolean(-0) // false</br>
Boolean(NaN) //false</br>
Boolean(a) // true</br>
Boolean(1) // true</br>
Boolean('') // false</br>
Boolean('1') // true</br>
Boolean(null) // false</br>
Boolean(undefined) false</br>
Boolean([]) // true</br>
Boolean([1]) // true</p> 
</details>

📪 ==和===
- ==：判断值是否相等
- ===：判断值和类型是否都相等

📪 ==的类型转换规则：
- 判断值是否相等，相等返回true
- 判断是否为null和undefined,是就返回true
- 判断是否为string和number，是的话就把string转换成number,再比较值是否相等
- 判断其中一方是否为boolean，是的话就把boolean转换成number，再比较
- 判断其中一方是否Object，且另一方为String、number、或者Symbol,会将Object转换成字符串，再比较
📝来做个练习吧
```js
[] == ![]
"34" == 34
null == undefined
"34a" == "34"
NaN == NaN
```
<details><summary>答案</summary>
<p>true</p></br>
<p>true</p></br>
<p>false</p></br>
<p>false </p></br>
NaN表示非数字值，特殊之处：它和任何值都不相等，包括自身。判断NaN的方法：x!=x返回true
</details>


## 执行环境以及作用域
每个函数都有自己的执行环境，每个执行环境都有一个与之关联的变量对象，保存着该环境定义的变量和函数。  
  
当代码在一个环境中执行时，会创建一个变量对象的作用域链，作用域链保证了对执行环境有权访问的所有变量和函数的有序访问。

作用域是一套规则，用于确定在何处以及如何查找变量。如果查找的目的是对变量赋值，那么就会进行LHS查询；如果查找的目的是获取变量的值，那就回进行RHS查询。

不成功的RHS引用会导致抛出RefferenceError异常  
不成功的LHS引用会导致隐式地创建一个全局变量(非严格模式下)

作用域链访问的顺序为：局部的变量对象➡外部环境的变量对象➡全局环境的变量对象  
<font color="#425fe">（作用域链只能向上搜索，不能向下搜索）</font>

某个执行环境中所有的代码执行完毕后，该环境就会被销毁，保存在其中的所有变量和函数定义也随之销毁。<font color="#425fe">（全局环境直到应用程序退出（如关闭网页）时才会被销毁）</font>

## 执行上下文  
执行上下文可以理解为当前代码的执行环境，它会形成一个作用域。 

执行环境：全局环境、局部环境、eval    

因此在一个JavaScript程序中，必定会产生多个执行上下文。  

每个执行上下文包括：变量对象(VO)、作用域链（ScopeChain)、this指针  

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

## 原型与原型链  
在讲解原型之前，先来想学习一下创建对象的几种模式。    
**1.工厂模式**
```js
function createPerson(name,age){
    var o = new Object();
    o.name=name;
    o.age=age;
    o.sayName = function(){
        alert(this.name);
    }
    return o;
}
var person1 = new createPerson("nico",18);
var person2 = new createPerson("banana",22)
```
工厂模式可以创建多个相似的对象，但没有解决对象识别的问题(即怎样知道一个对象的类型)

**2.构造函数模式**
```js
function Person(name,age){
    this.name = name;
    this.age = age;
    this.sayName = function(){
        alert(this.name)
    }
}
var person1 = new Person("nico",18);
var person2 = new Person("banana",22);
```
对比工厂模式，构造函数模式可以知道自己是由谁创建的
```js
console.log(person1 instanceof Object); //true
console.log(person1 instanceof Person); //true
console.log(person2 instanceof Object); //true
console.log(person2 instanceof Person); //true
```
但构造函数也有缺点，就是每个方法在每个实例上都要创建一次。  
如person1和person2都有一个sayName函数，但两个方法不是一个Function的实例，不同实例上的不同函数是不相等的。
```js
alert(person1.sayName()==person2.sayName())//false
```
创造两个完成同样任务的Function实例是没有必要的，还会导致了不同作用域链和标识符的解析。因此我们可以优化一下这个构造函数
```js
function Person(name,age){
    this.name = name;
    this.age = age;
    this.sayName = sayName;
}
function sayName(){
    alert(this.name)
}
var person1 = new Person("nico",18);
var person2 = new Person("banana",22);
alert(person1.sayName()==person2.sayName())//true
```
我们把sayName()定义在构造函数外部，这样person1,person2就共享了全局环境定义的sayName函数的。但是问题又来了，全局环境中定义的函数只能被某个函数调用，而且要是有很多个方法怎么办，那不就要定义很多方法了。那我们再来看看原型模式。

**3.原型模式**  
我们在创建的每一个函数都会创建一个prototype原型属性，这个属性是一个指针，指向一个原型对象。原型对象prototype里面有constructor，指向构造函数本身。  
![prototype](../../../.vuepress/imgs/blog/js/prototype01.jpg)  
先弄懂两个东西  
- prototype：在规范里，prototype 被定义为：给其它对象提供共享属性的对象。它是构造函数都有的属性，表示被实例化出来的对象的原型是谁。
- _proto_：所有JavaScript对象（包括函数）都有的属性，表示某个对象的原型 
```js
//首先要明白两个准则
Person.prototype.constructor == Person 
// **准则1：原型对象（即Person.prototype）的constructor指向构造函数本身**
person1.__proto__ == Person.prototype 
// **准则2：实例（即person1）的__proto__和原型对象指向同一个地方**
```
关于原型链：当访问一个对象的某个属性时，会先在这个对象本身属性上查找，如果没有找到，则会去它__proto__隐式原型上查找，即它的构造函数的prototype，如果还没有找到就会再在构造函数的prototype的__proto__中查找，这样一层一层向上查找就会形成一个链式结构，我们称为原型链

👉再来看看这张经典图  
![prototype](../../../.vuepress/imgs/blog/js/prototype02.png)
```js
// 从上方 function Foo() 开始分析这一张经典之图
function Foo(){};
let f1 = new Foo();
let f2 = new Foo();
f1._proto_ = Foo.prototype;
Foo.prototype._proto_ = Object.prototype;
Object.prototype._proto_ = null;// 原型链到此停止

f1.prototype.constructor = Foo;
Foo._proto_ = Function.prototype;
Function.prototype._proto_ = Object.prototype;
Object.prototype._proto_ = null;// 原型链到此停止
// **此处注意Foo 和 Function的区别， Foo是 Function的实例**

// 从中间 Function Object()开始分析这一张经典之图
function Object(){};
let o1 = new Object();
let o2 = new Object();
o1._proto_ = Object.prototype;
Object.prototype._proto_ = null;
Object.prototype.constructor = Object;
Object._proto_ = Function.prototype;
Function.prototype._proto_ = Object.prototype;
Object.prototype._proto_ = null;

// 从下方 Function Function()开始分析这一张经典之图
Function Function();
Function._proto_ = Object.prototype;
Object.prototype._proto_ = null;
```

👉来看看原型模式如何创建对象
```js
function Person(){

}
Person.prototype.name = "nico";
Person.prototype.age = 18;
Person.prototype.sayName = function(){
    alert(this.name);
}
var person1 = new Person();
person1.sayName()//nico
var person2 = new Person();
person2.sayName()//nico
alert(person1.sayName()==person2.sayName())//true
``` 
原型模式让我们每个实例都共享了一个sayName函数，但是同时也共享了其他属性。但实际应用中，这样我们就不能创建属性不同的实例了。

**4.组合使用构造模式与原型模式**
```js
function Person(name,age){
    this.name = name;
    this.age = age;
}
Person.prototype= {
    constructor:Person,
    sayName:function(){
        console.log(this.name);
    }
}
var p1 = new Person("banana",18);
var p2 = new Person("apple",20)
p1.sayName();
p2.sayName();
```

原型与原型层层相链接的过程即为原型链。

原型、原型链的意思何在？原型对象的作用，是用来存放实例中共有的那部份属性、方法，可以大大减少内存消耗。  
假如我们创建不同的中国人，他们有不同的名字，不同的年龄，但是他们有共同的肤色，共同的头发，肤色和头发就是实例们共有属性，可以通过原型去访问，而不用在每一个实例上都创建这些属性。

**5.动态原型模式**
```js
function Person(name,age){
    this.name = name
    this.age = age
    if(typeof this.sayName != "function"){
        Person.prototype.sayName = function(){
            console.log(this.name)
        }
    }
}
```
只有在sayName()不存在的时候才会创建

**原型链继承**
原型链继承的关键就是：子的原型等于父的实例
```js
function Father(name,age){
    this.name = name;
    this.age = age;
}
Father.prototype.sayName = function(){
    console.log(this.name)
}
var f1 = new Father("banana",18);
var Child = function(){}
Child.prototype = new Father("apple",20);//子的原型等于父的实例
var c1 = new Child;
c1.sayName()
```

## 什么是闭包  
闭包：就是有权访问另一个函数作用域中变量的函数。  
常见方式就是在一个函数内部创建另一个函数，此时内部函数就是一个闭包函数，他可以访问外部函数中的变量。  
为什么可以访问：因为内部函数的作用域链中包含了外部函数的作用域。

当函数被调用时，会创建一个执行环境和相应的作用域链，然后初始化函数的活动对象。

正常情况下，函数执行完毕后，局部活动对象就会被销毁，内存中仅保存了全局活动对象。  
但对于闭包来说，当外部函数执行完毕时，该外部函数的作用域链就会被销毁，但是因为内部函数的作用域链还在引用外部函数的活动对象，所以外部函数的活动地对象依然保留在内存中，直到闭包函数被销毁。  

- 缺点：因为闭包会包含外部函数的作用域，所以占用了较多的内存空间。如果大量使用闭包，会导致栈内存过大，页面渲染变慢，性能受到影响。
- 优点：可以让一个变量长期储存在内存中，避免全局变量的污染，可以存在私有成员。

闭包与变量：闭包只能取得包含函数中任何变量的最后一个值  
```js
function createFun(){
    var res=new Array();
    for(var i=0;i<5;i++){
        res[i]=function(){
            return i;
        };
        res[i];
    }
    return res;
}
var fun=createFun();
for(var i=0;i<fun.length;i++){
document.write(fun[i]() + "<br />");
}//以上输出全部是i的最后一次的值（5）
```
如上面的栗子，输出全部是i的最后一次的值——5  
解析：因为每个函数都保存了createFun函数的活动对象，所以他们引用的都是同一个i,当createFun函数返回后，变量i的值是5  
解决：但有时候，我们需要达到循环输出不一样的值，那要怎么做呢？——创建另一个匿名函数
```js
function createFun(){
    var res=new Array();
    for(var i=0;i<5;i++){
        res[i]=function(num){
            return function(){
                return num;
            }
        }(i)//立即执行此匿名函数
    }
    return res;
}
var fun=createFun();
for(var i=0;i<fun.length;i++){
document.write(fun[i]() + "<br />");
}
``` 
闭包的应用
- 返回一个函数
```js
function f1() {
  var a = 2
  function f2() {
    console.log(a);//2
  }
  return f2;
}
var x = f1();
x();
```
- 作为函数参数传递
```js
var a = 1;
function foo(){
  var a = 2;
  function baz(){
    console.log(a);
  }
  bar(baz);
}
function bar(fn){
  // 这就是闭包
  fn();
}
// 输出2，而不是1
foo();
```
- 异步操作
```js
//定时器
setTimeout(function(){
    console.log(1)
},1000)
```
- IIFE：立即执行函数
```js
var a = 1;
(function IIFE(){
 console.log(a)
})()
```


## 如何改变函数的this指向

**this**
JS中的this在不同的情况下，它会指向不同的对象,这主要取决于函数的调用方式。  
- 在全局上下文中，this指的是window
- 如果是构造函数NEW出来的新对象，this指向这个新对象
- 由上下文对象调用，绑定到上下文对象
- 由call或apply、bind调用：绑定到指定的对象
- 所有的箭头函数都没有自己的this，都指向外层。

在JavaScript中，call、apply和bind是Function对象自带的三个方法。这三个方法的主要作用是改变函数中的this指向。  
**call()**
call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数  
`fun.call(thisArg, arg1, arg2, ...)`
- thisArg
   - 不传，或者传入null、undefined，函数中的this指向window对象
   - 传递另一个函数的函数名，函数中的this指向这个函数的引用
   - 传递字符串、数值或布尔值等基础类型值，那函数中的this指向相应的包装对象(String、Number、Boolean)
   - 传递一个对象，函数中的this指向这个对象
   ```js
   function a(){console.log(this);};
   function b(){};
   var c = {name:'banana'};

   a.call();//window
   a.call(null);//window
   a.call(undefined);//window
   a.call(1);//Number
   a.call('');//String
   a.call(true);//Boolean
   a.call(b);//function b(){}
   a.call(c);//Object
   ```
   再来看看
   ```js
   function eat(x,y){   
    console.log(x+y);   
    }   
    function drink(x,y){   
    console.log(x-y);   
    }   
    eat.call(drink,3,2);//5
   ```
   在这个栗子中，drink函数的this指向eat的引用，所以eat替换了drink:eat.call(drink,3,2) == eat(3,2)  
   再来看看这个栗子
   ```js
    function Animal(){   
        this.name="animal";   
        this.showName=function(){   
            console.log(this.name);   
        }   
    }   
    function Dog(){   
        this.name="dog";   
    }   
    var animal=new Animal();   
    var dog=new Dog();       
    animal.showName.call(dog);
   ```
   在这个栗子中，this是指向Dog的,相当于把showName放到Dog上执行。

**apply**  
apply() 方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。  
`apply([thisObj[,argArray]])`
 如果argArray 不是一个有效的数组或者不是 arguments 对象，那么将导致一个 TypeError

call和apply的区别
对于apply、call两者而言，作用完全一样，不同的是接受参数的方式，请看下面的栗子
```js
function class1(args1,args2){       
  this.name=function(){      
   console.log(args,args);      
  }     
}     
function class2(){    
  var args1="1";
  var args2="2";
  class1.call(this,args1,args2);  
  /*或*/
  class1.apply(this,[args1,args2]);
}
var c=new class2();   
c.name();
```
对的就是这样，call 需要把参数按顺序传递进去，而 apply 则是把参数放在数组里。  
所以当你的参数是确定的，一般推荐使用call;如果参数不确定，那一般使用apply,再把参数push进去。

**bind()**
MDN的解释是：bind()方法会创建一个新函数，称为绑定函数。    
`function.bind(thisArg, arg1, arg2, ...)`  
当调用这个绑定函数时，绑定函数会以传入的第一个参数作为this，第二个参数以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数调用原函数。(讲的啥？？)
```js
var bar = function(){
    console.log(this.x);
}
var foo = {
    x:3
}
bar();
var func = bar.bind(foo);
func()//等价于bar.bind(foo)()
//undefined
//3
```
bind()与前两者的区别是，bind：不立即执行。而apply、call 立即执行。

<!-- 函数  
原型链  
闭包  
类 
语法糖  
同步异步  
ajax  
渣渣 -->

## Dom操作有哪些？
```js
//DOM方法：
.getElementById('#id');
.getElementsByClassName('#class');
.getElementsByTagName('#tag');
.querySelector('#ql');
.querySelectorAll('#id');
.replaceChild()//替换子节点
.createElement()//创建元素节点
.createTextNode()//创建文本节点
.appendChild()//把一个子节点添加到父节点的最后一个子节点
.insertBefore()//在指定的子节点前面插入新的子节点。
.removeChild()//删除子节点
.getAttribute()//返回指定的属性值
.setAttribute()//把指定属性设置或修改为指定的值。
//DOM属性
innerHTML //节点（元素）的文本值
parentNode //节点（元素）的父节点
childNodes //节点（元素）的子节点
attributes //节点（元素）的属性节点
```

## 字符串String  
- **toLowerCase、toUpperCase**：转换大小写
```js
var str = "Hello";
var new_str = str.toLowerCase();
console.log(new_str);//hello

var new_str1 = new_str.toUpperCase();
console.log(new_str1);//HELLO
```
- **操作方法**
```js
//concat 将指定字符串连接到此字符串的结尾
var str = "Hello,";
var str1 = "World";
var new_str = str.concat(str1);
console.log(new_str);//Hello,World

//replace 用来查找匹配一个正则表达式的字符串，然后使用新字符串代替匹配的字符串。
var str="Hello world!";
console.log(str.replace(/Hello/,"Hi"));//Hi world!

//substring 传入参数是起始位置和结束位置
var str  = "banana";
var new_str = str.substring(1);//起始位置1开始到结束位置
console.log(new_str);//anana
var new_str1 = str.substring(1,4);//起始位置1开始，但不包含结束位置
console.log(new_str1);//ana

//substr 传入参数是起始位置和长度
var str  = "banana";
var new_str = str.substr(1);//起始位置1开始到结束位置
console.log(new_str);//anana
var new_str1 = str.substr(2,4);//起始位置1开始，截取4长度
console.log(new_str1);//nana

//slice 和substring(start,end)类似，只不过slice的参数可以为负数；
var str = "Happy Birthday!";
console.log(new_str = str.slice(2));//ppy Birthday!
console.log(new_str1 = str.slice(-2));//y!
console.log(new_str2 = str.slice(2,7));//ppy B
console.log(new_str3 = str.slice(-6,-2));//thda

//search 检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串，返回字符串中匹配的索引值。否则返回 -1
//不可设置开始检索的位置
var str  = "banana";
var new_str = str.search(/a/);
console.log(new_str);//1

//match 检查一个字符串匹配一个正则表达式内容，如果没有匹配返回 null。
var str="Hello world!"
console.log(str.match("world"))//world
console.log(str.match("World"))//null
console.log(str.match("world!"))//world!

```

- **位置方法**
```js
//indexOf 可返回某个指定的字符串值在字符串中首次出现的位置。查找失败返回-1,
//可设置开始的检索位置
var str  = "banana";
var new_str = str.indexOf("a");
console.log(new_str);//1
var new_str1 = str.indexOf("a",2);
console.log(new_str1);//3

//lastIndexOf、
//charAt 返回指定位置的字符。
var str  = "banana";
var new_str = str.charAt(3);
console.log(new_str);//a
//length
```

- **字符串转数组**
```js
//split 通过将字符串划分成子串，将一个字符串做成一个字符串数组。
var str = "https://juejin.im/timeline";
var new_str = str.split("/");
console.log(new_str);//["https:", "", "juejin.im", "timeline"]
var new_str1 = str.split("/",3];//数组长度最长不可超过3
console.log(new_str1);//["https:", "", "juejin.im"]
```

## 数组Array
1. 创建方法  
```js
//Array构造函数 可用new操作符，也可不用
var colors = new Array();//生成一个空数组
var colors = new Array(3);//生成包含3项的数组
var colors = Array("banana");//生成一个包含一项，即字符串为"banana"的数组

//数组字面量表示法
var colors = [];//创建一个空数组
var colors = [1,2,]//<=IE会创建3项，其他浏览器会创建2项
var colors = [,,,,]//<=IE8会创建5项，其他浏览器会创建4项
```
2. 转换方法  
```js
var colors = ["red","blue","green"];
console.log(colors.toString());//red,blue,green
console.log(colors.valueOf());//["red","blue","green"];
console.log(colors);//["red","blue","green"];
console.log(colors.join("|"));//red|blue|green
```

3. 方法
- **push()和pop()**：从数组末尾添加移除
```js
//后进先出
var colors = ["red","blue"];
colors.push("green");
console.log(colors);//red,blue,green
colors.pop();
console.log(colors);//red,blue
```

- **shift()和unshift()**：从数组前端删除、添加项
```js
//先进先出
var colors = ["red","blue"];
colors.push("green");
console.log(colors);//red,blue,green
colors.shift();
console.log(colors);//blue,green

//后进先出
var colors = ["red","blue"];
colors.unshift("green");
console.log(colors);//green,red,blue
colors.shift();
console.log(colors);//red,blue
```

- **reverse()和sort()**：重排序
```js
//反转数组项顺序
var colors = ["red","blue","green"];
console.log(colors.reverse());//green,blue,red

//升序
var nums = [0,1,5,10,15];
console.log(nums.sort());//0,1,10,15,5
//为什么会这样呢，因为sort()是根据字符串比较的
```

- **concat()**：基于当前数组的所有项再创建一个数组  
```js
var colors = ["red","blue","green"];
var new_colors = colors.concat("yellow");
console.log(new_colors);//red,blue,green,yellow
```
- **splice()**： 基于当前数组的一个或多个项创建一个新数组
```js
var colors = ["red","blue","green","yellow","purple"];
//一个参数时，返回参数以及之后的所有项
var new_colors = colors.slice(2);
console.log(new_colors);//green,yellow,purple

//两个参数时，参数分别为起始位置和结束位置,从起始开始但不包含结束
var new_colors = colors.slice(2,3);
console.log(new_colors);//green
```

- **indexOf()和lastIndexOf()** 
```js
var nums = [1,2,3,4,5,4,6];
console.log(nums.indexOf(4));//3
console.log(nums.lastIndexOf(4));//5
```

- **迭代方法**  
```js
//🍊every()——如果每一项都返回true,则返回true 不改变原数组
//🍊some()——任一项返回true,则返回true  不改变原数组
var arr =[
    {name:"aaa",sex:0,age:18},
    {name:"bbb",sex:1,age:18},
    {name:"ccc",sex:0,age:18}
]
var every = arr.every(function(obj){   //一假即假
    return obj.sex == 0
})
var some = arr.some(function(obj){     //一真即真
    return obj.name == "aaa"
})
console.log(every,some)//false true

//🍊filter()——返回执行结果为true的结果组成的数组  不改变原数组
var filter = arr.filter(function(obj){
    return obj.sex == 0
})
console.log(filter)
// [{name: "aaa", sex: 0, age: 18}
// {name: "ccc", sex: 0, age: 18]

//🍊map()——返回每一次函数调用结果组成的数组 不改变原数组
var map = arr.map(function(obj){
    return obj.age+1
})
console.log(map)//[19,19,19]

//🍊forEach()——每一项都运行，无返回 ❗️改变原数组❗️
arr.forEach(function(obj){
    if(obj.sex==0){
        obj.sex="女"
    }else{
        obj.sex="男"
    }
})
console.log(arr)
// [{name: "aaa", sex: "女", age: 18}
// {name: "bbb", sex: "男", age: 18}
// {name: "ccc", sex: "女", age: 18}]
```

- **归并方法**  
```js
//reduce()
var arr = [1,2,3,4]
var res = arr.reduce((x,y) => x+y)
console.log(res)
//reduceRight()
```
- **数组转字符串** 
```js
var num = [1,2,3];
num.join("|")
"1|2|3"
```

- **ES6方法**
```js
//🍊form() 将类似数组的对象和可遍历的对象转化为真正的数组
const arr = ["a","b","c"]
Array.from(arr)//["a", "b", "c"]
Array.from("foo")//["f","o","o"]

//🍊find() 传入一个回调函数，找到数组中符合当前搜索规则的第一个元素
var arr = [1,2,3,4,5,6,7,8]
var findarr = arr.find(n=> n%2==0)
console.log(findarr)//2

//🍊findIndex() 传入一个回调函数，找到数组中符合当前搜索规则的第一个元素，返回它的下标，终止搜索
var arr = [1,2,3,4,5,6,7,8]
var findArr = arr.findIndex(n=> n%2==0)
console.log(findArr)//1

//🍊fill() 用一个新元素替换数组内的元素，可以指定替换下标范围
// fill(value,start,end)
var arr = [1,2,3,4,5,6,7,8]
console.log(arr.fill(886,2,5))//[1, 2, 886, 886, 886, 6, 7, 8]
console.log(arr.fill(886,2))//[1, 2, 886, 886, 886, 886, 886, 886]
```


## service worker 和 web worker
**Web worker**：它是H5的新特性，用于为JavaScript构建多线程环境。允许主线程创建一个Worker线程。把一些计算密集型或者高延迟的任务给Worker执行，执行完毕后再把结果返回给主线程。Worker线程一旦新建成功，就会一直运行，不会被主线程干扰。[Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)  
**service worker**：是浏览器与服务器之间的代理服务器，用于构建离线缓存
- **相同点**：他们都是在常规JS引擎线程以外开辟了新的JS线程。
- **不同点**：
   - Service Worker 不是服务于某个特定页面的，而是服务于多个页面的。（按照同源策略）
   - Service Worker 会常驻在浏览器中，即便注册它的页面已经关闭，Service Worker 也不会停止。本质上它是一个后台线程，只有你主动终结，或者浏览器回收，这个线程才会结束。
   - 生命周期、可调用的 API 等等也有很大的不同。




## 安全
1. XSS：跨站脚本攻击。
- 理解：攻击者通过注入恶意的脚本，在用户浏览网页的时候进行攻击。
- 场景：攻击者在留言板页面编写js代码，当浏览器在解析到用户输入代码的时候，会执行这一段代码，比如通过 `documen.cookie` 窃取用户的cookie值。又或者通过 `<script>window.location.href="http://www.baidu.com";</script>` 进行网页挑战。新浪在2011年也经历过严重的xss漏洞，使得大量用户自动关注某用户并转发某条微博
- 防御：对输入(和URL参数)进行过滤，对输出进行编码
2. CSRF：跨站请求伪造。
- 理解：可以理解为盗用者盗用了用户的身份，以用户的名义发送恶意请求。
- 场景：比如用户登陆一个网站后，在cookie未过期的情况下去访问另一个，攻击者用来制造攻击的网站，假如这个攻击者的网站上有一张诱导用户点击的图片，但是这张图片是可以修改数据库的，当用户去点击这张图片之后，攻击者就可以以用户的名义去修改数据库。
- 防御：检查https头部的refer,使用token、在http头中自定义属性并验证
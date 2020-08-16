## 目录
### 第三章、基本概念  
#### 数据类型  
**📌String**  
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
//concat
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

//split 通过将字符串划分成子串，将一个字符串做成一个字符串数组。
var str = "https://juejin.im/timeline";
var new_str = str.split("/");
console.log(new_str);//["https:", "", "juejin.im", "timeline"]
var new_str1 = str.split("/",3];//数组长度最长不可超过3
console.log(new_str1);//["https:", "", "juejin.im"]

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

<!-- 一、 闭包  
闭包就是一个函数有权去访问另外一个函数的作用域 -->
### 第五章、引用类型  
ECMAScript数组的每一项都可以存放任何类型的数据

#### 📌Array()
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
//every()——如果每一项都返回true,则返回true
//some()——任一项返回true,则返回true
//fiter()——返回执行结果为true的结果组成的数组
//map()——返回每一次函数调用结果组成的数组
//forEach()——每一项都运行，无返回
```

- **归并方法**  
```js
//reduce()
//reduceRight()
```

## JS 数据类型

- 基本类型：`Number`、`String`、`Boolean`、`null`、`undefined`、`Symbol`、`Bigint`
- 引用类型：`Object`、`Array`、`Date`、`RegExp`、`Math` `Function`

### 基本类型和引用类型的区别

- 基本类型是<font color="#f34134">按值传递</font>，可以直接操作保存在变量中的实际值

```js
var a = 3;
var b = a;
b = 4;
console.log(a); //3
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
  person.age = 26;
  person = {
    name: "lhz",
    age: 18,
  };
  return person;
}
const p1 = {
  name: "banana",
  age: 19,
};
const p2 = fun(p1);
console.log(p1); // -> ?
console.log(p2); // -> ?
```

<details><summary><b>答案</b></summary>
<p>p1：{name: “lhz”, age: 26}</br>
p2：{name: “banana”, age: 18}</p>
</details>

### 数据类型的检测

- typeof：检测给定变量的数据类型

```js
// 基本类型
console.log(typeof 13); //number
console.log(typeof true); //boolean
console.log(typeof a); //undefined
console.log(typeof "banana"); //string
var sym = Symbol();
console.log(typeof sym); //symbol
// 引用类型：除了function,其他引用类型都会显示Object
var obj = {};
console.log(typeof obj); //object
var fun = function () {};
console.log(typeof fun); //function
```

- instanceof：用于判断一个变量是否某个对象的实例,

```js
var arr = new Array();
console.log(arr instanceof Array); //true
var date = new Date();
console.log(date instanceof Date); //true
var reg = new RegExp();
console.log(reg instanceof RegExp); //true
//更重要的一点是 instanceof 可以在继承关系中用来判断一个实例是否属于它的父类型。
function Foo() {}
function Aoo() {}
Foo.prototype = new Aoo(); //JavaScript 原型继承：子的原型等于父的实例
var foo = new Foo(); //通过构造函数创建
console.log(foo instanceof Foo); //true
console.log(foo instanceof Aoo); //true
```

- Object.prototype.toString.call()

```js
var arr = new Array();
Object.prototype.toString.call(arr); // "[object Array]"
```

### 数据类型的转换

js 的类型转换有以下 3 种：

- 转换成数字 number
- 转换成布尔值
- 转换成字符串

|           原始值            | 转换目标 | 结果                                                 |
| :-------------------------: | :------: | ---------------------------------------------------- |
|           string            |  number  | ''=>0, '1'=>1, 'a'=>NaN, '1a1'=>NaN,                 |
|           boolean           |  number  | true=>1, false=>0                                    |
|            array            |  number  | []=>0, [6]=>6（存在一个元素且为数字）, 其他情况=>NaN |
|            null             |  number  | 0                                                    |
| 除了数组的引用类型｜ number |   NaN    |
|           symbol            |  number  | 抛错                                                 |
|              -              |    -     | -                                                    |
|           string            | boolean  | ''=>false,其他都为 true                              |
|           number            | boolean  | 0=>false, -0=>false, NaN=false                       |
|       null、undefined       | boolean  | false                                                |
|          引用类型           | boolean  | true                                                 |
|              -              |    -     | -                                                    |
|           number            |  string  | eg:5=>'5'                                            |
|           boolean           |  string  | true=>'true', false=>'false'                         |
|            array            |  string  | []=>'', [1,2]=>'1,2'                                 |
|            对象             |  string  | '[Object Object]'                                    |

📝 来做个练习吧

```js
//=>number
Number("");
Number("1");
Number("11a");
Number("abc");
Number(true);
Number(false);
Number([]);
Number([3]);
Number([1, 2]);
Number(null);
var a = new Symbol();
Number(a);
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

📝 来做个练习吧

```js
// =>string
String(1);
String(true);
String(false);
String([]);
String([1, 2]);
var p = new Object();
String(p);
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

📝 来做个练习吧

```js
// =>boolean
Boolean(0);
Boolean(-0);
Boolean(NaN);
Boolean(a);
Boolean(1);
Boolean("");
Boolean("1");
Boolean(null);
Boolean(undefined);
Boolean([]);
Boolean([1]);
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

- 判断值是否相等，相等返回 true
- 判断是否为 null 和 undefined,是就返回 true
- 判断是否为 string 和 number，是的话就把 string 转换成 number,再比较值是否相等
- 判断其中一方是否为 boolean，是的话就把 boolean 转换成 number，再比较
- 判断其中一方是否 Object，且另一方为 String、number、或者 Symbol,会将 Object 转换成字符串，再比较
  📝 来做个练习吧

```js
[] == ![];
"34" == 34;
null == undefined;
"34a" == "34";
NaN == NaN;
```

<details><summary>答案</summary>
<p>true</p></br>
<p>true</p></br>
<p>false</p></br>
<p>false </p></br>
NaN表示非数字值，特殊之处：它和任何值都不相等，包括自身。判断NaN的方法：x!=x返回true
</details>

<!-- 函数
原型链
闭包
类
语法糖
同步异步
ajax
渣渣 -->

## Dom 操作有哪些？

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

## 字符串 String

- **toLowerCase、toUpperCase**：转换大小写

```js
var str = "Hello";
var new_str = str.toLowerCase();
console.log(new_str); //hello

var new_str1 = new_str.toUpperCase();
console.log(new_str1); //HELLO
```

- **操作方法**

```js
//concat 将指定字符串连接到此字符串的结尾
var str = "Hello,";
var str1 = "World";
var new_str = str.concat(str1);
console.log(new_str); //Hello,World

//replace 用来查找匹配一个正则表达式的字符串，然后使用新字符串代替匹配的字符串。
var str = "Hello world!";
console.log(str.replace(/Hello/, "Hi")); //Hi world!

//substring 传入参数是起始位置和结束位置
var str = "banana";
var new_str = str.substring(1); //起始位置1开始到结束位置
console.log(new_str); //anana
var new_str1 = str.substring(1, 4); //起始位置1开始，但不包含结束位置
console.log(new_str1); //ana

//substr 传入参数是起始位置和长度
var str = "banana";
var new_str = str.substr(1); //起始位置1开始到结束位置
console.log(new_str); //anana
var new_str1 = str.substr(2, 4); //起始位置1开始，截取4长度
console.log(new_str1); //nana

//slice 和substring(start,end)类似，只不过slice的参数可以为负数；
var str = "Happy Birthday!";
console.log((new_str = str.slice(2))); //ppy Birthday!
console.log((new_str1 = str.slice(-2))); //y!
console.log((new_str2 = str.slice(2, 7))); //ppy B
console.log((new_str3 = str.slice(-6, -2))); //thda

//search 检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串，返回字符串中匹配的索引值。否则返回 -1
//不可设置开始检索的位置
var str = "banana";
var new_str = str.search(/a/);
console.log(new_str); //1

//match 检查一个字符串匹配一个正则表达式内容，如果没有匹配返回 null。
var str = "Hello world!";
console.log(str.match("world")); //world
console.log(str.match("World")); //null
console.log(str.match("world!")); //world!
```

- **位置方法**

```js
//indexOf 可返回某个指定的字符串值在字符串中首次出现的位置。查找失败返回-1,
//可设置开始的检索位置
var str = "banana";
var new_str = str.indexOf("a");
console.log(new_str); //1
var new_str1 = str.indexOf("a", 2);
console.log(new_str1); //3

//lastIndexOf、
//charAt 返回指定位置的字符。
var str = "banana";
var new_str = str.charAt(3);
console.log(new_str); //a
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

## 数组 Array

1. 创建方法

```js
//Array构造函数 可用new操作符，也可不用
var colors = new Array(); //生成一个空数组
var colors = new Array(3); //生成包含3项的数组
var colors = Array("banana"); //生成一个包含一项，即字符串为"banana"的数组

//数组字面量表示法
var colors = []; //创建一个空数组
var colors = [1, 2]; //<=IE会创建3项，其他浏览器会创建2项
var colors = [, , , ,]; //<=IE8会创建5项，其他浏览器会创建4项
```

2. 转换方法

```js
var colors = ["red", "blue", "green"];
console.log(colors.toString()); //red,blue,green
console.log(colors.valueOf()); //["red","blue","green"];
console.log(colors); //["red","blue","green"];
console.log(colors.join("|")); //red|blue|green
```

3. 方法

- **push()和 pop()**：从数组末尾添加移除

```js
//后进先出
var colors = ["red", "blue"];
colors.push("green");
console.log(colors); //red,blue,green
colors.pop();
console.log(colors); //red,blue
```

- **shift()和 unshift()**：从数组前端删除、添加项

```js
//先进先出
var colors = ["red", "blue"];
colors.push("green");
console.log(colors); //red,blue,green
colors.shift();
console.log(colors); //blue,green

//后进先出
var colors = ["red", "blue"];
colors.unshift("green");
console.log(colors); //green,red,blue
colors.shift();
console.log(colors); //red,blue
```

- **reverse()和 sort()**：重排序

```js
//反转数组项顺序
var colors = ["red", "blue", "green"];
console.log(colors.reverse()); //green,blue,red

//升序
var nums = [0, 1, 5, 10, 15];
console.log(nums.sort()); //0,1,10,15,5
//为什么会这样呢，因为sort()是根据字符串比较的
```

- **concat()**：基于当前数组的所有项再创建一个数组

```js
var colors = ["red", "blue", "green"];
var new_colors = colors.concat("yellow");
console.log(new_colors); //red,blue,green,yellow
```

- **splice()**： 基于当前数组的一个或多个项创建一个新数组

```js
var colors = ["red", "blue", "green", "yellow", "purple"];
//一个参数时，返回参数以及之后的所有项
var new_colors = colors.slice(2);
console.log(new_colors); //green,yellow,purple

//两个参数时，参数分别为起始位置和结束位置,从起始开始但不包含结束
var new_colors = colors.slice(2, 3);
console.log(new_colors); //green
```

- **indexOf()和 lastIndexOf()**

```js
var nums = [1, 2, 3, 4, 5, 4, 6];
console.log(nums.indexOf(4)); //3
console.log(nums.lastIndexOf(4)); //5
```

- **迭代方法**

```js
//🍊every()——如果每一项都返回true,则返回true 不改变原数组
//🍊some()——任一项返回true,则返回true  不改变原数组
var arr = [
  { name: "aaa", sex: 0, age: 18 },
  { name: "bbb", sex: 1, age: 18 },
  { name: "ccc", sex: 0, age: 18 },
];
var every = arr.every(function (obj) {
  //一假即假
  return obj.sex == 0;
});
var some = arr.some(function (obj) {
  //一真即真
  return obj.name == "aaa";
});
console.log(every, some); //false true

//🍊filter()——返回执行结果为true的结果组成的数组  不改变原数组
var filter = arr.filter(function (obj) {
  return obj.sex == 0;
});
console.log(filter);
// [{name: "aaa", sex: 0, age: 18}
// {name: "ccc", sex: 0, age: 18]

//🍊map()——返回每一次函数调用结果组成的数组 不改变原数组
var map = arr.map(function (obj) {
  return obj.age + 1;
});
console.log(map); //[19,19,19]

//🍊forEach()——每一项都运行，无返回 ❗️改变原数组❗️
arr.forEach(function (obj) {
  if (obj.sex == 0) {
    obj.sex = "女";
  } else {
    obj.sex = "男";
  }
});
console.log(arr);
// [{name: "aaa", sex: "女", age: 18}
// {name: "bbb", sex: "男", age: 18}
// {name: "ccc", sex: "女", age: 18}]
```

- **归并方法**

```js
//reduce()
var arr = [1, 2, 3, 4];
var res = arr.reduce((x, y) => x + y);
console.log(res);
//reduceRight()
```

- **数组转字符串**

```js
var num = [1, 2, 3];
num.join("|");
("1|2|3");
```

- **ES6 方法**

```js
//🍊form() 将类似数组的对象和可遍历的对象转化为真正的数组
const arr = ["a", "b", "c"];
Array.from(arr); //["a", "b", "c"]
Array.from("foo"); //["f","o","o"]

//🍊find() 传入一个回调函数，找到数组中符合当前搜索规则的第一个元素
var arr = [1, 2, 3, 4, 5, 6, 7, 8];
var findarr = arr.find((n) => n % 2 == 0);
console.log(findarr); //2

//🍊findIndex() 传入一个回调函数，找到数组中符合当前搜索规则的第一个元素，返回它的下标，终止搜索
var arr = [1, 2, 3, 4, 5, 6, 7, 8];
var findArr = arr.findIndex((n) => n % 2 == 0);
console.log(findArr); //1

//🍊fill() 用一个新元素替换数组内的元素，可以指定替换下标范围
// fill(value,start,end)
var arr = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(arr.fill(886, 2, 5)); //[1, 2, 886, 886, 886, 6, 7, 8]
console.log(arr.fill(886, 2)); //[1, 2, 886, 886, 886, 886, 886, 886]
```

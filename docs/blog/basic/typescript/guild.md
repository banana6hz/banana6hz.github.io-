## TypeScript
`TypeScript` 是 `JavaScript` 的一个超集,支持 ECMAScript 6 标准。听起来敲厉害的是不是 🧐

## TS的数据类型  
JS有很多种数据类型：null、undefined、boolean、string、number、symbol、object。在JS中，值是可以随时改变变量的类型的。  
```js
var bool = true;
bool = "str"; // 此时变量bool就从boolean转换成string了
```
而在TS里不会允许这样的变化，因为他是一种强类型语言。那他又有哪些类型呢？
- `boolean` `number` `string` `null` `undefined` `symbol`
- `null` 和 `undefined` 只能被赋值为null和undefined,`null` 和 `undefined`类型是所有类型的子类型？？
- `void` 空类型
- `any`类型
- 类型判断：如果变量在声明的时候，没有定义其类型，会被标示为默认类型
```js
let lhz = "banana" // lhz会被自动标示为string类型
lhz = 1024 //报错
```
- 联合类型
- `enum` 枚举：用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。
- 数组泛型
- 数组类型
- 元组类型
- 函数类型

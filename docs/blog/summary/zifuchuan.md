## 字符串操作合集
#### 多次复制一个字符串
```js
const banana = 'happy'
console.log(banana.repeat(3)) //happyhappyhappy
```

#### 填充一个字符串到指定长度
```js
const start = '123'.padStart(8, '0')
console.log(start) // 00000123

const end = '321'.padEnd(8, '0')
console.log(end) // 32100000
```

#### 字符串拆分为数组
- split()
```js
const str = 'banana'
const arr = str.split('')
console.log(arr) // "b", "a", "n", "a", "n", "a"]
```

- 展开运算符...
```js
const str = 'banana'
const arr = [...str]
console.log(arr) // "b", "a", "n", "a", "n", "a"]
```

#### 反转字符串中的字符
```js
const str = 'banana'
const newStr = [...str].reverse().join('')
console.log(newStr) // ananab
```

#### 检查字符串是否以特定序列开头或结尾
```js
const str = 'hello banana'
console.log(str.startsWith('hello')) // true
console.log(str.endsWith('banana')) // true
```

#### 检查字符串中是否包含特定序列
```js
const str = 'hello banana'
console.log(str.includes('bana')) //true
```
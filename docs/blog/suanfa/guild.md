## 求一个字符串中出现次数最多的字符
```js
var str = "banana"
var o = {};
for (var i=0;i<str.length;i++){
  var char = str[i];//var char = str.charAt(i)
  if(o[char]){
    o[char]++;
  }else{
    o[char] = 1
  }
}
console.log(o)//{b:1,a:3,n:2}
var max = 0;//出现最多的字符次数
var maxChar = ""; //出现次数最多的字符
for(var key in o){
  if(o[key]>max){
    max = o[key]
    maxChar = key
  }
}
console.log(max,maxChar)
```

## 求一个数组的最大值
```js
var arr = [1,54,87,45,67,34,90]
maxArr = Math.max.apply(null,arr)
maxArr1 = Math.max(...arr)
console.log(maxArr,maxArr)
```
## 将一个数组分成多个数组，并且每3个一组，如【1，2，3，4，5，6，7，8，9]变成【【1，2，3】，【4，5，6】，【7，8，9】】
```js
var arr = [1,2,3,4,5,6,7,8,9]
var result = []
for(var i=0;i < arr.length;i+=3){
    result.push(arr.slice(i,i+3))
}
var newArr = []
for(var i = 0;i<result.length;i++){
  newArr.push(result[i])
}
console.log(Array.from(newArr))
```

## 将【{name:"lhz",age:18,class:"1班"}，{name:"zhl",age:20,class:"2班"},...],按班级分组
```js
let arr = [
  {name:"lhz",age:18,class:"1班"},
  {name:"zhl",age:20,class:"2班"},
  {name:"ccc",age:20,class:"1班"},
  {name:"lhh",age:20,class:"2班"},
  {name:"bhi",age:20,class:"2班"},
  {name:"aaa",age:20,class:"3班"},
  {name:"aba",age:20,class:"1班"},
  {name:"ede",age:20,class:"3班"}
]
let map = {}
for (let i = 0; i < arr.length; i++) {
    let ai = arr[i]
    if (!map[ai.class]) {
        map[ai.class] = [ai]
    } else {
        delete ai.class
        map[ai.class].push(ai)
    }
}
let res = []
Object.keys(map).forEach(key => {
    res.push({
        id: key,
        name: map[key]
    })
})
console.log(res)
```
```js
let arr = [
    { province:"广东省", city:"广州市",district:"天河区" },
    { province: "广东省", city:"广州市",district:"白云区" },
    { province: "广东省", city:"东莞市",district:"常平镇" }
]
let map = {}
for (let i = 0; i < arr.length; i++) {
    let ai = arr[i]
    let newai = JSON.parse(JSON.stringify(ai))
    delete newai.city
delete newai.province
    if (!map[ai.city]) {
        map[ai.city] = [newai]
    } else {
        map[ai.city].push(newai)
        
    }
}
let res = []
Object.keys(map).forEach(key => {
    res.push({
        id: key,
        name: map[key]
    })
})
console.log(res)
```

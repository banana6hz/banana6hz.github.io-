## 声明提升   
**声明提升**：变量或者函数的声明会被提升到<u>该执行环境的顶部</u>，如果是在全局环境声明的变量或函数，那么就会被提升到全局环境的顶部。这就意味着可以把声明语句放在执行语句后面。

🚗变量的赋值可以分为三个阶段  
- 创建变量：在内存中开辟空间
- 初始化变量：将变量初始化为undefined
- 赋值变量：给变量赋值

🚗对于let、var、function
- let 的「创建」过程被提升了，但是初始化没有提升。</br>
<font color="#425fe;">（如果在声明语句之前访问变量，会出现暂时性死区:Uncaught ReferenceError: name is not defined）</font>
- var 的「创建」和「初始化」都被提升了。<br>
<font color="#425fe;">（如果在声明语句之前读取，值为undefined）</font>
- function 的「创建」「初始化」和「赋值」都被提升了。</br>
<font color="#425fe;">（可在声明语句之前调用）</font>

💥注意：函数表达式不会提升。函数声明会优于变量提升。

## Set和Get的集合
- Set：Set类型是一种有序列表，其中含有一些相互独立的<font color="#f34134;">非重复</font>值
- Map：Map类型是一种储存着许多键值对的有序列表。

## Promise
#### 含义
Promise是一个<u>异步编程</u>的解决方案，比传统的异步解决方案【回调函数】和【事件】更合理、更强大。它是一个容器，里面保存着未来某个时间点才会结束的事件。  

它有三种状态：
- pending：进行中
- fulfilled：已经成功
- rejected：已经失败

他们之间的转换是不可逆的，并且只能是：
- pending => fulfilled
- pending => rejected  

只要他们的状态改变了就不会再改变，而是一直保持这个结果，称为 <u>resolved(已定型)</u>

#### 基本用法
```js
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
})
promise.then(() => {
  console.log(3)
})
console.log(4)//1 2 4 3
```

```js
let p = new Promise(function(resolve,reject){
  //resolve();
  reject()
})
p.then(
  success=>{
    console.log('如果Promise执行resolve()，则触发success')
  },
  err=>{
    console.log('如果Promise执行reject()，则触发调用err')
  }
)
```

#### 题解
```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})
const promise2 = promise1.then(() => {
  throw new Error('error!!!')
})
console.log('promise1', promise1)
console.log('promise2', promise2)
setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)

//promise1 Promise { <pending> }
//promise2 Promise { <pending> }
//(node:50928) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: error!!!
//(node:50928) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
//promise1 Promise { 'success' }
//promise2 Promise {
  //<rejected> Error: error!!!
    //at promise.then (...)
    //at <anonymous> }
```
### Promise 链式调用的执行顺序
🌰首先来看看一道题：
```js
const promise1 = new Promise(resolve => {
    console.log('Promise1');
    resolve();
});
promise1
    .then(() => console.log(1))
    .then(() => console.log(2))
    .then(() => console.log(3));

const promise2 = new Promise(resolve => {
    console.log('Promise2');
    resolve();
});
promise2
    .then(() => console.log(4))
    .then(() => console.log(5))
    .then(() => console.log(6));
```
在开始解析之前，要清楚Promise能链式调用的原理  
即：<font color="#f34134;">Promise的then/catch方法执行后也会返回一个新的Promise，then()负责注册回调函数，直到前面的Promise 变成了 resolved/rejected 状态，才会将回调推入微任务队列中。</font>  
解析：  
:one: : 主线程执行`console.log('Promise1');`,遇到resolve(),把`console.log(1)`推进微任务。  
<font color="#425fe;">【console.log(1)】</font>  
:two: : 主线程执行`console.log('Promise2');`,遇到resolve(),把`console.log(4)`推进微任务。  
<font color="#425fe;">【console.log(1)、console.log(4)】</font>  
:three: :此时主线程为空，执行微任务`console.log(1)`,promise1的第一个then()状态变成了resolved,将promise1的第二个then()推进微任务。  
<font color="#425fe;"> 【console.log(4)、console.log(2)】</font>   
:four: :执行微任务`console.log(4)`,promise2的第一个then()状态变成了resolved,将promise2的第二个then()推进微任务。  
<font color="#425fe;"> 【console.log(2)、console.log(5)】</font>  
:five: :执行微任务`console.log(2)`,promise1的第二个then()状态变成了resolved,将promise1的第三个then()推进微任务。   
<font color="#425fe;"> 【console.log(5)、console.log(3)】</font>  
:six: :执行微任务`console.log(5)`,promise2的第二个then()状态变成了resolved,将promise2的第三个then()推进微任务。  
<font color="#425fe;"> 【console.log(3)、console.log(6)】</font>  
:seven: :执行微任务`console.log(3)、console.log(6)`  
✨所以执行结果为：`1、4、2、5、3、6`  

🌰好我们再来一道题练习一下：
```js
new Promise((resolve, reject) => {
  console.log("外部promise");
  resolve();
})
  .then(() => {
    console.log("外部第一个then");
    new Promise((resolve, reject) => {
      console.log("内部promise");
      resolve();
    })
      .then(() => {
        console.log("内部第一个then");
      })
      .then(() => {
        console.log("内部第二个then");
      });
  })
  .then(() => {
    console.log("外部第二个then");
  });
  //外部promise
  //外部第一个then
  //内部promise
  //内部第一个then
  //外部第二个then
  //内部第二个then
```


#### Promise A+

## Generator
emmm Generator也是异步编程短的一种结局方案哦

## async/await
async是什么，书里说是Geneator的语法糖🙃  
async函数会返回一个Promise对象,然后可以用then方法添加回调函数，一旦遇到await会先返回，等到异步操作完成之后，接着执行函数体内的语句

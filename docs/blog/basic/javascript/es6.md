## Promise
### 含义
Promise是一个<u>异步编程</u>的解决方案，比传统的异步解决方案【回调函数】和【事件】更合理、更强大。它是一个容器，里面保存着未来某个时间点才会结束的事件。  

它有三种状态：
- pending：进行中
- fulfilled：已经成功
- rejected：已经失败

他们之间的转换是不可逆的，并且只能是：
- pending => fulfilled
- pending => rejected  

只要他们的状态改变了就不会再改变，而是一直保持这个结果，称为 <u>resolved(已定型)</u>

### 基本用法
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

### 题解
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

### 过滤器

用于对数据进行特定格式化再显示 ，可以用 method/computed 也可以用 filter 哦  
用管道符隔开，eg: `{{ time | formatTime}}`
使用示例：`formatTime`里面写过滤的逻辑，默认是传一个参数为这个过滤对象的值，这里是 time，
也可以传入参数 eg {{ time | formatTime(YYYY-MM-DD)}},然后函数这么写

```js
filter:{
    formatTime(value, str) {
        console.log(value) // time的值
        console.log(str) // YYYY-MM-DD
        return '2022-02-22'
    }
}
// 补充下ES6的形参默认值
filter:{
// str='YYYY/MM/DD'的意思是：如果有第二个参数，那么str就传入的值
// 如果没有传, 那么str='YYYY/MM/DD'
  formatTime(value, str='YYYY/MM/DD') {
      return '2022-02-22'
  }
}
```

- filter 可以串联:{{ time | formatTime(YYYY-MM-DD) | handleSlice}}，这里有两个过滤器，time 是 formatTime 的参数，formatTime 的结果是 handleSlice 的参数
- vue 里面的过滤器是局部的，只能用与当前的 vue 实例。如果有组件，那这个过滤器只能用与当前组件，其他组件是没有办法去调用这个组件的过滤器的。如何创建一个全局的过滤器呢？可以通过 vue.filter()去注册

```js
// 全局过滤器
Vue.filter("handleSlice", function (val) {
  return val.slice(0, 3);
});
```

- vue 的过滤器可以用于插值语法和 v-bind 的数据，v-model 的不行哦

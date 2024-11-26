### computed

计算属性：当你的数据需要由其他几个数据得出的时候，可以使用这个计算属性  
 计算属性`computed`其实也可以被**插值语法**替代
 ```js
//简单的逻辑:
// <p>{{firstName}} - {{lastName}}<p>
// 较复杂一点的逻辑:函数
// <p>{{getFullName()}}</p>
 ```
但是计算属性 computed 有它的优势: **缓存**

```js
姓：<input type="text" v-model="firstName"><br/>
名：<input type="text" v-model="lastName"><br/>
// 使用methods
全名：<span>{{getFullName()}}</span>
全名：<span>{{getFullName()}}</span>
// 使用computed
全名：<span>{{fullName}}</span>
全名：<span>{{fullName}}</span>

// 1. 使用methods
//    - 页面引用了两次fullName，getFullName会执行两次
//    - fistName/lastName的每次变化都会执行getFullName
methods: {
    getFullName(){
        console.log('执行getFullName') // fistName/lastName每次变化都会执行
        return this.fistName.slice(1,3).toUpperCase() + '-' + this.lastName.toUpperCase()
    }
}
// 2. 使用computed
//    - 页面引用了两次fullName，get只会执行一次。当第一次读取到fullName的时候会执行get，然后再次读取是直接拿缓存的值，不会再执行get()。这就是computed的缓存属性
//    - fistName/lastName的每次变化都会执行get
//    - 当fullName被修改时,computed的set会被调用
computed: {
    fullName{
        get() {
            // get的调用: 1. 初次读取时 2.当依赖的数据发生改变时
            console.log('执行了get')
            return this.firstName + '-' + this.lastName
        }，
        set(value) {
            // set的调用: 当fullName被修改时
            // 如果计算属性要可以被修改，则要写一个set()去响应修改
            // 并在里面把这个计算属性的依赖的值改了，页面的值才会跟着改
            const arr = value.splite('-')
            this.firstName = arr[0]
            this.lastName = arr[1]
        }
    }
    // 当计算属性只有get时可以简写成下面的方式
    fullName: function() {
        return this.firstName + '-' + this.lastName
    }
}
```

> 1. computed 中 get 的执行逻辑和 Object.definedPropoty 里面的 get()是一样的，因为 computed 底层实现就是用的 Object.definedPropoty
> 2. get/set 里面可以通过 this 调用到 Vue 实例中的 data, 是因为 get/set 的 this 被绑定到了 Vue 实例上

### watch

监听属性：监听某个值的变化，然后去做一些操作。当监听的属性发生变化时，回调函数会自动调用

- watch 有两个配置项：`immediate: true`(开启立即监听)，`deep：true`(开启深度监听)，默认值为 false
- watch 默认只监听一层，如果要监听的值是一个对象，默认是监听不到对象属性的变化的，因为这个对象的地址没有发生改变，需要开启深度检测`deep:true`（vue 自身可以监测对象内部值的改变，比如直接在控制台修改多层级的数据，页面也会跟着改变，但 vue 提供的 watch 默认不可以）

```js
<input type="text" v-model="menu.meat"/>
<input type="text" v-model="menu.vagetable"/>
<p>今天吃{{menu.meat}}和{{menu.vagetable}}</p>

data: {
    menu: {
        meat: ''，
        vagetable: ''
    }
}
watch:{
    // 监听对象的某个属性
    'menu.meat': {
        hander(newValue, oldValue) {
            console.log('menu.meat发生了改变')
        }
    }
    // 监听整个对象,
    'menu': {
        hander(newValue, oldValue) {
            console.log('menu发生了改变')
        },
        deep: true // 深度检测
    }
}
```

- 当只是检测单层属性，并且无需配置立即检测，可以使用简写形式，切记要用普通函数的写法，不能用箭头函数

```js
watch: {
    isMeat(newValue, oldValue) {
        console.log('isMeat发生了改变')
    }
}
// 或者
vm.$watch('isMeat', function(newValue, oldValue) {
    console.log('isMeat发生了改变')
})
```

### 3. computed 和 watch 的区别

- computed 的功能 watch 都能完成，但是 computed 有缓存属性。如果一个两者都能实现，优先用 computed
- 如果某个值依赖于多个其他的值，用 computed
- 如果一个值变化之后需要进行一些比较复杂的逻辑，可以用 watch, 比如 1s 后另外一个值会发生变化
- computed 不能进行异步操作，watch 可以异步返回
- watch 里面用 setTimeout 的话，要用箭头函数。如果用普通函数，setTimeout 的 this 是 windows。用箭头函数，this 指向的是 setTimeout 写入的位置，也就是 watch 的对象，这时 this 才是指向 vm
- vue 管理的函数都要写成普通函数，这样 this 才是指向 vue 实例。setTimeout， ajax， promise 的回调函数这些就写成箭头函数，这样 this 才是指向 vue 实例

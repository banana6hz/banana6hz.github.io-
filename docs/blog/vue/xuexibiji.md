### vue 的生命周期

> 想看看每个生命周期的具体详情，可以在生命周期函数里面加 debugger

- **beforeCreate**：初始化生命周期、事件，数据代理还未开始，无法通过 vm 访问 data 中的数据，methods 中的方法。这里说的创建之前并不是指 vm 创建之前，beforeCreate 的 this 也不是 vm，而是指数据检测、数据代理的创建之前
- **created**: 初始化数据检测、数据代理，可以通过 vm 访问 data、methods
- **beforeMount**: 已经创建虚拟 dom, 但是还没挂载到页面， 页面呈现的是未经 vue 编译的 DOM 结构，还不能显示模版里面的内容 ，不能访问 el，不能操作 dom
- **mounted**: 虚拟 Dom(也会在内存中存一份，为了进行 diff 算法 )已经挂载到了虚拟 dom, 可以访问 el，可以操作 el。此时页面中呈现的是经过 vue 编译的 dom。此时初始化过程结束，一般在此进行，开启定时器，发送网络请求，订阅消息，绑定自定义事件、等初始化操作。
- beforeUpdate: 当数据发生改变时会触发，此时数据是新的，但是页面上是旧的，页面和数据尚未同步
- **updated**：此时页面上的数据是新的，beforeUpdate 和 updated 之间会执行 diff 算法
- **beforeDestroy**: vm 所在的 data、methods、指令等都可用，但是如果在这个阶段对数据操作页面不会再更新(无效)。然后马上要执行销毁过程，一般在此阶段：关闭定时器，取消订阅消息，解绑自定义事件等，
- **destroyed**: vm 所在的 data、methods(自定义)、指令等都被销毁，但是原生 DOM 事件依然有效，vue 开发工具看不到任何信息

### vue 的指令

- v-for：用于遍历数组/对象/字符串/指定次数
  - 使用时需要搭配 key，这个 key 是给 vue 去使用的，页面不会把这个 key 渲染出来
  - key 必须的， 且值是能唯一识别数据的，如果没写，会默认用 index 作为 key
  - 以 index 作为 key 是有问题的，比如对数据进行逆序添加、逆序删除等破环数据顺序的操作会产生不要的 DOM 更新，如果结构中包含输入类标签，会发生错误的 DOM 更新。
    > 如果不写 key 或者用了 index, 当每一项有该项的值并且还有个有输入值的 input 框，然后给这个数组从头部添加项时，期望是在列表添加多一项，后面是个空的 input 框，而实际是新增的那一项的 input 框会有值，值为添加前第一项的值，并且后面项的 input 框的值，都会以此类推往上移，最终是最后一项的 input 框为空
  - key 是 diff 算法的核心，是根据这个 key 去判断 DOM 节点是否可以复用。根据 key 比较两个节点的内容是否相同，相同直接复用；不相同则直接生成真实 DOM；若在旧的虚拟 DOM 中找到不，则创建新的真实 DOM
- v-if:
  - 条件渲染，如果为 ture，就**渲染**这个元素，如果是 false,就不渲染这个元素。
  - 可以和 v-else-if、v-else 搭配使用，但是中间不能被打断，不然会报错。
  - 可以和 template 搭配使用，template 本身不会被渲染成 html 标签
- v-show
  - 条件显示，如果为 true,就会**显示**这个元素，如果为 false，就不显示这个元素
  - v-show 切换的是 css 中 display 属性，不管是 true 还是 false，页面都有这个元素只是不一定显示，但是 v-if 切换的是是否去渲染这个元素
  - 不能和 tempalte 搭配使用
- v-pre: 没有值，添加之后会跳过其所在节点的编译过程，你写的啥就是啥，vue 不会去处理。利用好这个指令，可以跳过部分节点，提高编译效率，优化性能
- v-text：向其所在的节点中渲染文本内容，v-text 会替换掉节点中的内容
- v-html：向指定节点中渲染包含 html 结构的内容，可以识别 html 结构。有安全隐患，使用不当容易造成 xss 攻击。比如可能造成 cookie 的泄漏。不能信任服务器内容，一定要在可信的内容上用 v-html
- v-once：没有值，添加该指令后表示只动态渲染一次，之后就不会变了
- v-clock：没有值，可以结合 css 去隐藏因 vue 实例创建未完车而出现插值语法`{{banana}}`，等 vue 实例创建并接管容器后，vue 会自动删除。可以解决网速慢时页面展示出{{xx}}的问题
- 自定义指令 directive： 自定义指令其实就是自定义一些 dom 的操作
  - 自定义指令指令的执行：
  1. 与元素初次绑定时会执行。
  2. 指令所在的模板重新解析时会执行，比如修改同个模板的其他数据值，也会执行，因为模板重新解析了
  - 自定义指令的写法：
    1. 函数式：指令在函数里面写 dom 操作，但这个会有一些问题，指令与元素初次绑定时会执行，但是绑定成功不代表页面已经有这个元素(与生命周期有关)，有些 dom 操作不会执行，比如 dom.focus(),
    2. 对象式：对象里面有是三个函数
       - bind(el,binding): 指令与元素绑定时执行
       - inserted(el,binding): 指令所在的元素插入页面时执行
       - update(el,binding): 指令所在的模版被重新渲染时调用
    3. 局部使用：在当前 vue 实例中配置 directive，如果指令名是多个单词组成，推荐写法是：`v-my-banana`,`my-banana`
    4. 全局使用：指令只能用于当前 vue 实例里面的元素，如果需要在全局使用，对象式：`Vue.directive('mbind', {})`/ 函数式：`Vue.directive('mbind', function(){})`
  - 自定义指令的指向：所有指令里面的 this 指向都是 window
- v-model:数据的双向绑定
  - 修饰符
    - lazy: 失去焦点再收集数据
    - number: 输入字符串转为数字
    - trim: 首尾去空
  - 使用注意：
    - 如果绑定的是 input 的输入值，用 v-model。如果绑定的不能输入的值，如 radio，用了 v-model 绑定之外要用配置 value 值。如果是单个 checkBoxd 的绑定，如没有配置 value，则绑定的是 true/false。如果是多个 checkBoxd 的绑定，如果配置了 value，初始值是非数组，则绑定的是 true/false，而且只要一个勾选其他也会勾选。如果初始值是数组，则绑定的是选中的值组成的数组，勾哪个就会有哪个。
    - 原生的 input，可以通过 type 指定 number，这样就只能输入数字，但是结果还会是字符串数字。而修饰符 number 是指，可以输入字符但是最终结果会帮你转成数字，比如输入 3a0 的结果是 3，不是'3'

### class 的绑定

- 字符串写法：绑定一个 class, 绑定的是个字符串变量,可以修改这个字符串变量，实际要绑定的 class 名是不确定的额，可修改的

```js
 <p :class="myClass">绑定class</p>
 data:{
    myClass: 'blue'
 }
```

- 数组写法：绑定一个或多个 class, 绑定的是个由 class 名组成的数组，可能被绑定的 class 名是不确定的，要绑定 class 名个数也是不确定的，可以通过增删这个数组来修改最终绑定的 class

```js
 <p :class="myClass">绑定class</p>
 data:{
    myClass: ['blue', 'bold', 'banana']
 }
```

- 对象写法：绑定一个或多个 class, 绑定的是个对象，名字是确定的，最终要不要绑定这个名字的 class 可以通过修改这个对象属性的布尔属性进行修改

```js
 <p :class="myClass">绑定class</p>
 data:{
    myClass: {
        blue: false
        bold: true,
        banana: true
    }
 }
```

### style 的绑定

style 绑定的必须是个对象，而且对象中的 key 是要按规范的，不能瞎写，不能有斜杠，多个字母组成的用驼峰命名：`:style="{fontSize: num + 'px'}"`,其中 num 是 data 里面定义的数据  
style 也可以绑定一个对象数组，比如:style="[{fontSize: num + 'px'}，{color: mycolor}}]"

### computed

计算属性：当你的数据需要由其他几个数据得出的时候，可以使用这个计算属性  
 计算属性`computed`其实也可以被**插值语法**(简单的逻辑:`<p>{{firstName}} - {{lastName}}<p>`),或者函数(较复杂一点的逻辑:`<p>{{getFullName()}}</p>`)替代，
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

### 数据检测

vue 中大魔法之一就是数据的双向绑定，而数据的双向绑定是依赖于数据检测的，这个数据监测是怎么实现的呢？是通过`Object.defineProperty()`实现的哦

```js
function Observe(obj) {
  const keys = Object.keys(obj);
  keys.forEach((k) => {
    Object.defineProperty(this, k, {
      get() {
        return obj[key];
      },
      set(val) {
        obj[key] = val;
      },
    });
  });
}
```

- 检测的时候，如果`get`和`set`是用的本身，会造成死循环，所以检测的时候需要用`this`
- 不能检测到新属性，如果需要检测新加的属性，需要用`vue.$set`。而且只能给 data 里面的对象添加新属性，不能直接给 data 添加新属性
- `Object.defineProperty`是不能检测数组的变化的，vue 改写了数组的七个方法，实现了：1. 调用 Array.prototype.push 2. 重新解析模版,进而更新页面
- 在 vue 里面修改数组可以用那七个方法，也可以用 vue.$set

### 组件

创建组件并使用

```js
const banana = Vue.extend({
    // 不要写el，只有new Vue才可以写
    template: `
        <div>I am banana.</div>
    `,
    data(){
        // data必须是个函数，如果data是个对象，当组件复用时，data引用的都是同一个地址
        return {
            age: 18
        }
    }
})
// 在要用的地方注册组件
new Vue({
    el:'#root',
    // 创建vm时的data可以是对象，而组件的data必须是函数
    data: {
        msg: '我爱学习',
    },
    // 注册组件（局部注册）
    components: {
        banana
    }
})

// 全局注册组件： Vue.component('组件名', 组件)，在其他也买呢也可以使用
Vue.component('banana', banana)


// 在页面写上组件标签
<div id="#root">
    <div>{{msg}}</div>
    <banana></banana>
</div>
```

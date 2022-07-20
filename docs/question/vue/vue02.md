<!-- vue 原理篇 -->

## :white_medium_square: 1. vue 的双向数据绑定是怎么实现的？

#### 1. 什么是双向绑定？

Vue 是 MVVM 的模式，在 MVVM 框架下，通过 ViewModel，View 数据的变化会同步到 Model,而 model 数据的变化也会立即反应到 View 上。也就是说，不需要手动操作 DOM 就实现了内容的实时更新。

- 输入框内容变化时，Data 中的数据同步变化。即 View=>Data
- Data 中的数据变化，文本节点的内容同步变化。即 Data=>View

#### 2. 双向绑定的原理是什么？

首先看看这张图
![shuangxiangbangding](../../.vuepress/imgs/interview/vue/shuangxiangbangding.png)  
图中有几个需要了解的东西

- Observer: **数据监听器**,能够对数据的所有属性进行监听，利用 Object.defineProperty()对属性都加上 setter 和 getter。当给一个属性赋值时，就会触发 setter，那么就能监听到数据的变化了。
- Dep：**消息订阅器**，内部有一个收集订阅者(Watcher)的数组，对监听器和订阅者统一管理
- Watcher：**订阅者**，连接 Observer 和 Compile 的桥梁，主要任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息，触发解析器的更新函数。
- Compile：**指令解析器**，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新数据。

首先，Vue 通过 Object.defineProperty 方法属性拦截的方法，把 data 对象里每个数据的读写转化成 getter 和 setter，当数据变化时，通知数据更新。  
数据更新是基于发布-订阅模式实现的。在这个模式下，数据是发布者(Observer),依赖对象是订阅者(watcher),他们需要一个中间人来传递，那就是订阅器(Dep)。  
**总结**：vue 通过数据监听器拦截数据变化，这个数据监听是通过 Object.defindeProperty 方法，他可以把属性的读写转化成 getter 和 setter，当一个属性被赋值的时候，就会触发 setter 函数，从而实现数据的监听。当监听到数据变化之后，会通过一个订阅器通知订阅者某个属性值发生变化，而这个订阅者会结合一个可以对元素指令进行扫描和解析的指令解析器去更新最新的数据。

#### 3. 双向数据绑定有什么缺点？

**Object.defineProperty 不能监听数组下标的变化**
因为 JavaScript 的限制，Vue 不能检测到数组的变化，所以不能通过操作数组来渲染 dom 的，不能通过属性或者索引控制数组，比如 length，index，解决的方法是通过 set 方法

```js
vm.items[index] = newVal; //不能实现
//push()//pop()//shift()//unshift()//splice()//sort()//reverse()//不能
// 根据索引值赋值
Vue.set(vm.items, indexOfItem, newValue);
// vm.$set，Vue.set的一个别名
vm.$set(vm.items, indexOfItem, newValue);
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue);
// 修改数组长度
vm.items.splice(newLength);
```

**vue 实例创建后，再向其上添加属性，不能监听**  
解决办法：使用`Vue.set`设置一个新的对象属性。该方法确保将属性创建为一个响应式属性，并触发视图更新：

## :white_medium_square: 2.理解虚拟 DOM

**Virtul DOM** 就是对 Dom 的抽象，本质上是一个 Javascript 对象。

**为什么要有这个东西呢**  
前端优化有一个点就是尽可能地减少手动操作 DOM，因为频繁的变动 DOM 会造成浏览器的重构和回流，这些都会降低性能。而且前端框架都是以不操作 DOM 为基本要求，所以需要引入 Virtual DOM 这个东西，让原本的 DOM 操作让 JS 来完成，而不去麻烦浏览器。

**Virtual DOM** 的 **diff** 算法是 **Virtul DOM** 的核心，它通过比较新旧的 **Virtul DOM Tree** 来找出差异并更新

## nextTick 的原理

##

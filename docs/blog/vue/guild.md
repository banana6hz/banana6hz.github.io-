## Vuex  
### 理解  
**官方说法**：Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。  
**官方栗子**：
```js
new Vue({
  // state  数据源
  data () {
    return {
      count: 0
    }
  },
  // view  视图
  template: `
    <div>{{ count }}</div>
  `,
  // actions  事件
  methods: {
    increment () {
      this.count++
    }
  }
})
```
⌛这是一个简单的型计数功能页面，通过increment函数实现count的增长。  

❓ 那么问题来了，假如有两个页面，要求他们都能对count进行操控，并且都能第一时间获取count的变化，那怎么办呢？  
💡 是不是可以把count剥离出来放到一个大家都能访问到的地方，并且能访问到最新的值。  

这就是Vuex在做的事，Vuex 就如同一个全局的管理员一样，帮着我们统一管理着项目的<u>共享数据</u>。那他是怎么实现的呢？请看：
```js
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```
🙈但是这么一想，这不就是一个全局对象吗？他和单纯的全局对象有什么不一样的地方呢？  
- Vuex的存储状态是响应式的，当Vue组件从store中读取状态的时候，若store中的状态发生变化，那相应的组件也会相应地得到高效更新。   
- 不能直接改变store中的状态，需要通过mutation

### 几个核心概念
每一个 Vuex 应用的核心就是 store（仓库）,“store”基本上就是一个容器(对象），它包含着你的应用中大部分的状态 (state)。  

**State**：State是vuex状态管理的数据源  
**Getter**：Getter可以将State的数据进行过滤再输出  
**Mutation**：Mutation是vuex中改变State的唯一途经（严格模式下）,并且只能是同步操作    
**Action**：一些对State的异步操作可以存放在Action中，并通过Action提交Mutation变更状态  
**Module**：当Store对象过强大，可以根据业务需求分成多个Module  
![vuex](../../.vuepress/imgs/blog/vue/guild/vuex.jpg)

✨总结：我们通过组件出发Action，Action会提交Mutation，Mutation会修改state，组件再根据state和Getter渲染页面。

### 应用场景  
Vuex一般用于中大型Web单页应用对应用的状态进行管理。  
下面介绍几个常用的场景：  
**使用 vuex 解决跨组件通信问题**  

**vuex 作为数据存储中心**

### element-ui render

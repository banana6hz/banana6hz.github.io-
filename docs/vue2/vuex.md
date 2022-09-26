### vuex

1. vuex 的组成（都是对象）

- state：数据源，当 state 修改之后 vue 会重新 render 页面，这样页面的数据也会更新
- mutaions: 可进行同步操作，可以接受两个参数，一个 state,另一个是载荷 preload，可以传操作所需的数据。mutaions 是 vuex 中唯一可以修改 state 数据的方式
- actions: 可进行异步操作。不能直接修改 state 数据的值，需要再 commit 到 mutations，在 mutations 进行修改 state
- getters: 对数据进行加工  
  它们都由 store 统一管理

> 安装 vuex 的时候需要注意，如果直接`npm i vuex`的话，会默认下载 vuex4,而这个 vuex4 只能在 vue3 中使用，所以如果你的项目是 vue2 的话，需要执行`npm i vuex@3`

2. 基本使用

```js
// main.js
// import vuex from 'vuex'
// import store from './store' // 脚手架环境中不能在这引入store
// Vue.use(vuex)

// ⚠️：脚手架的环境中，这里的import语句不管写在哪里，都会被提升到顶部
// 也就是说会扫描完全部的import才会执行Vue.use()
// 但是store.js的new Vuex.Store是依赖于Vuex的
// 如果在执行的时候还没Vue.use(vuex)，就会报错
// 所以Vue.use(vuex)需要写在store.js里面
new Vue({
  el: "app",
  render: (h) => h(App),
  store,
});
// store.js
import store from "./store";
Vue.use(vuex);

const actions = {};
const mutations = {};
const state = {};
const getters = {};
// 创建store
export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
});
```

3. mapstate
   mapstate 可以从 state 读取数据，还可以修改数据的名字，mapGetters,mapMutations,mapActions 同理

```js
const state = {
    banana: 18,
    apple: 12
}
// 借助mapstate生成计算属性，从state中获取数据（对象写法）
...mapState({lalala:'banana'})
console.log(lalala) // 18
// 从state读取banana,赋值给新变量lalala

// 数组写法,要在state里面有这个数据
...mapState(['banana','apple'])
console.log(banana) // 18
```

> 当 mapMutations 和 mapActions 使用时，如需要传递参数，需要在模版中绑定事件时传递好参数，否则参数会是事件对象$event

4. 模块化 + namespaced
   vuex 进行模块化的时候添加 `namespaced：true`,代表一个命名空间，你就可以直接用这个名字的数据。这样可以让代码更好维护，让多种数据分类更加明确

```js
// store.js
const userData {
  namespaced: true, // 开启命名空间
  state: {
    name: 'banana'
  },
  mutations: {},
  actions: {},
  getters: {},
}

const menuData {
  namespaced: true, // 开启命名空间
  state: {
    meat: '牛又'
  },
  mutations: {},
  actions: {},
  getters: {},
}

const store = new Vue.Store({
  modules: {
    userData,
    menuData
  }
})

// 直接读取
this.$store.state.userData.name // banana
// mapState读取
...mapState({'menuData', ['meat']})
console.log(this.meat) // 牛又
```

> 只要是 vue 的插件，就要用 Vue.use()去使用，比如 elememt、Vuex

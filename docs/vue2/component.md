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

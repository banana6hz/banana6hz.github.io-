今天来学习下 Vue 有多少种组件通信的方法吧

1. <b>props/emit</b>: 主要是父子组件通信

- 父向子：父组件通过`v-bind`绑定数据，子组件通过`prop`接受数据
- 子向父：子组件通过`emit`向父组件传值，父组件通过`@`接受事件
  > 单向数据流，prop 不可修改

2. <b>ref</b>: 父组件访问子组件的数据和方法

- 如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素
- 如果用在子组件上，引用就指向组件实例

3. <b>$children/$parent</b>: 有直系关系的组件之间可以通过此方法进行通信

- 在`#app`拿到的`$parent`是<b>`new Vue()实例`</b>, 再此继续拿到的`$parent`是`undefined`
- 最低层的子组件拿到的`$chilren`是空数组
- `$parent`拿到的是对象，`$children`拿到的是数组

4. <b>$attr/$listener</b>：用于隔代组件之间的通信

- `$attr`主要接收没有通过 props 传递的属性，应用场景：子组件获取爷爷组件的数据。父组件传给子组件的值，子组件没有通过`prop`接收，可以继续绑定到孙子组件上，孙子组件就可以通过`this.$attr`访问父组件的数据
- `$listener`主要用于子组件向爷爷组件传递事件。在爸爸组件添加`v-on="$listener"`，子组件就可以`emit`事件，然后爷爷组件通过`@`接受
- `$listener`是一个对象，包含父组件和爷爷组件的`@`事件
- `inheritAttrs`属性用于设置子组件的顶层标签元素中不会渲染出父组件传递过来的属性，默认是 true，该属性值不影响通信

5. <b>provide / inject</b>: 主要用于有直系关系的组件进行通信

- 父组件中通过`provide`来提供变量, 然后在子组件中通过`inject`来注入变量
- 不论子组件嵌套有多深, 只要调用了`inject` 那么就可以注入`provide`中的数据，而不局限于只能从当前父组件的`props`属性中获取数据

6. <b>EventBus</b>: 主要用于全局的事件传递和接收

```js
// event-bus.js
// 初始化：首先需要创建一个事件总线并将其导出, 以便其他模块可以使用或者监听它
import Vue from "vue";
export const EventBus = new Vue();

// 发送事件
EventBus.$emit("functionName", params);
// 接受事件
EventBus.$on("functionName", func); // 接收到函数functionName，则执行函数func
// 移除事件
EventBus.$off("functionName");
```

7. <b>vuex</b>: vue 的全局状态管理

总结：

- 父子组件的通信： prop/$emit、ref、$children/$parent、provide / inject、$attrs / $listeners
- 兄弟组件：eventBus、vuex
- 隔代组件： eventBus、vuex、provide / inject 、$attrs / $listeners

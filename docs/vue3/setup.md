## Setup

### 基本使用

- setup 是 vue3 的一个新配置项，它的值是一个函数
- 组件中所有的`watch、computed、methods、data`等均配置到`setup`里面
- setup 函数的两种返回值

  - 若返回一个对象，则对象中的属性，方法，在模版中均可以直接使用

  ```js
  <script>
  import { ref } from 'vue'

  export default {
    setup() {
      const count = ref(0)

      // 返回值会暴露给模板和其他的选项式 API 钩子
      return {
        count
      }
    },

    mounted() {
      // 在选项式 API 中访问组合式 API 暴露的值
      console.log(this.count) // 0
    }
  }
  </script>

  <template>
    <button @click="count++">{{ count }}</button>
  </template>
  ```

  > 1. setup() 自身并不含对组件实例的访问权，即在 setup() 中访问 this 会是 undefined。你可以在选项式 API 中访问组合式 API 暴露的值，但反过来则不行。
  > 2. setup 不能是一个 async 函数，因为返回值不再是 return 的对象，而是一个 promise,模版看不到 return 对象中的属性。但是搭配 Suspense 使用时可以是个 async 函数

  - 若返回一个渲染函数，则可以自定义渲染内容

  ```js
  import { h, ref } from "vue";

  export default {
    setup() {
      const count = ref(0);
      return () => h("div", count.value);
    },
  };
  ```

### 访问 Props

setup 函数的第一个参数是组件的 props

```js
export default {
  props: {
    title: String,
  },
  setup(props) {
    console.log(props.title);
  },
};
```

### Setup 上下文

传入 setup 函数的第二个参数是一个 Setup 上下文对象。上下文对象暴露了其他一些在 setup 中可能会用到的值：

```js
export default {
  setup(props, context) {
    // 透传 Attributes（非响应式的对象，等价于 $attrs）
    console.log(context.attrs);

    // 插槽（非响应式的对象，等价于 $slots）
    console.log(context.slots);

    // 触发事件（函数，等价于 $emit）
    console.log(context.emit);

    // 暴露公共属性（函数）
    console.log(context.expose);
  },
};
```

该上下文对象是非响应式的，可以安全地解构：

```js
export default {
  setup(props, { attrs, slots, emit, expose }) {
    ...
  }
}

```

### Setup 的执行

在`beforeCreate`之前执行一次，this 是`undefined`

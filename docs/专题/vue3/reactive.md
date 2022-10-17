### Reactive

作用：定义一个**对象类型**的**响应式**数据(基本数据别用它，用 ref 函数)

```js
const obj = reactive({ count: 0 });
obj.count++;
```

- `reactive`定义的响应式数据是深层次的
- 内部基于`ES6`的`proxy`实现，通过代理对象操作源对象内部数据都是响应式的

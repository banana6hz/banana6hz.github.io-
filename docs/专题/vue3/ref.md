### Ref

作用：接受一个内部值，返回一个**响应式**的、可更改的 ref **对象**，此对象只有一个指向其内部值的属性 `.value`。

- ref 对象是可更改的，也就是说你可以为 `.value` 赋予新的值。它也是响应式的，即所有对 `.value` 的操作都将被追踪，并且写操作会触发与之相关的副作用。

```js
const count = ref(0);
console.log(count.value); // 0

count.value++;
console.log(count.value); // 1
```

- js 中操作数据：`xxx.value`, 模版中读取数据：不需要`.value`，直接`<div>{{xxx}}</div>`
- 接受的数据可以是：基本类型，也可以是对象类型
- 基本类型的数据：响应式依然是靠`Object.defineProperty`的`get`和`set`
- 对象类型的数据：内部还是用了 vue3 的一个新函数`reactive`
- 如果将一个对象赋值给 `ref`，那么这个对象将通过 `reactive()` 转为具有深层次响应式的对象。这也意味着如果对象中包含了嵌套的 `ref`，它们将被深层地解包。若要避免这种深层次的转换，请使用 `shallowRef()` 来替代

### Watch

### watch Ref

- 监听一个`ref`定义的响应式数据

```js
<script setup>
import { ref, watch } from 'vue'
const name = ref('')
// 可以直接侦听一个 ref
watch(name, (oldName, newName) => {
  console.log(`name发生了变化：${oldName}-${newName}`)
}, {immediate: true})
```

- 监听多个`ref`定义的响应式数据

```js
<script setup>
import { ref, watch } from 'vue'
const name = ref('')
const age = ref(0)
// 可以直接侦听一个 ref
watch([name, age], (oldName, newName) => {
  console.log(`name发生了变化：${oldName}-${newName}`)
})
```

### watch reactive

- 监听一个`reactive`定义的响应式数据：无法正确获取`oldValue`，会强制开启深度监测

```js
const obj = reactive({ count: 0 });

watch(
  obj,
  (oldValue, newValue) => {
    console.log(`obj 发生了改变: ${oldValue}-${newValue}`);
  },
  { deep: false }
); // 关闭深度监测会失效
```

- 监听`reactive`定义的响应式数据的一个属性：`deep`配置有效

> 注意，你不能直接侦听响应式对象的属性值，例如:

```js
const obj = reactive({ count: 0 });

// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(`obj的count发生了改变: ${count}`);
});
```

需要用一个返回该属性的 getter 函数：

```js
// 提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`obj的count发生了改变: ${count}`);
  },
  { deep: false } // 此时deep的配置是有效的
);
```

- 监听`reactive`定义的响应式数据的某些属性

```js
const obj = reactive({ count: 0, x: 1 });
watch([() => obj.count, () => obj.x], (val) => {
  console.log(`obj的count或者x发生了改变: ${val}`);
});
```

> 注意：深度侦听需要遍历被侦听对象中的所有嵌套的属性，当用于大型数据结构时，开销很大。因此请只在必要时才使用它，并且要留意性能。

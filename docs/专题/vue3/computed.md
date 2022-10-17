### Computed

与 vue2 中的`computed`配置功能一致

- 创建一个只读的计算属性 ref：

```js
const count = ref(1);
const plusOne = computed(() => count.value + 1);

console.log(plusOne.value); // 2

plusOne.value++; // 错误
```

- 创建一个可写的计算属性 ref：

```js
const count = ref(1);
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1;
  },
});

plusOne.value = 1;
console.log(count.value); // 0
```

> 1. 不要在 getter 中做异步请求或者更改 DOM！
> 2. 避免直接修改计算属性值

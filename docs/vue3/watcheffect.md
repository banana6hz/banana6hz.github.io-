## watchEffect()

里面写了谁就 watch 谁

- watch 的套路：既要指明监视的属性，也要指明监视的回调，watch() 是懒执行的：仅当数据源变化时，才会执行回调。
- watchEffect 的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，就监视哪个属性。适用场景：请求一些初始数据，然后在相关状态更改时重新请求数据。

  ```js
  // watch写法
  const url = ref("https://...");
  const data = ref(null);

  async function fetchData() {
    const response = await fetch(url.value);
    data.value = await response.json();
  }

  // 立即获取
  fetchData();
  // ...再侦听 url 变化
  watch(url, fetchData);

  // watchEffect写法
  watchEffect(async () => {
    const response = await fetch(url.value);
    data.value = await response.json();
  });
  // 这个例子中，回调会立即执行。在执行期间，它会自动追踪 url.value 作为依赖（和计算属性的行为类似）。每当 url.value 变化时，回调会再次执行。
  ```

  > `watchEffect` 仅会在其同步执行期间，才追踪依赖。在使用异步回调时，只有在第一个 `await` 正常工作前访问到的属性才会被追踪。

- `watchEffect` 有点像 `computed`:
  - 但 `computed` 注重的是计算出来的值(回调函数的返回值)，所以必须要写返回值
  - `watchEffect` 更注重的过程(函数回调的函数体)，所以不用写返回值

### watch 和 watchEffect

- watch  
  `watch` 只追踪明确侦听的数据源,不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。
- watchEffect  
  它会在同步执行过程中，**自动追踪**所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。

### 回调的触发时机

当你更改了响应式状态，它可能会同时触发 Vue 组件更新和侦听器回调

默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新之前被调用。这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。

如果想在侦听器回调中能访问被 Vue 更新之后的 DOM，你需要指明 flush: 'post' 选项：

```js
watch(source, callback, {
  flush: "post",
});

watchEffect(callback, {
  flush: "post",
});
```

后置刷新的 `watchEffect()` 有个更方便的别名 `watchPostEffect()`：

```js
import { watchPostEffect } from "vue";

watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
});
```

### 停止侦听器

在 `setup()` 或 `<script setup>` 中用同步语句创建的侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止。因此，在大多数情况下，你无需关心怎么停止一个侦听器。

一个关键点是，侦听器必须用同步语句创建：**如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它**，以防内存泄漏。如下方这个例子：

```js
<script setup>
  import {watchEffect} from 'vue' // 它会自动停止 watchEffect(() => {}) //
  ...这个则不会！ setTimeout(() => {watchEffect(() => {})}, 100)
</script>
```

要手动停止一个侦听器，请调用 watch 或 watchEffect 返回的函数：

```js
const unwatch = watchEffect(() => {});

// ...当该侦听器不再需要时
unwatch();
```

注意，需要异步创建侦听器的情况很少，请尽可能选择同步创建。如果需要等待一些异步数据，你可以使用条件式的侦听逻辑：

```js
// 需要异步请求得到的数据
const data = ref(null);

watchEffect(() => {
  if (data.value) {
    // 数据加载后执行某些操作...
  }
});
```

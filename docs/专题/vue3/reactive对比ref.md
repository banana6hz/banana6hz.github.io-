### reactive 和 ref 的对比

### 1. 从定义数据的角度

- `ref`用来定义：**基本类型**数据，也可以用来定义**对象(或数组)类型**数据，它内部会自动通过`reactive`转为代理对象
- `reactive`用来定义：**对象(或数组)类型**数据

### 2. 从原理角度

- `ref`通过`Object.defineProperty`的`get`和`set`来实现响应式
- `reactive`通过使用`Proxy`来实现响应式(数据劫持)，并通过 Reflect 操作源对象内部的数据

### 3. 从使用角度

- `ref`定义的数据，在 js 里面读取数据需要`.value`，在模板中读取不用`.value`
- `reactive`定义的数据，操作数据与读取数据：均不用`.value`

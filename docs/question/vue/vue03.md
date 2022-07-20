<!-- vue 应用篇 -->

## 离开了页面怎么访问原页面的数据

把数据存到第 sessionStorage 或者 localStorage, 或者借助第三方插件比如 vuex-persistedstate(其原理也是存到 storage)

## 如何动态绑定 class 和 style

- `:class="{样式名:响应式数据...}"`

```js
<div class="static" v-bind:class="{active:isActive,'text-danger':hasError}">
data:{
    isActive: true,
    hasError:false
}
//结果渲染为：class="static active"
```

- `:class="[响应式数据1，...]"`

```js
<div v-bind:class="[activeClass,errorClass]"></div>
data:{
    activeClass:'active',
    errorClass:'text-danger'
}
//class="active text-danger"
```

style 的绑定与 class 类似

## vue 在什么时候可以获取 Dom 节点，怎么获取

在 Mounted 钩子函数可以访问操作 DOM

- 利用原生 JS 如 `document.getElementById`
- 借助 ref 属性

```js
<div ref="banana">better</div>;
//获取
console.log(this.$refs.banana);
```

## 如何实现一个类似于淘宝搜索框显示实时列表的功能

## 如何进行错误捕获

JavaScript 中，Error 是一个构造函数，通过它创建一个错误对象。当运行时错误产生时，Error 的实例对象会被抛出。构造一个 Error 的语法如下：

```js
// message: 错误描述
// fileName: 可选。被创建的Error对象的fileName属性值。默认是调用Error构造器代码所在的文件的名字。
// lineNumber: 可选。被创建的Error对象的lineNumber属性值。默认是调用Error构造器代码所在的文件的行号。
new Error([message[, fileName[, lineNumber]]])
```

**try...catch...**：局部监听异常

```js
try {
  var a = 1;
  var b = a + c;
} catch (e) {
  // 捕获处理
  console.log(e); // ReferenceError: c is not defined
}
```

**window.onerror 与 window.addEventListener('error')**：用于全局监听异常，捕获 js 运行时错误

```js
window.onerror = function(message, source, lineno, colno, error) { ... }
```

_跨域之后 window.onerror 是无法捕获异常信息的_

```js
//解决方案便是script属性配置 crossorigin="anonymous" 并且服务器添加Access-Control-Allow-Origin。
<script src="http://cdn.xxx.com/index.js" crossorigin="anonymous"></script>
```

MVVM 框架的捕获方法

```js
Vue.config.errorHandler = function (err, vm, info) {
  let {
    message, // 异常信息
    name, // 异常名称
    script, // 异常脚本url
    line, // 异常行号
    column, // 异常列号
    stack, // 异常堆栈信息
  } = err;
  // vm为抛出异常的 Vue 实例
  // info为 Vue 特定的错误信息，比如错误所在的生命周期钩子
};
```

<!-- https://juejin.im/post/5aaa93345188257bf550cbfd#heading-8 -->

## 🎠 对于 MVC 和 MVVM 的理解

#### MVC

- Mode（模型）：处理应用程序数据的逻辑。
- View（视图）：处理应用程序数据的展示。
- Controller（控制器）：处理用户交互。通常负责从视图中获取数据，控制用户输入，并向模型发送数据。
  ![MVC](../../.vuepress/imgs/interview/vue/mvc.png)

如图，中间有一个白线和黄线连起来的一个 Y。根据这个 Y 我们要记住一些规则：  
C 可以直接引用 M 和 V，但事实 M 不能引用 C，V 也不能引用 C，M 和 V 之间也不能互相引用  
**View 和 Controller 的交互**  
View 上面有一个 Action，指向 Contoller（target），代表 View 会将事件传递给 Controller。例如一个点击事件，View 接受了点击事件，然后传递给 Controller 去处理，这种 C 和 V 的交互方式称为 target-action。  
**Model 和 Controller 的交互**  
M 可以理解为数据的管理者，它可能会读取数据库里的数据，也可能向数据库存放数据。C 负责把 M 最新的数据赋值给 View  
**MVVM**：Model-View-ViewModel

- Model:代表数据模型，关注数据本身，也可以在 Model 中定义数据修改和操作的业务逻辑。
- View:代表用户操作页面，负责把数据渲染出来
- ViewModel：对 M 进行数据解析，是一个同步 Model 和 View 的对象。

在 MVVM 架构下，View 和 Model 之间并没有直接的联系，而是通过 ViewModel 进行交互，Model 和 ViewModel 之间的交互是双向的， 因此 View 数据的变化会同步到 Model 中，而 Model 数据的变化也会立即反应到 View 上。

ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而 View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作 DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

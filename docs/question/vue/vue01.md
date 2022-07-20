<!-- vue 基础知识篇 -->

## :white_medium_square: 1. Vue 的生命周期

先来一张官方的**生命周期图**  
![vue生命周期](../../.vuepress/imgs/blog/vue/vuelife/life.jpg)

Vue 所有的生命周期钩子自动绑定在 this 上下文到实例中，因此你可以访问数据，对属性和方法进行运算。这意味着你不能使用箭头函数来定义一个生命周期方法。这是因为箭头函数绑定了父上下文，因此 this 与你期待的 Vue 实例不同。  
首先顶部的 **new Vue()** 是 Vue 实例的初始化

🥤**beforeCreate**  
 创建实例之前，数据观察和时间都没准备好，DOM 树未生成，不能获取 this.$data和this.$el

```js
el: undefined;
data: undefined;
message: undefined;
```

🥤**created**  
　　实例已经创建完成之后被调用。在这一步，实例已经完成以下的配置：数据观测，属性和方法的运算，watch/event 事件回调。可以获取 this.$data,然而，挂载阶段还没开始，$el 属性目前不可见。开始创建 VDOM，但是还没挂载，页面中的元素还没真正替换过来，页面还未渲染。通常在这一阶段进行异步请求。

```js
el     : undefined
data   : [object object]
message: hi
```

🥤**beforeMount**  
 可以读取 this.$el，DOM 树已生成，但是数据还未挂载

```js
el     : <div id="app">{{message}}</div>
data   : [object object]
message: hi
```

🥤**mounted**  
　　 el 被新创建的 vm.$el 替换，并挂在到实例上去，页面已经渲染成功,执行到这一钩子函数，就表示 vue 实例被完整创建。一般会在这个钩子函数进行 ajax 请求。

```js
el     : <div id="app">{{hi}}</div>
data   : [object object]
message: hi
```

🥤**beforeUpdate**  
　　数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。  
　　你可以在这个钩子中进一步第更改状态，这不会触发附加的重渲染过程。  
🥤**updated**  
　　由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。  
　　当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。  
🥤**beforeDestroy**  
　　实例销毁之间调用。在这一步，实例仍然完全可用。  
🥤**destroyed**  
　　 Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。  
🥤**activated**  
　　 keep-alive 组件激活时调用。  
🥤**deactivated**  
　　 keep-alive 组件停用时调用。

## :white_medium_square: 2. 父子组件生命周期的调用顺序

- **加载渲染过程**：**父** _beforeCreate_ => **父** _created_ => **父** _beforeMounted_ => **子** _beforeCreate_ => **子** _created_ => **子** _beforeMounted_ => **子** _mounted_ => **父** _mounted_
- **销毁过程**: **父** _beforeDestroy_ => **子** _beforeDestroy_ => **子** _destroyed_ => **父** _destroyed_
- **子组件更新过程**： **父** _beforeUpdate_ => **子** _beforeUpdate_ => **子** _updated_ => **父** _updated_

## :white_medium_square: 3. Vue 有哪些指令

- **v-if**: 是否渲染该元素，切换时元素及它的数据绑定 / 组件被销毁并重建
- **v-else**/**v-else-if**: 和 v-if 指令搭配使用,没有对应的值.当 v-if 的值 false,v-else/v-else-if 才会被渲染出来
- **v-show**：是否显示该元素, 切换时改元素的 css 的属性 display 会随着切换
- **v-once**：只渲染一次,如果后续绑定的值发生了变化,页面不会更新
- **v-for**：遍历数据进行渲染
- **v-text**: 更新元素的`textContent`。如果要更新部分的 textContent，需要使用{{ Mustache }} 插值。

```js
<span v-text="msg"></span>
<!-- 和下面的一样 -->
<span>{{msg}}</span>
```

- **v-html**: 更新元素的`innerHTML`,内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译。（慎用，可能导致 XSS 攻击）。
- **v-bind**：简写为：,动态绑定一些元素的属性,类型可以是:字符串、对象或数组
- **v-on**: 简写@, 用于绑定事件，它有很多修饰符

  - **.stop**: 调用 `event.stopPropagation()`, 阻止事件向上冒泡
  - **.prevent**: 调用 `event.preventDefault()`， 是拦截默认事件
  - **.native**: 监听组件根元素的原生事件,给 vue 组件绑定事件时候，必须加上 native ，不然不会生效，等同于在子组件中处理 click 事件然后向外发送 click 事件
  - **.once**: 只触发一次回调
  - **.{keyCode | keyAlias}** - 只当事件是从特定键触发时才触发回调。
    ```js
      <!-- 键修饰符，键别名 -->
      <input @keyup.enter="onEnter">
      <!-- 键修饰符，键代码 -->
      <input @keyup.13="onEnter">
    ```
  - **.capture**：添加事件侦听器时使用 capture 模式。在捕获阶段触发监听函数
  - **.self**：表示事件只由本身触发，不是来自子节点

  ```js
   v-on:click.prevent.self 会阻止所有的点击
   v-on:click.self.prevent 只会阻止对元素自身的点击
  ```

  - **.passive**: 指不拦截默认事件。在 vue 中，不阻止默认事件，真正的目的是告诉浏览器，你可以不用去查询程序有没有阻止默认事件，也就是**提前告诉**浏览器程序不会阻止，那么意义是什么呢？因为浏览器只有等内核线程执行到事件监听器对应的 JavaScript 代码时，才能知道内部是否会调用 preventDefault 函数来阻止事件的默认行为。这种场景下，用户的手势事件无法快速产生，会导致页面无法快速执行滑动逻辑，从而让用户感觉到页面卡顿，而你添加了.passive 修饰符，就相当于**提前告诉**浏览器程序不会阻止，这样浏览器就不用再去进行查询，就能顺利滑动了。
  - **.left** - (2.2.0) 只当点击鼠标左键时触发。
  - **.right** - (2.2.0) 只当点击鼠标右键时触发。
  - **.middle** - (2.2.0) 只当点击鼠标中键时触发。

- **v-model**: 在表单控件或者组件上创建双向绑定。
  - .lazy: 取代 input 监听 change 事件
  - .trim: 输入首尾空格过滤
  - .number: 输入字符串转为有效的数字
- **v-slot**: 提供具名插槽或需要接收 prop 的插槽
- **v-pre**: 用来阻止预编译,输出纯文本

```js
// message: "Hello,"
// 未使用v-pre之前，页面显示：Hello, Here I am.
// 使用v-pre之后，页面显示：Here I am.
<div v-pre>{{ message }} Here I am.</div>
```

- **v-cloak**: 元素添加该属性之后，在 HTML 编译完成之后会删除。可以用 CSS 对标签设置样式，表示 HTML 还未被编译，比如可以设置`display: none;`

---

#### 1. v-if 和 v-show 的区别

- v-if: 是对 DOM 节点的重建和销毁。切换的结果是，页面上是否有这个元素, 耗能较大，不适用于需要频繁切换的元素，如果涉及到权限、安全、页面展示的情况下可用 v-if
- v-show：切换的结果是，页面上这个元素的 css 属性`display`的切换，耗能较小，可用于需要频繁切换的元素

#### 2. 为什么避免 v-if 和 v-for 用在一起

因为当 `v-for` 和 `v-if` 一起使用时，`v-for` 的优先级比 `v-if` 更高
来看下面这个 🌰

```js
<ul>
    <li v-for="user in userList"
        v-if="user.isActive"
        :key = "user.id"
    >
    {{ user.name }}
    </li>
</ul>
```

在上面这个 🌰 中，本来我们只要需要渲染出一部分的值（v-if 为 true 的值），但因为 `v-for` 比 `v-if` 具有更高的优先级，所以每次重新渲染的时候都会遍历整个列表的每个值，这不是我们想要的，那有什么解决办法呢？

🧠 解决办法

- 🍖 把 `v-if` 写在容器元素

```js
<ul v-if="user.isActive">
    <li v-for="user in userList"
        :key = "user.id"
    >
    {{ user.name }}
    </li>
</ul>
```

- 🍖 将列表通过计算属性再输出

```js
computed:{
    activeUser:function(){
        return this.userList.filter(function(user){
            return user.isActive
        })
    }
}
<ul>
    <li v-for="user in activeUser"
        :key = "user.id"
    >
    {{ user.name }}
    </li>
</ul>
```

#### 3. v-if 和 v-show 在执行的时候参与了哪些生命周期？

- **v-if**：
  - **初始渲染**：初始值为 false 组件不会渲染，生命周期钩子不会执行。初始值为 true 时，组件会进行渲染，并依次执行 beforeCreate,created,beforeMount,mounted 钩子。
  - **false=>true**：_beforeCreate_ ➡ _Created_ ➡ _beforeMounted_ ➡ _mounted_
  - **true=>false**: _beforeDestroy_ ➡ _Destroyed_
- **v-show**：
  - **初始渲染**：无论初始状态，都会渲染，并依次执行 _beforeCreate_ ➡ _Created_ ➡ _beforeMounted_ ➡ _mounted_
  - **切换**：对生命周期无影响,切换时组件始终保持在 mounted 钩子

#### 4. v-for 为什么要加 key？

无：key 属性时，状态默认绑定的是位置。  
有：key 属性时，状态根据 key 的属性值绑定到了相应的数组元素。

---

![栗子](../../.vuepress/imgs/common/example.png)  
首先讲一下 diff 算法的处理方法，对操作前后的 dom 树同一层的节点进行对比，一层一层对比，如下图：
![vue-for](../../.vuepress/imgs/interview/vue/vue-for01.png)  
当某一层有很多相同的节点时，也就是列表节点时，Diff 算法的更新过程默认情况下也是遵循以上原则。  
比如一下这个情况：  
![vue-for](../../.vuepress/imgs/interview/vue/vue-for.png)  
我们希望可以在 B 和 C 之间加一个 F，Diff 算法默认执行起来是这样的：
![vue-for](../../.vuepress/imgs/interview/vue/vue-for2.png)  
即把 C 更新成 F，D 更新成 C，E 更新成 D，最后再插入 E，是不是很没有效率？

**有 key(调整位置过程)**  
所以我们需要使用 key 来给每个节点做一个唯一标识，Diff 算法就可以正确的识别此节点，找到正确的位置区插入新的节点。

我们可以对同一层级的同组节点添加一个唯一的 key 进行区分，此处的 key 就好比数据库里面主键的概念，通过它可以唯一的确定一组节点。  
![vue-for](../../.vuepress/imgs/interview/vue/vue-for3.png)  
vue 中列表循环需加:key="唯一标识" 唯一标识可以是 item 里面 id index 等，因为 vue 组件高度复用增加 Key 可以标识组件的唯一性，为了更好地区别各个组件 key 的作用主要是为了高效的更新虚拟 DOM

## :white_medium_square: 4. Vue 有哪些内置组件

- **component**: 渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染。
- **keep-alive**: 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。是 Vue 提供的一个抽象组件，用于缓存组件，保留组件状态或避免重新渲染。
  - 当 `keep-alive` 被激活时会触发 `actived`钩子函数，被移除时触发 `deactivated` 钩子函数
  - 它有两个属性，都支持字符串和正则表达式
    - `incude` ：表示匹配的组件会被缓存
    - `exclude` ：表示匹配的组件不会被缓存「优先级比 include 高」
- **transition**： 给单个元素/组件添加过渡效果，不会额外渲染 DOM 元素
- **transition-group**：为多个元素/组件添加过渡效果，`<transition-group>` 渲染一个真实的 DOM 元素。默认渲染`<span>`
- **slot**: 组件模板之中的内容分发插槽，是 vue 中可以实现在组件内额外添加其他拓展内容的属性。
  - 具名插槽：规定在指定位置出现什么内容
  - 作用域插槽：主要作用是在书写插槽内容时可以获取到插槽作用域的值
  ```js
  //子组件
  <template>
  <div>hi
  <slot :data="banana"></slot>
  </div>
  </template>
  <script>
  export default {
      name: 'slotbanana',
      data(){
          return{
              user:[
                  {name:"ba",age:18},
                  {name:"na",age:20},
                  {name:"na",age:22}
              ]
          }
      }
  }
  </script>
  //父组件
  <template>
  <div>
  <slotbanana>
  <template slot-scope="user">
  <div v-for="item in user.data" :key="item.id">{{item}}</div>
  </template>
  </slotbanana>
  </div>
  </template>
  ```

## :white_medium_square: 5. Vue 有哪些组件通信的方法

- prop/$emit
  父组件向子组件传值：父组件定义需要传入子组件的值，子组件通过 prop 接受数据。
  > 单向数据流，prop 只读，不可被修改

```js
// 父组件
<template>
    <div>
        <child :msg="title"></child>
    </div>
</tempalte>
<script>
export default {
    name: 'father',
    data () {
        return {
            title: '爸爸叫你回家吃饭了!'
        }
    }
}
</script>

// 子组件
<template>
    <div>
        {{msg}}
    </div>
</tempalte>
<script>
export default {
    name: 'child',
    props: ['msg']
}
</script>
```

子组件向父组件传值/子组件调用父组件的方法，把值 emit 到父组件

```js
// 子组件
<template>
    <div @click="updateTitle">click之后向父子间传值</div>
</tempalte>
<script>
export default {
    name: 'child',
    methods: {
        updateTitle () {
            // 子组件向父组件emit这个updateTitle方法，并带上了参数
            this.$emit('updateTitle', 'this is new Title from child')
        }
    }
}
</script>

// 父组件
<template>
    <div @updateTitle='updateTitle'>{{ title }}</div>
</template>

<script>
export default {
    data() {
        return {
            title: 'title'
        }
    },
    methods: {
        updateTitle (newTitle) {
            this.title = newTitle // 子组件说我要把title改成newTitle
        }
    }
}
</script>
```

- **ref**
  父组件访问子组件的数据和方法: 如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例

```js
// 父组件
<template>
    <div>
        <child ref="childRef"/>
    </div>
</tempalte>
<script>
export default {
    mounted () {
        const child = this.$ref.childRef
        console.log(child.name)
        child.sayHi()
    }
}
</script>
// 子组件
<template>
    <div>child</div>
</template>
<script>
    export default {
        data () {
            return {
                name: 'banana'
            }
        },
        methods: {
            sayHi() {
                console.log('Hi, I am banana')
            }
        }
    }
</script>
```

- **$children/$parent**
  通过$children和$parent 可以访问组件的实例，访问组件的属性和方法
  > 在#app 上拿$parent得到的是new Vue()的实例，在在这个实例上拿到的$parent 得到的是 undefined,而最低层的子组件拿到的$chilren是空数组。$parent 拿到的是对象，$children 拿到的是数组
- provide/inject
  父组件中通过 provide 来提供变量, 然后在子组件中通过 inject 来注入变量，不论子组件嵌套有多深, 只要调用了 inject 那么就可以注入 provide 中的数据，而不局限于只能从当前父组件的 props 属性中获取数据
- attrs/$listener
  用于隔代组件的通信
  > 当设置 inheritAttrs: true（默认）时，子组件的顶层标签元素中会渲染出父组件传递过来的属性
  > 当设置 inheritAttrs: false 时，子组件的顶层标签元素中不会渲染出父组件传递过来的属性
  > 不管 inheritAttrs 为 true 或者 false，子组件中都能通过$attrs 属性获取到父组件中传递过来的属性

```js
// 爷爷组件
<template>
    <div>
        <father
            :name="name"
            :age="age"
            :weight="weight"
            :height="height"
            @updateName='updateName'
        />
    </div>
</template>
<script>
    export default {
        name: 'grandpa',
        data () {
            return {
                name: 'yeye'，
                age： 18，
                weight：100，
                height: 160
            }
        },
        methods: {
            updateName (newName) {
                this.name = newName
            }
        }
    }
</script>
// 爸爸组件
<template>
    <div>爸爸</div>
    <child v-on=$listener v-bind="$attrs"/>
</template>
<script>
export default {
    name: 'father',
    props: ['name'],
    inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
    created () {
        // $attrs存放的父作用域未经过prop定义的属性
        console.log(this.$attrs) // {age: 18, weight: 100, height: 160}
    }
}
</script>
// 孙子组件
<template>
    <div @click="changeName">孙子{{$attrs}}</div>
</template>
<script>
export default {
    inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
    created () {
        console.log(this.$attrs) // {weight: 100, height: 160}
        // 访问的是爷爷组件费prop的属性
    },
    methods: {
        changeName () {
            this.$emit('updateName', 'cool yeye')
            // 在孙子组件emit，正常来说应该emit到了父组件
            // 但是父组件并没有updateName这个函数,但同时父组件有了爷爷组件的作用域
            // 所以在父组件的作用域里找到了爷爷组件定义的updateName方法
        }
    }
}
</script>
```

- **eventBus**

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

- **vuex**

#### 总结

父子组件的通信： prop/$emit、ref、$children/$parent、provide / inject、$attrs / $listeners
兄弟组件：eventBus、vuex
隔代组件： eventBus、vuex、provide / inject 、$attrs / $listeners

## :white_medium_square: 6. computed、watch 和 methods 区别

- computed 是计算属性，也就是依赖其它的属性计算所得出最后的值。只有在它的相关依赖发生改变时才会重新求值。computed 主要用于对同步数据的处理。
- watch 是去「观察」一个值的变化，然后执行相对应的函数。watch 监听的响应式数据必须在 data 中初始化。类似于某些数据的监听回调，每当监听的数据变化时都会执行回调进行后续操作。主要用于当你有一些数据需要随着其它数据变动而变动时。（搜索框）
- methods：可以定义方法来进行属性的修改,或者返回。他必须有一定的触发条件才能执行。

**区别**:

- computed 是一个属性，methods 是一个函数，可以传递参数
- computed 具有响应式依赖缓存的特性，只有依赖发生改变，才会执行。
- watch 可以编写异步操作，computed 不可以

能使用 watch 属性的场景基本上都可以使用 computed 属性，而且 computed 属性开销小，性能高，因此能使用 computed 就尽量使用 computed 属性

#### 运用场景

- 当我们需要进行数值计算，并且依赖于其他数据时，应该使用 computed,因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算。
- 当我们需要在数据变化时执行异步操作或者其他开销比较大的操作时，选择 watch,他允许为我们在执行一个异步操作时，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。

#### 通过 prop 实现父组件向子组件通信

- 在父组件定义要传给子组件的信息
- 在子组件用 props 接收父组件传过来的信息

```js
// 父组件
<template>
    <div>
    <h1>我是父组件！</h1>
    <child message="我是父组件传给子组件的信息"></child>
    </div>
</template>
<script>
import Child from '../components/child.vue'
export default {
    components:{
        child
    }
}

//子组件
<template>
    <div>{{message}}</div>
</template>
<script>
export default {
    props:['message']
}
</script>
```

#### 通过$children和$parent、$ref 实现组件通信

- $parent/$children：访问父/子实例。  
  🍗 父组件只有一个，是唯一确定的

```js
// children.vue
<script>
export default{
    created(){
        console.log(this.$parent.name)
    }
}
</script>
```

🍗 但是子组件可以有多个，所以$children 返回的数组

```js
<script>
export default{
    created(){
        console.log(this.$children)
        this.$children.forEach((VueComponent)=>{
            if(VueComponent.name == "你要找的组件名"){
                // 执行操作
            }
        })
    }
}
</script>
```

- $ref: 如果是在普通的 DOM 元素上使用，引用的指向就是该 DOM 元素。如果是在子组件上，引用的就是子组件的实例

```js
// father.vue
<template>
    <div>
        <Children ref="child1"></Children>
    </div>
</tempate>
<script>
import Children from '/children.vue
export default{
    data() {
        return{
           name =  'fatherbanana'
        }
    },
    mounted(){
        console.log(this.$ref.child1.name)//fatherbanana123
    }
}
</script>
// children.vue
<script>
export default {
    data(){
        return {
            name: 'childrenbanana'
        }
    },
    mounted(){
        this.name = this.$parent.name + '123';
    }
};
```

#### 通过$emit 实现子组件向父组件通信

- 父组件通过@event 监听和接收参数
- 在子组件用$emit 绑定一个自定义事件 event，当这个这个语句被执行到的时候，就会将参数 arg 传递给父组件

```js
//父组件
<template>
    <h1>这里是父组件</h1>
    <child @getMessage="showMsg"></child>
</template>
<script>
import Child from '../components/child.vue'
export default {
    components:{child},
    data(){
        return{
            msg:''
        }
    },
    methods:{
        showMsg(msg){
            this.msg = msg
        }
    }
}
</script>
//子组件
<template>
    <h1>这里子组件</h1>
</template>
<script>
import Child from '../components/child.vue'
export default {
    mouted:function(){
        this.$emit('getMessage','你好，这是子组件传给你的信息')
    }
}
</script>

```

#### eventBus:父子、兄弟、隔代组件

创建一个空的 vue 实例

#### $root

#### provide 和 inject：隔代

<!-- https://juejin.cn/post/6844904048118726663#comment -->

## :white_medium_square: 7. Vue-router 的两种模式

Vue-router 是 Vue 官方的路由管理器，用于构建单页面应用，在改变视图的同时不会像后端发送请求。  
vue-router 默认 hash 模式,另一种是 history 模式。  
**Hash**  
Hash 模式的原理是 onhashchange 事件，每次 hash 值的变化，会触发 hashchange 这个事件。  
比如这个 URL：http://www.abc.com/#/hello，hash 的值为 #/hello。  
它的特点在于：hash 虽然出现在 URL 中，但不会被包括在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。

- hashHistory.push()：将新路由添加到浏览器历史访问的栈顶。当我们点击浏览器的返回按钮时可以看到之前的页面。
- hashHistory.replace()：替换掉当前栈顶的路由。后退’按钮不能查看之前的页面。

**Histroy**

- pushState()：用于在浏览历史中添加历史记录
- replaceState()：修改浏览历史中当前纪录  
  这两个方法应用于浏览器的历史记录栈，在当前已有的 back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。只是当它们执行修改时，虽然改变了当前的 URL，但浏览器不会立即向后端发送请求。

**区别**  
hash 模式只能修改#后面的 url 片段，而 history 模式可以设置一个与当前 URL 同源的新的 URL

#### 使用 history 会有什么问题，可以怎么解决？

- **404 错误**
  如果 vue-router 开启 history 模式，由于我们是个单页的客户端应用，如果没有适当的服务器配置，用户在浏览器中直接访问 https://example.com/user/id，就会得到一个 404 错误。想解决这个问题可以在服务器上添加一个简单的回退路由。
- **刷新页面空白**

```js
// nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## :white_medium_square: 8. this.$route和this.$router 的区别

两者都是一个对象，都和路由有关，那他们有什么区别呢？

- **$router** ：是 VueRouter 的实例,相当于一个全局的路由器对象。
  - $router.push
  - $router.go
  - $router.back
  - $router.replace
- **route** : 当前路由对象。
  - $route.query
  - $route.params
  - $route.path
  - $route.hash

## :white_medium_square: 9. router-link 和 router.push 区别

- router-link 可以实现页面的跳转，会在渲染的时候就加载对应的路由，会默认阻止浏览器的默认
- router.push 也可以实现页面的跳转，还可以在跳转前写一些逻辑。

## :white_medium_square: 10. 导航守卫

**官方**：通过跳转和取消的方式守卫导航。一共有:seven:个钩子函数  
**应用**：用户访问页面前提醒用户登录，用户离开页面前提醒用户

**全局钩子**：

- `router.beforeEach`: 全局前置守卫
- `router.beforeResolve`: 全局解析守卫
- `router.afterEach`: 全局后置守卫

**组件钩子**：

- `beforeRouteEnter`：在渲染该组件的对应路由被 comfirm 前调用，不能获取组件实例'this',因为当守卫执行前，组件实例还没被创建。
- `beforeRouteLeave`：导航离开该组件的对应路由时调用，可以获取组件实例'this'
- `beforeRouteUpdate`：在当前路由发生改变时调用，举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。可以获取组件实例'this'

**路由钩子**

- `beforeEnter`: 路由管道钩子，可以直接在路由配置上定义 beforeEnter 守卫。只在进入路由时触发，不会在 params、query 或 hash 改变时触发。例如，从 /users/2 进入到 /users/3 或者从 /users/2#info 进入到 /users/2#projects

这几个钩子都接受三个参数：

- `to`：即将要<font color="#f34134">进入</font>的目标路由对象，该对象有目标页的路由信息
- `from`：当前导航要<font color="#f34134">离开</font>的路由，该对象有当前页的路由信息
- `next`: 是一个 `Function`，一定要用这个方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数
  - `next()`：进入<font color="#f34134">下一个钩子</font>，如果全部钩子执行完了，则导航的状态就是`comfirmd`(确认的)
  - `next('/')`或者`next({path:'/'})`：跳转到<font color="#f34134">新导航</font>,可像 router-link 或 router.push 设置参数
  - `next(false)`：中断导航，如果浏览器的 URL 改变了（浏览器后退按钮），就会回到`from`路由对应的的地址
  - `next(error)`：导航终止且该错误会被传递给`router.onError()`注册过的回调

**完成的导航解析过程**

- 导航被触发
- 失活导航调用 beforeRouteLeave
- 调用全局钩子 beforeEach
- 失活导航调用 beforeRouteUpdate
- 调用路由钩子 beforeEnter
- 解析异步路由组件
- 激活导航调用 beforeRouteEnter
- 调用全局钩子 beforeResolve
- 导航被确认
- 调用全局钩子 afterEach
- 触发 DOM 更新
- 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数
  ![路由守卫](../../.vuepress/imgs/interview/vue/routershouwei.png)
  **应用场景解析**：页面跳转前需验证是否登录，若为已登录，则可跳转；若未登录或者登录过期，则跳到登录页面。

```js
//将表示登录状态的变量存放到store对象中
export default new Vuex.Store({
    states:{
        isLogin:false;
    },
    mutations:{
        handleLogin(state,login){
            state.isLogin = login;//把最新的登录状态更新到Store中
        }
    }
})
//登录页，输入账户密码登录成功之后，改变登录状态为true
methods:{
    ...mapMutations(['handleLogin']),
    summitLogin(){
        this.handleLogin(true)//改变状态
        this.$route.push({path:'/home'})//跳到主页
    }
}
//每一次页面切换时，全局钩子beforeEach都会触发，去验证用户的登录状态
router.beforeEach((to,from,next)=>{
    const isLogin = obj.state.isLogin;
    //判断是不是要跳到登录页面或者目前是否为登录状态
    if(to.path === './login' || isLogin){
        next();
    }else{
        next('/login');//非登录状态，跳到登录页面
    }
})
```

## :white_medium_square: 11. 什么是编程式导航

除了使用 `<router-link>` 创建 a 标签来定义导航链接（声明式导航）,我们还可以借助 router 的实例方法，通过编写代码来实现。

- 🍦 router.push: 这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。点击 `<router-link :to="...">` 等同于调用 router.push(...)。

```js
// 字符串
router.push("home");
// 对象
router.push({ path: "home" });
// 命名的路由
router.push({ name: "user", params: { userId: "123" } });
// 带查询参数，变成 /register?plan=private
router.push({ path: "register", query: { plan: "private" } });
```

注意：如果提供了 path，params 会被忽略

- 🍦 router.go(n): 这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步

```js
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1);
// 后退一步记录，等同于 history.back()
router.go(-1);
// 前进 3 步记录
router.go(3);
// 如果 history 记录不够用，那就默默地失败呗
router.go(-100);
router.go(100);
```

- 🍦 router.replace
  跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

## :white_medium_square: 12. 路由跳转怎么传参

- **params**(不会丢失): params 设置在路由上，成为路由的一部分，传参的时候，参数名要跟路由后面设置的参数名对应。params 会在 url 上面出现,页面刷新数据<font color="#f34134">不会丢失</font>

```js
//路由配置
{
    path:'/nextUrl:id/',
    name:'nextUrl',
    component:'nextUrl'
}
// 跳转传参
this.$router.push({ name:'nextUrl', params: { id: 123 }})
this.$router.push({path:'/nextUrl/${id}'})
// 获取参数方法
this.$route.params.id
// url: /nextUrl/12
```

> params 一旦设置在路由，params 就是路由的一部分，如果这个路由有 params 传参，但是在跳转的时候没有传这个参数，会导致跳转失败或者页面会没有内容。

```js
// 跳转传参
this.$router.push({ name: "nextUrl", params: { id: 123 } });
// url: /nextUrl
```

- **params**_(会丢失)_: 参数是对象的时候，通过 name 来确定匹配的路由。params 不会在 url 上面出现。页面刷新数据<font color="#f34134">会丢失</font>

- **query**: 参数是字符串的时候，通过 path 来确定匹配的路由。query 传递的参数会显示在 url 后面?id=？,页面刷新数据<font color="#f34134">不会丢失</font>

```js
this.$router.push({ path: "/nextUrl/", query: { id: 5 } });
this.$route.query.id; //获取参数
// url: /nextUrl?id=5
```

> 展示上 params 路由传参像 Ajax 中 post 传参方式,query 路由传参像 get 传参

## :white_medium_square: 13. vue 如何响应路由参数的变化

🌰 ：当使用路由参数时，例如从 /lhz?id=1 到 lhz?id=2，此时原来的组件实例会被复用。这也意味着组件的生命周期钩子不会再被调用，此时 vue 应该如何响应路由参数的变化？

- 🍉 利用 `watch` 监听变化

```js
const User = {
  template: "...",
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    },
  },
};
```

- 🍉 利用路由守卫

```js
const User = {
  template: "...",
  beforeRouteUpdate(to, from, next) {
    // react to route changes...
    // don't forget to call next()
  },
};
```

## :white_medium_square: 14. Vuex

**官方说法**：Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。  
**官方栗子**：

```js
new Vue({
  // state  数据源
  data() {
    return {
      count: 0,
    };
  },
  // view  视图
  template: `
    <div>{{ count }}</div>
  `,
  // actions  事件
  methods: {
    increment() {
      this.count++;
    },
  },
});
```

⌛ 这是一个简单的型计数功能页面，通过 increment 函数实现 count 的增长。

❓ 那么问题来了，假如有两个页面，要求他们都能对 count 进行操控，并且都能第一时间获取 count 的变化，那怎么办呢？  
💡 是不是可以把 count 剥离出来放到一个大家都能访问到的地方，并且能访问到最新的值。

这就是 Vuex 在做的事，Vuex 就如同一个全局的管理员一样，帮着我们统一管理着项目的<u>共享数据</u>。那他是怎么实现的呢？请看：

```js
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});
```

🙈 但是这么一想，这不就是一个全局对象吗？他和单纯的全局对象有什么不一样的地方呢？

- Vuex 的存储状态是响应式的，当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那相应的组件也会相应地得到高效更新。
- 不能直接改变 store 中的状态，需要通过 mutation

#### 几个核心概念

每一个 Vuex 应用的核心就是 store（仓库）,“store”基本上就是一个容器(对象），它包含着你的应用中大部分的状态 (state)。

**State**：State 是 vuex 状态管理的数据源  
**Getter**：Getter 可以将 State 的数据进行过滤再输出  
**Mutation**：Mutation 是 vuex 中改变 State 的唯一途经（严格模式下）,并且只能是同步操作  
**Action**：一些对 State 的异步操作可以存放在 Action 中，并通过 Action 提交 Mutation 变更状态  
**Module**：当 Store 对象过强大，可以根据业务需求分成多个 Module  
![vuex](../../.vuepress/imgs/blog/vue/guild/vuex.jpg)

✨ 总结：我们通过组件出发 Action，Action 会提交 Mutation，Mutation 会修改 state，组件再根据 state 和 Getter 渲染页面。

#### 应用场景

Vuex 一般用于中大型 Web 单页应用对应用的状态进行管理。  
下面介绍几个常用的场景：

- 使用 vuex 解决跨组件通信问题
- vuex 作为数据存储中心

## :white_medium_square: 15. Minxin

## :white_medium_square: 16. Vue SSR

简单的理解就是：vue 在客户端将标签渲染成整个 html 片段的工作，在服务器完成，服务器形成 html 片段直接返回给客户端这个过程就叫做 SSR(服务端渲染)。[官网教程](https://ssr.vuejs.org/zh/guide/)

- 优点
  - 首屏加载更快
  - 更好的 SEO
- 缺点
  - 开发限制：服务器端渲染只只支持 `beforeCreate` 和 `created`
  - 更多的服务器负载：因为在 Node.js 渲染完整的应用程序需要占用大量的 CPU 资源

## :white_medium_square: 17. 什么是 SPA 页面，优缺点是什么？

**SPA**(single-page application)：单页面应用。简单理解就是一个项目只有一个 web 页面，然后通过路由机制实现 HTML 内容的变换。

- _优点_
  - 良好的用户交互体验，用户在不断访问应用页面时不会重新加载整个页面，从而避免了重新加载页面
  - 基于上一点，服务器的压力小，不用管展示逻辑和页面合成，吞吐能力会提高几倍
  - 有利于前后端分离，前端负责交互逻辑，后端负责数据处理
- _缺点_
  - 初次加载耗时过多：为实现单页面的应用功能和显示效果，需要在加载页面时将 JavaScript、CSS 统一加载，部分页面按需加载。  
    <font color="#425fe;">可以压缩 js、css 代码,按需加载，懒加载</font>
  - SEO 难度较大：因为单页面内容切换时页面是不刷新的，所以网页记录和内容很难被引擎抓取到。  
    <font color="#425fe;">用#!代替#h,因为谷歌会抓取带有#!的 URL</font>
  - 前进后退路由管理：不能使用浏览器的前进后退功能。  
    <font color="#425fe;">配置路由，记录浏览记录的历史路由信息</font>

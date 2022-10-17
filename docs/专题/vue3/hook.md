### Hook

`hook`本质上是一个函数，把`setup`函数中使用的`Composition Api`进行封装,类似于 vue2 中的`mixin`。 自定义`hook`的优势，复用代码，让`setup`中的逻辑更清楚易懂。

eg： 实现一个点击页面时获取鼠标位置，并将坐标值显示在页面

1. 未使用 hook

```js
<template>
    <h2>当前点击时的鼠标坐标为：x:{{ point.x}}, y:{{point.y}}</h2>
</template>

<script>
    import {reactive, onMounted, onBeforeUnmount} from 'vue'
    export default {
        name: 'Demo',
        setup() {
            let point = reactive({
                x:0,
                y:0
            }),

            function savePoint(event) {
                point.x = event.pageX
                point.y = event.pageY
            },

            onMounted() {
                window.addEventListener('click', savePoint)
            }

            onBeforeUnmount() {
                window.removeEventListener('click', savePoint)
            }

            return { point }
        },
    }
</script>
```

2. 使用 hook

```js
// hooks/usePoint.js
// 用到的都要引入一遍
import {reactive, onMounted, onBeforeUnmount} from 'vue'

export default function usePoint () {
    let point = reactive({
        x:0,
        y:0
    }),

    function savePoint(event) {
        point.x = event.pageX
        point.y = event.pageY
    },

    onMounted() {
        window.addEventListener('click', savePoint)
    }

    onBeforeUnmount() {
        window.removeEventListener('click', savePoint)
    }
    return point
}

// app.vue
<template>
    <h2>当前点击时的鼠标坐标为：x:{{ point.x}}, y:{{point.y}}</h2>
</template>

<script>
    import {reactive, onMounted, onBeforeUnmount} from 'vue'
    import usePoint from '../hooks/usePoint'
    export default {
        name: 'Demo',
        setup() {
            // 使用hook，其他组件也可以通过这种方式实现相同的功能
            let point = usePoint()
            return { point }
        },
    }
</script>
```

:::tip Driver
此文介绍的是在项目中使用页面引导的具体实现  
📦：[driverjs](https://github.com/kamranahmedse/driver.js)
:::

```js
// index.vue
<template>
    <div class="app-container">
        <aside>
            The guide page is useful for some people who enterd the project for the first time.
            You can briefly introduce the feature of the project, Demo is based on
            <a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js.</a>
        </aside>
        <el-button icon="el-icon-question" type="primary" @click.prevent.stop="guild">
            Show Guild
        </el-button>
    </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from './steps'
export default {
    name: 'Guild',
    data() {
        return {
            dirver: null
        }
    },
    mounted() {
        this.dirver = new Driver() // 初始化
    },
    methods: {
        guild() {
            this.dirver.defineSteps(steps) // 创建导航
            this.dirver.start() // 开始演示
        }
    }
}
</script>

// steps.js
const steps = [
    {
        element: '#hamburger-container', // 需要显示导航的元素的id
        popover: {
            title: 'Hambuger',
            description: 'Open && Close siderbar',
            position: 'botton'
        }
    },
    {
        element: '#breadcrumb-container',
        popover: {
            title: 'Breadcrumb',
            description: 'Indicate the current page location',
            position: 'bottom'
        }
    },
    {
        element: '#header-search',
        popover: {
            title: 'Page Search',
            description: 'Page Search, quick navigation',
            position: 'left'
        }
    }
]
export default steps
```

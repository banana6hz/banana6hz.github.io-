:::tip Screenfull
此文介绍的是页面全屏的实现  
📦：[screenfull](https://github.com/sindresorhus/screenfull)
:::

1. `npm install --save screenfull`
2. 使用

```js
//  index.vue
<template>
    <div>
        <!-- 根据isFullscreen的值切换icon -->
        <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click"></svg-icon>
    </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
    name: 'Screenfull',
    data() {
        return {
            isFullscreen: false
        }
    },
    mounted() {
        this.init()
    },
    beforeDestroy() {
        this.destroy()
    },
    methods: {
        init () {
            // 初始化
            if (screenfull.enabled) {
                // 监听change事件
                screenfull.on('change', this.change)
            }
        },
        change () {
            // 切换isFullscreen的值
            this.isFullscreen = screenfull.isFullscreen
        },
        destroy () {
            // 销毁change事件
            if(screenfull.enabled) {
                screenfull.off('change', this.change)
            }
        },
        click() {
            if (!screenfull.enabled) {
                this.$message({
                    message: 'you browser can not work',
                    type: 'warning'
                })
                return false
            } else {
                // 点击触发toggle事件
                screenfull.toggle()
            }
        }
    }
}
</script>
// 在需要全屏显示的页面调用即可
// navbar.vue
<screenfull id="screenfull" class="right-menu-item hover-effect" />
```

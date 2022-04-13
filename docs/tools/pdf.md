:::tip PDF
此文介绍的是浏览器打印 pdf 的功能，这个功能相对简单，主要用到浏览器本身的方法`window.print()`
:::

### 🔧 小技巧

- 打开 pdf 打印窗口的时候，出现有些元素没有背景色，可以试试在元素上加上`-webkit-print-color-adjust: exact;`
- 如果需要在加载时全屏幕锁定，不可触发任何事件、即使在有滚动条的情况下滚动事件同样禁止，可以加上`v-loading.fullscreen.lock`

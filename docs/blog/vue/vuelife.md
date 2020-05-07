## Vue生命周期
Vue生命周期是面试中常遇到的题，并且之前在项目中，也因为不够理解Vue的生命周期，无法显示数据，希望能通过这次学习，真正理解到Vue的生命周期。  

---
先来一张官方的**生命周期图**  
![vue生命周期](../../.vuepress/imgs/blog/vue/vuelife/life.jpg)  
1. 首先顶部的 **new Vue()** 是Vue实例的初始化  
2. 在 **beforeCreate** 钩子函数调用的时候，是获取不到 **props** 或者 **data** **methods** 中的数据的。
3. **created** :**data** **methods**初始化成功，可获取。  
4. **beforeMount** 开始创建VDOM，但是还没挂载，页面中的元素还没真正替换过来，页面还未渲染
5. **mounted** 页面已经渲染成功,执行到这一钩子函数，就表示vue实例被完整创建
6. **beforeUpdate**
7. **updated**
8. **beforeDestroy**
9. ****
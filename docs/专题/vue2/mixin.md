### mixin

可以对一些公共的数据或者函数进行复用

- 当 mixin 和组件本身有重复的东西（data,props,methods,computed),组件的会覆盖 mixin 的，最后以组件的为准
- 当 mixin 和组件有重复的生命周期，都会执行，先执行 mixin 的再执行组件的
- 全局混入：`Vue.mixin(hunhe)`,全部组件都能用
- 局部混合： `mixin: ['hunhe']`

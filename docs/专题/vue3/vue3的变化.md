### vue3.0 的变化

### Composition API 的优势

- vue2 的 options api: 一个功能的代码要开在四个地方写，data,method,computed,watch
- vue3 的 composition API: 一个功能的代码可以写的集中一点，可以写成 hook 再引入，代码更清晰，更好维护

### 其他变化

- 全局 api 的转移，Vue.xx 调整到应用实例 app 上，eg: Vue.component => app.component,Vue.config.xx => app.config.xx
- data 选项应始终被声明为一个函数
- 过渡类名的修改
- 移除 keyCode 作为 v-on 的修饰符，eg: @keyup.13
- 移除 filter

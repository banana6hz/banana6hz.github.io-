:::tip Cilpboard
这是一个复制粘贴的功能，此次介绍两种使用方法：直接使用、自定义指令使用

📦: [clipboard](https://github.com/zenorocha/clipboard.js)
:::

## 直接使用

1. `npm install clipboard --save`
2. 页面直接使用

```js
// code
<el-button type="primary" icon="el-icon-document" @click="handleCopy(inputData,$event)">
  copy
</el-button>
// code
import clip from '@/utils/clipboard' // use clipboard directly
//code
handleCopy(text, event) {
  clip(text, event)
}
//code
```

## 自定义指令

1. 创建指令

```js
// Inspired by https://github.com/Inndy/vue-clipboard2
const Clipboard = require('clipboard')
if (!Clipboard) {
  throw new Error('you should npm install `clipboard` --save at first ')
}

export default {
  bind(el, binding) {
    if (binding.arg === 'success') {
      // 这里绑定的是clipboardSuccess()
      el._v_clipboard_success = binding.value
    } else if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value
    } else {
      const clipboard = new Clipboard(el, {
        text() { return binding.value },
        action() { return binding.arg === 'cut' ? 'cut' : 'copy' }
      })
      clipboard.on('success', e => {
        const cb = el._v_clipboard_success
        cb && cb(e)
      })
      clipboard.on('error', e => {
        const cb = el._v_clipboard_error
        cb && cb(e)
      })
      el._v_clipboard = clipboard
    }
  },
  update(el, binding) {
    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value
    } else if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value
    } else {
      el._v_clipboard.text = function() { return binding.value }
      el._v_clipboard.action = function() { return binding.arg === 'cut' ? 'cut' : 'copy' }
    }
  },
  unbind(el, binding) {
    if (binding.arg === 'success') {
      delete el._v_clipboard_success
    } else if (binding.arg === 'error') {
      delete el._v_clipboard_error
    } else {
      el._v_clipboard.destroy()
      delete el._v_clipboard
    }
  }
}
```

2. 注册指令  
   具体操作看项目结构，可全局注册也可在页面中注册
3. 页面使用指令

```js
// code
<el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
  copy
</el-button>
// code
clipboardSuccess() {
  this.$message({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500
  })
}
```

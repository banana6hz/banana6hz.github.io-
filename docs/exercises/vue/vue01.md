## VUE中演示v-for为什么要加key？  
无：key属性时，状态默认绑定的是位置。  
有：key属性时，状态根据key的属性值绑定到了相应的数组元素。 

---
![栗子](../../.vuepress/imgs/common/example.png)  
首先讲一下diff算法的处理方法，对操作前后的dom树同一层的节点进行对比，一层一层对比，如下图：
![vue-for](../../.vuepress/imgs/interview/vue/vue-for01.png)  
当某一层有很多相同的节点时，也就是列表节点时，Diff算法的更新过程默认情况下也是遵循以上原则。  
比如一下这个情况：  
![vue-for](../../.vuepress/imgs/interview/vue/vue-for.png)   
我们希望可以在B和C之间加一个F，Diff算法默认执行起来是这样的： 
![vue-for](../../.vuepress/imgs/interview/vue/vue-for2.png)  
即把C更新成F，D更新成C，E更新成D，最后再插入E，是不是很没有效率？  

**有key(调整位置过程)**  
所以我们需要使用key来给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点，找到正确的位置区插入新的节点。

我们可以对同一层级的同组节点添加一个唯一的key进行区分，此处的key就好比数据库里面主键的概念，通过它可以唯一的确定一组节点。  
![vue-for](../../.vuepress/imgs/interview/vue/vue-for3.png)  
vue中列表循环需加:key="唯一标识" 唯一标识可以是item里面id index等，因为vue组件高度复用增加Key可以标识组件的唯一性，为了更好地区别各个组件 key的作用主要是为了高效的更新虚拟DOM

## vue中computed和watch区别
- computed是计算属性，也就是依赖其它的属性计算所得出最后的值
- watch是去监听一个值的变化，然后执行相对应的函数

## 父子组件如何通信  
### 通过prop实现父组件向子组件通信
- 在父组件定义要传给子组件的信息
- 在子组件用props接收父组件传过来的信息
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
### 通过$ref实现父组件向子组件通信  

### 通过$emit实现子组件向父组件通信
- 父组件通过@event监听和接收参数
- 在子组件用$emit绑定一个自定义事件event，当这个这个语句被执行到的时候，就会将参数arg传递给父组件
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

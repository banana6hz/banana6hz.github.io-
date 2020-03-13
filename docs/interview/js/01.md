## JS
####  1. js的各种位置，比如clientHeight,scrollHeight,offsetHeight ,以及scrollTop, offsetTop,clientTop的区别？ 

属性名|区别
:---:|:--:
clientHeight|表示元素的**可视区域**的高度，不包含border和滚动条.样式的height+上下padding
scrollHeight|表示元素的**可视**的高度，包含了border和滚动条,还包含::before，::after这样的伪元素
offsetHeight|表示了**所有区域**的高度，包含了因为滚动被隐藏的部分
offsetTop   |为容器相对于document的top的绝对偏移---→等于top+margin-top




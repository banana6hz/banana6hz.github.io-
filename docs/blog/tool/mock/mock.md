## Mock.js的使用
在开发过程中，往往都是后台还没准备好接口，就要开始搭前端的页面了，那对于一些由后端返回的动态数据前端要怎么展示呢？这个时候学会如何模拟后台返回的数据就不用追着后台小伙伴要接口啦。Mock.js就是这么一个能模拟后台数据的东东啦。  

### 在原生项目中使用  
:one: 首先要先加载 `mock.js` ，可以直接引用官网，也可以去网站上下下来。区别就是下下来的话没有网也可以开发。  
```js
// <!-- 加载 Mock -->
<script src="http://mockjs.com/dist/mock.js"></script>
// 下下来的话路径就是你放的位置啦
```
:two: 模拟你要的数据<font color="#f34134">（更多示例可以参考官网<http://mockjs.com/>）</font>
```js
Mock.mock('http://api.com', {
    "data1|8": [{
        'name|5-10': '@cname',// 随机生成5-10个中文字符
        'age|1-100': 100,//100以内随机整数
        'time': '@date("yyyy-MM-dd")',//随机生成一个日期
        'city': '@city(true)'//中国城市
    }],
    "data2|3": [{
      'name': '@cname',
      'string|10-15': '我',// 生成10-15个我
      'time': '@date("yyyy-MM-dd")'
    }]
});
$.ajax({
  url: 'http://api.com',
  dataType: 'json'
}).done(function(data, status, xhr) {
  for(var i=0;i<data.data1.length;i++){
    //把数据渲染在页面上
  }
  for(var i=0;i<data.data2.length;i++){
    //把数据渲染在页面上
  }
```

### 在Vue项目中使用
:one: 安装 `mock.js`  
```js
npm install mock.js --save-dev
```

:two: 在src下创建一个mock的文件夹，里边存在index.js，这个文件是保存模拟数据路径的地方
```js
import Mock from 'mockjs'
 https://www.cnblogs.com/tzm-001/p/10382534.html
});
```
:three: 发送请求
```js

```
巴拉巴拉。。。。  
emmm 那他能不能传参数呢？
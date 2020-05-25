## 浏览器跨域解决方案  
### 什么是跨域  
当一个请求url的：**协议**、**域名**、**端口**三者之间任意一个与当前地址不同的时候，就是跨域
URL (http://www.a.com/a.html)             |        说明    |   是否允许通信  
:--:|:--:|:--:
http://www.a.com/b.js        | 同一域名下         | 允许 
http://www.a.com/script/b.js |同一域名下不同文件夹 |允许
http://www.a.com:8000/b.js   |同一域名，不同端口   | 不允许
https://www.a.com/b.js       |同一域名，不同协议   |不允许
http://70.32.92.74/b.js      |域名和域名对应ip     |不允许
http://script.a.com/b.js     |主域相同，子域不同   |不允许（cookie这种情况下也不允许访问）
http://a.com/b.js            |同一域名，不同二级域名（同上） |不允许（cookie这种情况下也不允许访问）
http://www.a.com/b.js        |不同域名 |不允许

### 跨域的时候浏览器为啥会报错  
为了保护用户安全上网，避免浏览器受到XSS（跨站脚本攻击）、CSRF（跨站点请求伪造）等攻击。 基于浏览器的**同源策略**限制：协议、域名、端口号三者相同即为同源。浏览器会拒绝跨域请求。  
出现跨域问题，一般会这么报错：  
![跨域报错](../../.vuepress/imgs/interview/net/kuayu01.png)  

### 跨域会导致什么情况 
  - Cookie、LocalStorage 和 IndexDB 无法读取（操作）
  - DOM 和 JS 对象无法获取（操作）
  - Ajax请求发送不出去 


### 🤜 解决方法——JSONP  
像img、script等带有src属性的标签是没有跨域限制的，所以我们可以动态创建script标签，通过src属性来进行跨域请求的来源,再用一个回调函数处理数据，<u>但只能用于GET</u>。  
- 使用script标签发送请求
- 在src给服务器传递一个callback
- callback 的值对应到页面一定要定义一个全局函数（为什么是全局？因为服务端接收到callback函数后会返回页面中的script中去找，如果不写在全局作用域中根本找不到）
- 服务端返回的是一个<u>函数的调用</u>。调用的时候会吧数据作为参数包在这个函数里面。

```js
//动态创建script
var url = "http://banana6hz.com/jsonp?callback=showData";
var script = document.createElement('script');
script.setAttribute('src', url);
//向头部输入一个脚本，该脚本发起一个跨域请求
document.getElementsByTagName('head')[0].appendChild(script); 
<script type="text/javascript">
  //回调函数
  function showDate(result){
    console.log(result);
  }
</script>
```
再来看看jQuery如何实现jsonp调用
```js
<script type="text/javascript">
jQuery(document).ready(function(){ 
  $.ajax({
  type:"get",
  async:false,
  url:"",
  dataType:"jsonp",
  jsonp:"callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
  jsonCallback:"showDate",//自定义的jsonp回调函数名
  success:function(json){
    //对请求到的数据进行处理
    console.log(jsonp)
  },
  error:function(){
    alert('error')
  }
});
</script>
```

### 🤜 解决方法——CORS(跨域资源共享)  
W3C推出的了一个标准----"跨域资源共享"（Cross-origin resource sharing），简称CORS。该标准定义了跨域访问资源时服务器和浏览器怎么通信。
 
**实现原理**：浏览器一旦发现跨越请求，就会自动添加一些头信息和服务器进行沟通，来确定跨域请求通不通过。

现在除IE10以下的浏览器都支持这个标准。  

服务器设置Access-Control-Allow-Origin就可以开启CORS。该属性表示那些域名可以访问资源。如果设置通配符则表示所有网站都可以访问资源。 
   
浏览器会把跨域请求分成两类：简单和非简单请求。
- 简单请求
   + 请求方法为：<u>post、get、head</u>   
   + Content-Type的值仅限为以下三种之一:`text/plain` `multipart/form-data` `application/x-www-form-urlencoded`

- 复杂请求：除简单请求以外的其他请求  

**实现方法**  
- 简单请求  
   + 浏览器发出CORS请求，在头信息添加Origin字段，字段说明本次请求来自哪个源（协议+端口+域名）
   + 服务器判断Origin指定的源在不在许可范围内。
      - 如果在，服务器返回的响应，会多出几个头部信息。
      ```js
      Access-Control-Allow-Origin: http://banana.com 
      //值为Orign字段的值，或者*,表示接受任何域名的请求
      Access-Control-Allow-Credentials: true 
      //布尔值，表示是否允许浏览器发送cookie给服务器
      Access-Control-Expose-Headers: FooBar 
      //表示可以通过getResponseHeader('FooBar')获FooBar字段的值
      Content-Type: text/html; charset=utf-8
      ```
      - 如果不在，服务前返回一个正常的HTTP响应，浏览器发现回应的头部信息里没有Access-Control-Allow-Orign字段，抛出错误。

- 复杂请求：复杂请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求。  
   + 浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。
   ```js
   //浏览器js脚本
    var url = 'http://banana.com/cors';
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('X-Custom-Header', 'value');
    xhr.send();

    //浏览器发出预检请求
    OPTIONS /cors HTTP/1.1 //Option表示这个请求是用来询问的
    Origin: http://banana.com
    Access-Control-Request-Method: PUT
    Access-Control-Request-Headers: X-Custom-Header
    Host: banana.com
    Accept-Language: en-US
    Connection: keep-alive
    User-Agent: Mozilla/5.0...
   ```

    - 肯定答复，浏览器发出正式的XMLHttpRequest请求
    - 拒绝，报错
    ```js
    XMLHttpRequest cannot load http://banana.com.
    Origin http://banana.com is not allowed by Access-Control-Allow-Origin.
    ```

### 🤜 解决方法——document.domain  
该方法只能只用于**二级域名相同的情况下**。
```js
'a.banana.com`
`b.nanana.com`
document.domain = banana.com
这样他们就可以跨域访问数据了
```  

### 🤜 解决方法——postMessage

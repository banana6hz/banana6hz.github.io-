## 来看看 COOKIE和SESSION有什么区别   

**Cookie**:Cookie技术通过在请求和响应报文中写入Cookie信息来控制客户端的状态。  
Cookie会根据从服务器端发送的响应报文内的一个叫做Set-Cookie的首部字段信息，通知客户端保存Cookie。通常，它用于告知服务端两个请求是否来自同一浏览器， 

**Session**:客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上。这就是Session。客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了。

![图示](../../../.vuepress/imgs/blog/net/cookie_session01.png)

**区别**  
- 存储位置不同
   + cookie是储存到客户端的
   + session是储存到服务器端的
- 存储不同  
   + Cookie 只能保存 ASCII，单个cookie保存的数据<=4KB，一个站点最多保存20个Cookie。
   + Session 可以存任意数据类型。对于session来说并没有上限，但出于对服务器端的性能考虑，session内不要存放过多的东西，并且设置session删除机制。
- 有效期上不同
   + 开发可以通过设置cookie的属性，达到使cookie长期有效的效果。比如我们经常使用的默认登录功能。
   + session依赖于名为JSESSIONID的cookie，Session一般失效时间较短，客户端关闭或者Session 超时都会失效。  
- 隐私策略不同
   + cookie对客户端是可见的，别有用心的人可以分析存放在本地的cookie并进行cookie欺骗，所以它是不安全的。
   + session存储在服务器上，安全性相对 Cookie 要好一些。
- 跨域支持上不同
   + cookie支持跨域名访问。
   + session不支持跨域名访问。


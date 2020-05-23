## 来看看cookie和session localStorage和sessionStrorage

<!-- 首先，因为HTTP连接是无状态的，不会储存信息，但在实际的应用中，我们需要跟踪浏览器用户的身份，如储存登录信息。所以就有了它们。 -->

👉**Cookie**：储存在用户本地终端上的数据。一般由服务器生成，可设置过期时间。

Cookie会根据从服务器端发送的响应报文内的一个叫做Set-Cookie的首部字段信息，通知客户端保存Cookie。通常，它用于告知服务端两个请求是否来自同一浏览器。  

👉**Session**：Session对象存储特定用户会话所需的属性及配置信息，一旦关闭浏览器，所有数据都会消失。

当服务器收到请求需要创建session对象时，首先会检查客户端请求中是否包含sessionid。如果有sessionid，服务器将根据该id返回对应session对象。如果客户端请求中没有sessionid，服务器会创建新的session对象，并把sessionid在本次响应中返回给客户端。通常使用cookie方式存储sessionid到客户端，在交互中浏览器按照规则将sessionid发送给服务器。

![图示](../../../.vuepress/imgs/blog/net/cookie_session01.png)

来看看这两者的区别：
区别|cookie|session
:--:|:--:|:--:
存储位置|客户端|服务器端
大小    |一个站点<=4kb|无上限
数据类型|只能保存ASCII|任意数据类型
有效期|如未设置过期时间，则到浏览器关闭|？
跨域名访问|可|不可
安全性|对客户端是可见的，别有用心的人可以分析存放在本地的cookie并进行cookie欺骗|存储在服务器上，安全性相对 Cookie 要好一些。

应用
- cookie
   + 判断用户是否登陆过网站，以便下次登录时能够实现自动登录（或者记住密码）
   + 保存上次登录的时间等信息。
   + 保存上次浏览的页面
   + 浏览计数
- session:用于保存每个用户的专用信息，变量的值保存在服务器端，通过SessionID来区分不同的客户
   + 网上商城中的购物车
   + 保存用户登录信息
   + 将某些数据放入session中，供同一用户的不同页面使用

Cookie存储机制是HTML4的，他有很多的缺点和局限性，所以在HTML5中，推出了新的存储机制Web Strorage，这它分为以下两种：  

👉**localStorage（本地存储）**：该对象可将数据长期保存在客户端，即使是重新打开浏览器也不会丢失。  
如果要清除对象保存内容，需调用localStorage.removeItem(key)。localStorage.setItem(key,value); localStorage.getItem(key);
localStorage.clear()清楚全部的数据,localStorage在所有同源窗口中共享；

👉**sessionStrorage（会话存储）**：保存用户临时会话数据；一旦关闭浏览器，所有数据都会消失。sessionStorage不在不同浏览器窗口中共享

**Service Worker**

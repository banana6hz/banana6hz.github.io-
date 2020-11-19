## HTTP协议
HTTP协议——<u>超文本协议</u>，工作于客户端-服务端架构上，基于<u>TCP/IP</u>通讯协议来传递数据，所有的www文件都必须遵守这个标准。  
- 无连接：每次只处理一个请求，服务器处理完客户的请求，并受到客户端的应答后，即断开连接
- 无状态：无状态是指协议对事务处理没有记忆能力，自身不对请求和响应之间的通信状态进行保存, 处理本次事务时无法调取前面的信息，只能重传。

### HTTP请求
🍗**请求行**  
 `GET /image/logo.gif HTTP/1.1` (请求方法+URL+协议版本)  

序号|方法|描述
:--:|:--:|:--:
1| GET|请求指定的页面信息，并返回实体主体 
2|HEAD|类似于 GET 请求，只不过返回的响应中没有具体的内容，用于获取报头 
3|POST|向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST 请求可能会导致新的资源的建立和/或已有资源的修改。
4| PUT|从客户端向服务器传送的数据取代指定的文档的内容。
5| DELETE|请求服务器删除指定的页面。
6| CONNECT|HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器。
7| OPTIONS|允许客户端查看服务器的性能。
8| TRACE  |回显服务器收到的请求，主要用于测试或诊断
9| PATCH  |是对 PUT 方法的补充，用来对已知资源进行局部更新 。

🍗**客户端请求消息**  
客户端发送一个HTTP请求到服务器的请求消息包括以下格式：<u>请求行</u>（request line）、<u>请求头部</u>（header）、<u>空行</u>和<u>请求数据</u>四个部分组成  
如图：  
![http请求](../../../.vuepress/imgs/blog/net/http01.png)

🍗**服务器响应消息**
HTTP响应也由四个部分组成，分别是：<u>状态行</u>、<u>消息报头</u>、<u>空行</u>和<u>响应正文</u>。
![服务器响应](../../../.vuepress/imgs/blog/net/http02.png)
```js
//请求
GET /hello.txt HTTP/1.1
User-Agent: curl/7.16.3 libcurl/7.16.3 OpenSSL/0.9.7l zlib/1.2.3
Host: www.example.com
Accept-Language: en, mi

//响应
HTTP/1.1 200 OK
Date: Mon, 27 Jul 2009 12:28:53 GMT
Server: Apache
Last-Modified: Wed, 22 Jul 2009 19:15:56 GMT
ETag: "34aa387-d-1568eb00"
Accept-Ranges: bytes
Content-Length: 51
Vary: Accept-Encoding
Content-Type: text/plain

//输出结果
Hello World! My payload includes a trailing CRLF.
```

🍗**首部**  
首部分为请求首部和响应首部，并且部分首部两种通用
- **Request Header**
```js
GET /sample.Jsp HTTP/1.1  //请求行
Host: www.uuid.online/  //请求的目标域名和端口号
Origin: http://localhost:8081/  //请求的来源域名和端口号 （跨域请求时，浏览器会自动带上这个头信息）
Referer: https:/localhost:8081/link?query=xxxxx  //请求资源的完整URI
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36 //浏览器信息
Cookie: BAIDUID=FA89F036:FG=1; BD_HOME=1; sugstore=0  //当前域名下的Cookie
Accept: text/html,image/apng  //代表客户端希望接受的数据类型是html或者是png图片类型 
Accept-Encoding: gzip, deflate  //代表客户端能支持gzip和deflate格式的压缩
Accept-Language: zh-CN,zh;q=0.9  //代表客户端可以支持语言zh-CN或者zh(值得一提的是q(0~1)是优先级权重的意思，不写默认为1，这里zh-CN是1，zh是0.9)
Connection: keep-alive  //告诉服务器，客户端需要的tcp连接是一个长连接
```
- **Response Header**  
```js
HTTP/1.1 200 OK  // 响应状态行
Date: Mon, 30 Jul 2018 02:50:55 GMT  //服务端发送资源时的服务器时间
Expires: Wed, 31 Dec 1969 23:59:59 GMT //比较过时的一种验证缓存的方式，与浏览器（客户端）的时间比较，超过这个时间就不用缓存（不和服务器进行验证），适合版本比较稳定的网页
Cache-Control:  no-cache  // 现在最多使用的控制缓存的方式，会和服务器进行缓存验证，具体见博文”Cache-Control“
etag: "fb8ba2f80b1d324bb997cbe188f28187-ssl-df"  // 一般是Nginx静态服务器发来的静态文件签名，浏览在没有“Disabled cache”情况下，接收到etag后，同一个url第二次请求就会自动带上“If-None-Match”
Last-Modified: Fri, 27 Jul 2018 11:04:55 GMT //是服务器发来的当前资源最后一次修改的时间，下次请求时，如果服务器上当前资源的修改时间大于这个时间，就返回新的资源内容
Content-Type: text/html; charset=utf-8  //如果返回是流式的数据，我们就必须告诉浏览器这个头，不然浏览器会下载这个页面，同时告诉浏览器是utf8编码，否则可能出现乱码
Content-Encoding: gzip  //告诉客户端，应该采用gzip对资源进行解码
Connection: keep-alive  //告诉客户端服务器的tcp连接也是一个长连接
```
🍗**常见状态码**
- 2XX：成功

状态码|英文名称|中文含义
:--:|:--:|:--:
200|OK|请求成功。一般用于GET与POST请求 
204|No Content|无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档
205|Reset Content|重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域
206|Partial Content|部分内容。服务器成功处理了部分GET请求
- 3XX：重定向  

状态码|英文名称|中文含义
:--:|:--:|:--:
301|Moved Permanently|永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替
302|Found|临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI  
303|See Other|查看其它地址。与301类似。使用GET和POST请求查看  
304|Not Modified|未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源
307|Temporary Redirect|临时重定向。与302类似。使用GET请求重定向
- 4XX：客户端错误

状态码|英文名称|中文含义
:--:|:--:|:--:
400|Bad Request|客户端请求的语法错误，服务器无法理解
401|Unauthorized|请求要求用户的身份认证
403|Forbidden|服务器理解请求客户端的请求，但是拒绝执行此请求
404|Not Found|服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面

- 5XX：服务器错误

状态码|英文名称|中文含义
:--:|:--:|:--:
500|Internal Server Error|服务器内部错误，无法完成请求
501|Not Implemented|服务器不支持请求的功能，无法完成请求
503|Service Unavailable|由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中

## 题解
### GET和POST的区别？
- 从<b>语义</b>上：GET通常用来获取资源,POST通常用来提交数据，即上传数据
- 从<b>缓存</b>上，GET请求会被浏览器主动缓存，POST默认不会，需要手动设置
- 从<b>参数</b>上，GET参数有长度限制，并通过URL传递，因此不安全；POST参数没有长度限制，放在Request body中，相对较安全，更适合传输敏感信息。
- 从<b>编码</b>上，GET只能进行URL编码，只能接受ASCII字符，而POST没有限制
- 从<b>幂等性</b>上，GET是幂等的，而POST不是（幂等：表示执行相同的操作，结果也是相同的）
- 从<b>TCP</b>上，GET请求会把报文一次性发出去，而POST会分为两个TCP数据包，首先发header部分，如果服务器响应100（continue),会接着发送body部分。（火狐浏览器的post请求只发送一个TCP包）


## :white_medium_square: 1. XSS 和 CSRF

1. XSS：跨站脚本攻击。

- 理解：攻击者通过注入恶意的脚本，在用户浏览网页的时候进行攻击。
- 场景：攻击者在留言板页面编写 js 代码，当浏览器在解析到用户输入代码的时候，会执行这一段代码，比如通过 `documen.cookie` 窃取用户的 cookie 值。又或者通过 `<script>window.location.href="http://www.baidu.com";</script>` 进行网页挑战。新浪在 2011 年也经历过严重的 xss 漏洞，使得大量用户自动关注某用户并转发某条微博
- 防御：对输入(和 URL 参数)进行过滤，对输出进行编码

2. CSRF：跨站请求伪造。

- 理解：可以理解为盗用者盗用了用户的身份，以用户的名义发送恶意请求。
- 场景：比如用户登陆一个网站后，在 cookie 未过期的情况下去访问另一个，攻击者用来制造攻击的网站，假如这个攻击者的网站上有一张诱导用户点击的图片，但是这张图片是可以修改数据库的，当用户去点击这张图片之后，攻击者就可以以用户的名义去修改数据库。
- 防御：检查 https 头部的 refer,使用 token、在 http 头中自定义属性并验证

## :white_medium_square: 1. service worker 和 web worker

**Web worker**：它是 H5 的新特性，用于为 JavaScript 构建多线程环境。允许主线程创建一个 Worker 线程。把一些计算密集型或者高延迟的任务给 Worker 执行，执行完毕后再把结果返回给主线程。Worker 线程一旦新建成功，就会一直运行，不会被主线程干扰。[Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)  
**service worker**：是浏览器与服务器之间的代理服务器，用于构建离线缓存

- **相同点**：他们都是在常规 JS 引擎线程以外开辟了新的 JS 线程。
- **不同点**：
  - Service Worker 不是服务于某个特定页面的，而是服务于多个页面的。（按照同源策略）
  - Service Worker 会常驻在浏览器中，即便注册它的页面已经关闭，Service Worker 也不会停止。本质上它是一个后台线程，只有你主动终结，或者浏览器回收，这个线程才会结束。
  - 生命周期、可调用的 API 等等也有很大的不同。
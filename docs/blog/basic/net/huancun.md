## 浏览器缓存

> 浏览器缓存是指浏览器对用户请求过的资源进行存储，当访问者再次访问某个页面的时候，浏览器会根据设定的缓存策略去判断，是直接从存储中拿资源，还是发送请求给服务器重新获取资源。  
> 浏览器的缓存策略包括<b>强缓存</b>和<b>协商缓存</b>

:one: <b>强缓存</b>: 当请求资源时，如果是之前请求过的资源且命中强缓存，直接从浏览器缓存中获取(不管资源实际上是否过期), 强缓存是利用 `http` 头中的<span style="color:red">Expires</span>(http1.0)和<span style="color:red">Cache-Control</span>（http1.1)两个字段来控制

- </b>Expires</b>：该值是一个 GMT 时间格式个字符串，可以设定浏览器缓存的过期时间。
  - 当第一次请求时，`resonse header`会返回`Expires`属性
  - 当再次请求的时间在这个时间之前则命中缓存，即使用浏览器缓存的资源，否则会重新发送请求给服务端重新获取资源
- `Cache-Control`
  - private：仅浏览器可以缓存（默认值）；
  - public：浏览器和代理服务器都可以缓存；
  - max-age=xxx：过期时间单位秒；
  - no-cache：不进行强缓存；
  - no-store：不强缓存，也不协商缓存）
- 补充： `Expire`和`Cache-Control`用回车、后退、F5 刷新会跳过本地缓存，每次都会从服务器中获数据。

:two: <b>协商缓存</b>: 由服务器判断文件是否过期，是否需要重新返回新资源给浏览器

- <b>Last-Modify 和 if-modified-since</b>

  - <b>Last-Modified</b>: 是 `resonse header` 的属性，表示为资源的最后更新时间
  - <b>if-modified-since</b> 是 `request body` 的属性
  - 第一次请求时，服务器返回的 header 中会加上<b>Last-Modified</b>
  - 第二次请求时，`request`的头部会带上<b>if-modified-since</b>，该值为缓存之前返回的 Last-Modify。服务器收到<b>if-modified-since</b>后，根据资源的最后修改时间判断是否命中缓存

- <b>Etag 和 If-None-Match</b>：

  - <b>Etag</b> 是 `resonse header` 的属性，是资源的唯一识别码，只要服务器的文件有修改，这个 `Etag`</b> 就会发生变化
  - <b>if-modified-since</b> 是 `request body` 的属性
  - 第一次请求时，`resonse header` 会返回 <b>Etag</b>，同时 `request body` 是没有<b>`if-modified-since`</b> 的。状态码为<span style="color: red">200</span>
  - 第二次请求时，`request body` 会携带上 <b>if-modified-since</b>(和 `Etag` 是一样的值)。服务器会根据这个去判断资源是否过期，如果资源<b>没过期</b>，`resonse header` 会返回之前的 Etag，同时状态码为<span style="color: red">304(Not Modified)</span>
  - 第二次请求时，如果资源<b>已过期</b>，`resonse header` 会返回新的 `Etag`，状态码为<span style="color: red">200</span>

> 强缓存是浏览器直接决定是否使用缓存，协商缓存是服务器通过<b>if-modified-since</b>判断是否使用缓存

为什么有了<b>Last-Modify 和 if-modified-since</b>还要<b>Etag 和 If-None-Match</b>呢？

- 有些文件可能发生周期性改变，但是文件内容并没有改变，这种情况下，重新获取资源是浪费的
- 有些文件的修改非常频繁，比如在 1s 内发生了 N 次修改，而使用`Last-Modified`时，`If-Modified-Since`能检查到的粒度是 s 级的, 就无法检测到文件实际上已经发生了改变需要重新获取资源
- 当`Last-Modified`与`ETag`一起使用时，服务器会优先验证`ETag` ，一致的情况下，才会继续比对 Last-Modified，最后才决定是否返回 304。

### 刷新操作对缓存的影响

| 操作                                             | 强缓存 | 协商缓存 |
| :----------------------------------------------- | :----: | :------: |
| 正常操作：地址栏输入 URL，跳转链接，前进或者后退 |   √    |    √     |
| 手动刷新：`F5`, 浏览器刷新按钮，右键刷新         |   X    |    √     |
| 强制刷新： `ctrl + F5`                           |   X    |    X     |

### 不安全 https 对协商缓存的影响

| 操作                                             |      谷歌      | 火狐 |
| :----------------------------------------------- | :------------: | :--: |
| 正常操作：地址栏输入 URL，跳转链接，前进或者后退 |   全部不缓存   |  √   |
| 手动刷新：`F5`, 浏览器刷新按钮，右键刷新         | 部分文件不缓存 |  √   |
| 强制刷新： `ctrl + F5`                           |       X        |  X   |

> 在谷歌浏览器中，当进行手动刷新时，只会缓存带有`preload`属性的文件

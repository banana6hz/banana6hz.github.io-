## 浏览器跨域解决方案
### 什么是跨域  
当一个请求url的协议、域名、端口三者之间任意一个与当前地址不同的时候，就是跨域
URL (http://www.a.com/a.html)             |        说明    |   是否允许通信  
:--:|:--:|:--:
http://www.a.com/b.js        | 同一域名下         | 允许 
http://www.a.com/script/b.js |同一域名下不同文件夹 |允许
http://www.a.com/b.js        |同一域名，不同端口   | 不允许
https://www.a.com/b.js       |同一域名，不同协议   |不允许
http://70.32.92.74/b.js      |域名和域名对应ip     |不允许
http://script.a.com/b.js     |主域相同，子域不同   |不允许（cookie这种情况下也不允许访问）
http://a.com/b.js            |同一域名，不同二级域名（同上） |不允许（cookie这种情况下也不允许访问）
http://www.a.com/b.js        |不同域名 |不允许

出现跨域问题，一般会这么报错：  
![跨域报错](../../.vuepress/imgs/interview/net/kuayu01.png)

## hhaah
### hhh
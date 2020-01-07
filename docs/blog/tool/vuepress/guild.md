
## Vuepress搭建个人博客网站   
拥有个人网站性价比最高的方法就是把网站放到github上，不用自己花钱买服务器开发，也不用考虑续费的问题。此篇文章主要讲述如何用vuepress在github上部署一个个人博客网站。咸鱼漫步，多多指教啊🤡 
📑 此处附上[Vuepress官方文档](https://vuepress.vuejs.org/zh/guide/)  

---
### 一、准备工作
:one: **在github上新建一个仓库**  
![vuepress_1](../../../.vuepress/imgs/blog/tools/vuepress/vuepress_1.png)  
&emsp;① <u>仓库名称</u>：此处的仓库名称是固定的 `github用户名 + .github.io` 这正是你博客的地址   
&emsp;&emsp;:chestnut:：如果用户名为banana,则此处应该填：`banana.github.io`  
&emsp;② <u>仓库描述</u>： 用户可自定义仓库的描述，方便读者了解此仓库的主要用途，此处放的是博客链接  
&emsp;③ <u>建立仓库</u>  


:two: **环境搭建**   
&emsp;① Node>8  
&emsp;② Git  
&emsp;③ npm
### 二、搭建vuepress项目  
&emsp;① 全局安装vuepress `npm install -g vuepress`  
&emsp;② 初始化项目 
```
cd vuepress  
mkdir vurpressBlog  
npm init  
mkdir docs
cd docs
touch README.md  
mkdir .vuepress
cd .vuepress
touch config.js
```  
🎄项目结构
```
.
├─ docs
│  ├─ README.md
│  └─ .vuepress
│     └─ config.js
└─ package.json
```  
&emsp;③ 配置文件  
&emsp;&emsp;✧ package.json：添加两条启动命令  
```
"scripts": {
        "dev": "vuepress dev docs", //启动项目
        "build": "vuepress build docs" //打包项目
    }
```  
&emsp;&emsp;✧ config.js：添加以下代码
```
module.exports = {
    title: 'vuePress模板博客',
    description: '我的个人网站',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
        nav: [ // 导航栏配置
            { text: 'GitHub', link: 'https://github.com/caoyezi' },
            { text: '简书', link: 'https://www.jianshu.com/u/2ce8cb7701b8' },
            { text: '有问题请问我', link: 'https://baidu.com' }
        ],
        sidebar: [{ // 左侧导航栏配置
                    title: 'Vuepress搭建'
                    // collapsable: false, //是否展开
                },
                ['/accumulate/2019/准备工作', '准备工作']
            ]
            // sidebar: 'auto', // 侧边栏配置
            // sidebarDepth: 2, // 侧边栏显示2级
    }
};
```


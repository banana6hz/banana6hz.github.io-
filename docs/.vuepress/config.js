module.exports = {
    title: 'LIUHZ`sBLOG',
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/', // 这是部署到github相关的配置
    markdown: {
        // lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
        sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        // lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
        nav: [
            { text: 'Blog', link: '/blog/basic/mind' }, // 内部链接 以docs为根目录
            // { text: 'Photos',  link: '/photos/guild'}, // 内部链接 以docs为根目录
            // { text: 'Debug',link: '/debug/css'}, 
            { text: '归档', link: '/question/guild' },
            { text: 'Debug', link: '/debug/guild' },
            { text: 'Tool', link: '/tools/markdown-editor' },
            {
                text: 'Libraly',
                items: [
                    { text: '腾讯前端团队', link: 'http://www.alloyteam.com/page/0/' },
                    { text: '淘宝前端团队', link: 'https://fed.taobao.org/' },
                    { text: 'Emoji', link: 'https://www.webfx.com/tools/emoji-cheat-sheet/' },
                    { text: '在线工具', link: 'https://tool.oschina.net/commons' },
                    { text: '设计导航', link: 'http://hao.shejidaren.com/' },
                    { text: 'Typing', link: 'https://www.keybr.com/' },
                ]// 外部链接
            },
            // 下拉列表
            {
                text: 'About Me',
                items: [
                    { text: 'GitHub地址', link: 'https://github.com/banana6hz' },
                ]
            }
        ],
        sidebar: {
            // 侧边栏在 /blog/上
            '/blog/': [
                ['/blog/basic/mind', '我的前端'],
                {
                    title: 'CSS',
                    collapsable: true,
                    children: [
                        ['/blog/basic/css/guild', ':pointer:css基础'],
                        ['/blog/basic/css/flex', 'flex布局'],
                        ['/blog/basic/css/z-index', '深入理解z-index']
                    ]
                },
                {
                    title: 'JavaScript',
                    collapsable: true,
                    children: [
                        ['/blog/basic/javascript/guild', 'JS基础'],
                        ['/blog/basic/javascript/caozuofu', '操作符'],
                        ['/blog/basic/javascript/event', '事件'],
                        ['/blog/basic/javascript/eventloop', 'JS循环机制'],
                        ['/blog/basic/javascript/es6', 'ES6']
                    ]
                },
                {
                    title: 'ES6',
                    collapsable: true,
                    children: [
                        ['/blog/es6/promise', 'Promise']
                    ]
                },
                {
                    title: 'TypeScript',
                    collapsable: true,
                    children: [
                        ['/blog/basic/typescript/guild', 'TS基础']
                    ]
                },
                {
                    title: '网络/浏览器',
                    collapsable: true,
                    children: [
                        ['/blog/basic/net/guild', '网络'],
                        ['/blog/basic/net/http', 'HTTP协议'],
                        ['/blog/basic/net/tcp', 'TCP/IP协议'],
                        ['/blog/basic/net/session_cookie', 'cookie与session'],
                        ['/blog/basic/net/browserRendering', '浏览器渲染'],
                        ['/blog/basic/net/huancun', '浏览器缓存']
                    ]
                },
                ['/blog/jquery/guild', 'jQuery'],
                {
                    title: 'VUE',
                    collapsable: true,
                    children: [
                        ['/blog/vue/guild', 'Vue指南'],
                        ['/blog/vue/myvue', 'vue手动搭建'],
                        ['/blog/vue/vuelife', 'vue生命周期'],
                        ['/blog/vue/zujiantongxin', 'Vue组件的通信'],
                        ['/blog/vue/mock', 'mock假数据'],
                        ['/blog/vue/build', 'vue的工程化'],
                        ['/blog/vue/beforeEach', '动态路由'],
                    ]
                },
                {
                    title: '微信小程序',
                    collapsable: true,
                    children: [
                        ['/blog/wxapp/guild', '微信小程序'],
                        ['/blog/wxapp/wxapp', '微信小程序开发流程']
                    ]
                },
                {
                    title: 'Node.js',
                    collapsable: true,
                    children: [
                        ['/blog/node/guild', 'Node.js'],
                        ['/blog/koa/koaGuild', 'koa指南'],
                    ]
                },
                {
                    title: '工具',
                    collapsable: true,
                    children: [
                        ['/blog/tool/git/guild', 'Git指南'],
                        ['/blog/tool/vuepress/guild', 'vuepress指南'],
                        ['/blog/tool/markdown/guild', 'markdown指南'],
                        ['/blog/tool/filezilla/guild', 'FileZilla指南'],
                        ['/blog/tool/mock/mock', 'mock.js指南'],
                        ['/blog/tool/webpack/guild', 'webpack指南']
                    ]
                    // {
                    //     title:'实现',
                    //     collapsable: true,
                    //     children: [
                    //         ['/blog/zaza/center','水平垂直居中'],
                    //     ]
                    // }
                },
                {
                    title: '专题',
                    children: [
                        ['/blog/summary/xiangyingshi', '响应式布局'],
                        ['/blog/summary/shuzu', '数组操作合集'],
                        ['/blog/summary/zifuchuan', '字符串操作合集'],
                    ]
                },
                {
                    title: '算法',
                    collapsable: true,
                    children: [
                        ['/blog/suanfa/guild', '算法'],
                    ]
                }
            ],
            '/question/': [
                ['/question/guild', '归档'],
                ['/question/html/basic', 'HTML'],
                ['/question/css/css01', 'CSS'],
                ['/question/js/js01', 'JavaScript'],
                ['/question/es6/es6_01', 'ES6'],
                ['/question/vue/vue01', 'Vue'],
                ['/question/jquery/jq01', 'jquery'],
                ['/question/webpack/webpack01', 'webpack'],
                ['/question/js/js02', '下面代码输出什么？'],
                {
                    title: '计算机网络',
                    collapsable: true,
                    children: [
                        ['/question/net/url', '输入URL到页面渲染出来，浏览器经历了什么？'],
                        ['/question/net/kuayu', '浏览器跨域'],
                    ]
                }
            ],
            '/tools/': [
                ['/tools/markdown-editor', 'Markdown'],
                ['/tools/tinymce', '富文本Tinymce'],
                ['/tools/clipboard', 'Clipboard'],
                ['/tools/pdf', 'PDF'],
                ['/tools/excel', 'Excel'],
                ['/tools/table', 'Table'],
                ['/tools/screenfull', 'Screenfull'],
                ['/tools/driver', 'Driver']
            ],
            // 侧边栏在 /debug/ 上
            '/debug/': [
                ['/debug/js', 'JS'],
                ['/debug/css', 'CSS'],
                ['/debug/net', 'NET']
            ],
            // 侧边栏在 /photos/ 上
            '/photos/': [
                {
                    title: 'view',
                    collapsable: true,
                    children: [
                        ['/photos/view', 'view']
                    ]
                },
                {
                    title: 'eat',
                    collapsable: true,
                    children: [
                        ['/photos/eat', 'eat']
                    ]
                },
            ],
        }
    }
}
/*
                           \\\|||///
                            \\|||//
                            ———————
                           /(.)-(.)\
                     O     \   v   /
                    / \     ———————
                    | |   / |     | \
                    | |\_/  |     |  \
                    | |     |_____|   \
                    | |    / / | \ \   O
                    | |   / /  |  \ \ 
                    | |  / /   |   \ \

                 へ         ／| 
                     /＼7    ∠＿/ 
                    / │     ／ ／ 
                   │ Z ＿,＜ ／   /`ヽ 
                   │       ヽ    /   〉
                    Y       `   /   / 
                   ｲ● ､ ●   ⊂⊃〈   /
                   () へ       | ＼〈
                    >ｰ ､_   ィ │ ／／ 
                    / へ   / ﾉ＜| ＼＼ 
                    ヽ_ﾉ  (_／  │／／ 
                    7           |／ 
                    ＞―r￣￣`ｰ―＿
*/
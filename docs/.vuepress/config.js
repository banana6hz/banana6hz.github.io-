module.exports = {
    title: 'Here I am',
    description: 'Banana_Blog',
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
        sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
        nav:[
            { text: 'Blog', link: '/guild/install' }, // 内部链接 以docs为根目录
            { text: 'Photos',  items: [{ text: 'eat', link: '/guild/photos/eat'}]}, // 内部链接 以docs为根目录
            { text: 'Libraly', 
              items: [{ text: 'Emoji', link:'https://www.webfx.com/tools/emoji-cheat-sheet/'}]// 外部链接
            }, 
            // 下拉列表
            {
            text: 'About Me',
            items: [
                { text: 'GitHub地址', link: 'https://github.com/banana6hz' },
            ]
            }        
        ],
        sidebar:[
            {
                title: 'Group 1',
                collapsable: false,
                children: [
                  '/'
                ]
              },
              {
                title: 'Group 2',
                children: [ /* ... */ ]
              }
        ]
    }
}
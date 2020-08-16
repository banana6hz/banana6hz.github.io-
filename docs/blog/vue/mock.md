### 为了方便前后端分离，学习一下假数据
---
[参考文档](http://mockjs.com/)

1. 安装mock.js `npm install mockjs`
2. 在项目的src目录下新建mock.js文件，并添加如下代码
    ```
    import Mock from 'mockjs'

    const Random = Mock.Random;

    function getData(){
    let datalist= [];
    for (let i = 0; i < 100; i++) {
        let newData = {
        title: Random.csentence(5, 30), //  Random.csentence( min, max )
        thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
        author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
        date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
        }
        datalist.push(newData)
    }
    return {
        data: datalist
    }
    }
    const data = Mock.mock('/msg1',getData)
    export default {data};
    // 上面代码中的getData()函数是用来批量生成数据的，Mock.mock()函数的第一个参数是被请求的url，第二个参数是后端要返回给前端的数据，写好之后我们将该接口导出
    ```
    3. 测试模拟出来的数据，在要引入数据的页面添加如下代码
    ```
    <button @click="fasong">mockDate</button>
    
    methods:{
        mockDate(){
        axios.get('/msg1').then(response => {
            let res = response.data
            console.log(res)
        })
        }
    }
    ```
### 常用API
**Basic**
Random.boolean( min?, max?, current? )返回一个随机的布尔值  

Random.natural( min?, max? )返回一个随机的自然数（大于等于 0 的整数）  

Random.integer( min?, max? )返回一个随机的整数  

Random.float( min?, max?, dmin?, dmax? )返回一个随机的浮点数  
 
Random.character( pool? )返回一个随机字符  

Random.string( pool?, min?, max? )返回一个随机字符串  

Random.range( start?, stop, step? )返回一个整型数组  

**Date**
Random.date( format? )返回一个随机的日期字符串

Random.time( format? )返回一个随机的时间字符串

Random.datetime( format? )返回一个随机的日期和时间字符串

Random.now( unit?, format? )返回当前的日期和时间字符串

**Image**
Random.image( size?, background?, foreground?, format?, text? )生成一个随机的图片地址 Random.dataImage( size?, text? )生成一段随机的 Base64 图片编码

**Color**
Random.color()随机生成一个有吸引力的颜色，格式为 '#RRGGBB'

Random.hex()随机生成一个有吸引力的颜色，格式为 '#RRGGBB'。

Random.rgb()随机生成一个有吸引力的颜色，格式为 'rgb(r, g, b)'

Random.rgba()随机生成一个有吸引力的颜色，格式为 'rgba(r, g, b, a)'

Random.hsl()随机生成一个有吸引力的颜色，格式为 'hsl(h, s, l)'

**Text**
Random.paragraph( min?, max? )随机生成一段文本

Random.cparagraph( min?, max? )随机生成一段中文文本

Random.sentence( min?, max? )随机生成一个句子，第一个单词的首字母大写

Random.csentence( min?, max? )随机生成一段中文文本

Random.word( min?, max? )随机生成一个单词

Random.cword( pool?, min?, max? )随机生成一个汉字

Random.title( min?, max? )随机生成一句标题，其中每个单词的首字母大写

Random.ctitle( min?, max? )随机生成一句中文标题

**Name**
Random.first() 随机生成一个常见的英文名

Random.last()随机生成一个常见的英文姓

Random.name( middle? )随机生成一个常见的英文姓名

Random.cfirst()随机生成一个常见的中文名

Random.clast()随机生成一个常见的中文姓

Random.cname()随机生成一个常见的中文姓名

**Web**
Random.url( protocol?, host? )随机生成一个 URL

Random.protocol()随机生成一个 URL 协议

Random.domain()随机生成一个域名

Random.tld()随机生成一个顶级域名（Top Level Domain）

Random.email( domain? )随机生成一个邮件地址

Random.ip()随机生成一个 IP 地址 Address

Random.region()随机生成一个（中国）大区

Random.province()随机生成一个（中国）省（或直辖市、自治区、特别行政区）

Random.city( prefix? )随机生成一个（中国）市

Random.county( prefix? )随机生成一个（中国）县

Random.zip()随机生成一个邮政编码（六位数字）

**Helper**
Random.capitalize( word )把字符串的第一个字母转换为大写

Random.upper( str )把字符串转换为大写

Random.lower( str )把字符串转换为小写

Random.pick( arr )从数组中随机选取一个元素，并返回

Random.shuffle( arr )打乱数组中元素的顺序，并返回 Miscellaneous

Random.guid()随机生成一个 GUID

Random.id()随机生成一个 18 位身份证

Random.increment( step? )生成一个全局的自增整数
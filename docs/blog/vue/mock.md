### 为了方便前后端分离，学习一下假数据
---
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
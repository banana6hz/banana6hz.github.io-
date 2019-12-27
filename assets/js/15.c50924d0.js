(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{212:function(s,a,n){"use strict";n.r(a);var t=n(0),e=Object(t.a)({},(function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h3",{attrs:{id:"为了方便前后端分离，学习一下假数据"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#为了方便前后端分离，学习一下假数据","aria-hidden":"true"}},[s._v("#")]),s._v(" 为了方便前后端分离，学习一下假数据")]),s._v(" "),n("hr"),s._v(" "),n("ol",[n("li",[s._v("安装mock.js "),n("code",[s._v("npm install mockjs")])]),s._v(" "),n("li",[s._v("在项目的src目录下新建mock.js文件，并添加如下代码"),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("import Mock from 'mockjs'\n\nconst Random = Mock.Random;\n\nfunction getData(){\nlet datalist= [];\nfor (let i = 0; i < 100; i++) {\n    let newData = {\n    title: Random.csentence(5, 30), //  Random.csentence( min, max )\n    thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码\n    author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名\n    date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串\n    }\n    datalist.push(newData)\n}\nreturn {\n    data: datalist\n}\n}\nconst data = Mock.mock('/msg1',getData)\nexport default {data};\n// 上面代码中的getData()函数是用来批量生成数据的，Mock.mock()函数的第一个参数是被请求的url，第二个参数是后端要返回给前端的数据，写好之后我们将该接口导出\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br")])]),n("ol",{attrs:{start:"3"}},[n("li",[s._v("测试模拟出来的数据，在要引入数据的页面添加如下代码")])]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("<button @click=\"fasong\">mockDate</button>\n\nmethods:{\n    mockDate(){\n    axios.get('/msg1').then(response => {\n        let res = response.data\n        console.log(res)\n    })\n    }\n}\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br")])])])])])}),[],!1,null,null,null);a.default=e.exports}}]);
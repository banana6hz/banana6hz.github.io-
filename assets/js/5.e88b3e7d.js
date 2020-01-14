(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{212:function(r,t,s){r.exports=s.p+"assets/img/browserRender_1.b125c87b.png"},213:function(r,t,s){r.exports=s.p+"assets/img/browserRender_2.2d9968ca.png"},214:function(r,t,s){r.exports=s.p+"assets/img/browserRender_3.543c9358.png"},228:function(r,t,s){"use strict";s.r(t);var a=s(0),e=Object(a.a)({},(function(){var r=this,t=r.$createElement,a=r._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":r.$parent.slotKey}},[a("h2",{attrs:{id:"浏览器渲染过程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#浏览器渲染过程"}},[r._v("#")]),r._v(" 浏览器渲染过程")]),r._v(" "),a("p",[a("a",{attrs:{href:"https://juejin.im/post/5e143104e51d45414a4715f7",target:"_blank",rel:"noopener noreferrer"}},[r._v("参考文献"),a("OutboundLink")],1)]),r._v(" "),a("p",[r._v("对于“JS的是单线程”这一概念一直是知其然而不知其所以然，了解浏览器的渲染过程，可以更好的理解js为什么是单线程。")]),r._v(" "),a("h3",{attrs:{id:"一、进程（process）与线程（thread）"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一、进程（process）与线程（thread）"}},[r._v("#")]),r._v(" 一、进程（process）与线程（thread）")]),r._v(" "),a("p",[r._v("进程（process）与线程（thread）是操作系统的基本概念")]),r._v(" "),a("p",[a("strong",[r._v("进程:")]),r._v(" CPU资源分配的最小单位（是能拥有资源和独立运行的最小单位)"),a("br"),r._v(" "),a("strong",[r._v("线程:")]),r._v(" CPU调度的最小单位（是建立在进程基础上的一次程序运行的单位)")]),r._v(" "),a("p",[r._v("对于操作系统来说,一个任务就是一个进程；在一个进程内部,要同时做多件事,就需要同时运行多个“子任务”,我们把进程内的这些“子任务”称为线程。")]),r._v(" "),a("p",[r._v("🌰：打开一个 Word（进程），同时可以进行打字（线程）、拼写检查（线程）、打印（线程）等。")]),r._v(" "),a("ul",[a("li",[r._v("由于每个进程至少要做一件事,所以一个进程至少有一个线程。")]),r._v(" "),a("li",[r._v("系统会给每个进程分配独立的内存,因此进程有它独立的资源")]),r._v(" "),a("li",[r._v("同一进程内的各个线程之间共享该进程的内存空间（包括代码段,数据集,堆等）")])]),r._v(" "),a("h3",{attrs:{id:"二、浏览器的多线程架构"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二、浏览器的多线程架构"}},[r._v("#")]),r._v(" 二、浏览器的多线程架构")]),r._v(" "),a("p",[r._v("以 Chrome 为例,它由多个进程组成,每个进程都有自己核心的职责,它们相互配合完成浏览器的整体功能,\n每个进程中又包含多个线程,一个进程内的多个线程也会协同工作,配合完成所在进程的职责。\nChrome 采用多进程架构,其顶层存在一个 Browser process 用以协调浏览器的其它进程。")]),r._v(" "),a("p",[a("img",{attrs:{src:s(212),alt:"Chrome"}})]),r._v(" "),a("ul",[a("li",[a("strong",[r._v("优点")]),a("br"),r._v("\n1️⃣ 如果一个tab页面（线程）崩溃，不会影响一整个浏览器（进程）"),a("br"),r._v("\n2️⃣ 第三方插件崩溃也不会影响整个浏览器"),a("br"),r._v("\n3️⃣ 多进程可以充分利用现代 CPU 多核的优势（相当于多颗CPU, 可以同时跑多个程序）"),a("br"),r._v("\n4️⃣ 方便使用沙盒模型隔离插件等进程,提高浏览器的稳定性。"),a("font",{attrs:{size:"2",color:"#18e"}},[r._v("（沙箱模型技术是浏览器和其他应用程序中保护安全的一种组件关系设计模式，“沙盒”技术的实践运用流程是：让疑似病毒文件的可疑行为在虚拟的“沙盒”里充分表演，“沙盒”会记下它的每一个动作；当疑似病毒充分暴露了其病毒属性后，“沙盒”就会执行“回滚”机制：将病毒的痕迹和动作抹去，恢复系统到正常状态。）")])],1),r._v(" "),a("li",[a("strong",[r._v("缺点")]),a("br"),r._v("\n1️⃣ 系统为浏览器新开的进程分配内存、CPU 等资源,所以内存和 CPU 的资源消耗也会更大。"),a("font",{attrs:{size:"2",color:"#18e"}},[r._v("（不过 Chrome 在内存释放方面做的不错,基本内存都是能很快释放掉给其他程序运行的。）")])],1)]),r._v(" "),a("h3",{attrs:{id:"三、浏览器的主要进程和职责"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#三、浏览器的主要进程和职责"}},[r._v("#")]),r._v(" 三、浏览器的主要进程和职责")]),r._v(" "),a("p",[a("img",{attrs:{src:s(213),alt:"浏览器主要进程"}})]),r._v(" "),a("h3",{attrs:{id:"四、浏览器渲染进程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#四、浏览器渲染进程"}},[r._v("#")]),r._v(" 四、浏览器渲染进程")]),r._v(" "),a("p",[a("img",{attrs:{src:s(214),alt:"浏览器渲染进程"}})]),r._v(" "),a("h3",{attrs:{id:"五、浏览器渲染流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#五、浏览器渲染流程"}},[r._v("#")]),r._v(" 五、浏览器渲染流程")]),r._v(" "),a("ul",[a("li",[r._v("解析HTML文件，构建DOM树，同时浏览器主线程下载CSS文件")]),r._v(" "),a("li",[r._v("CSS文件下载完成，解析CSS文件成树形的数据结构，然后结合DOM树合并成RenderObject树")]),r._v(" "),a("li",[r._v("绘制 RenderObject 树 （paint）,绘制页面的像素信息")]),r._v(" "),a("li",[r._v("浏览器主进程将默认的图层和复合图层交给 GPU 进程,GPU 进程再将各个图层合成（composite）,最后显示出页面")])]),r._v(" "),a("p",[a("strong",[r._v("DOM树与Render树")]),r._v(" "),a("a",{attrs:{href:"https://blog.csdn.net/heyeqingquan/article/details/78849304",target:"_blank",rel:"noopener noreferrer"}},[r._v("Dom与Render"),a("OutboundLink")],1)]),r._v(" "),a("ul",[a("li",[r._v("DOM树：是浏览器对HTML解析出来的数据结构，DOM 树上每一个节点都对应着网页里面的每一个元素，并且网页也可以通过 JavaScript 操作这棵 DOM 树，动态改变它的结构。但DOM树并不能直接用于排版和渲染")]),r._v(" "),a("li",[r._v("Render树（HTML+CSS）")])]),r._v(" "),a("h3",{attrs:{id:"六、题解"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#六、题解"}},[r._v("#")]),r._v(" 六、题解")]),r._v(" "),a("h4",{attrs:{id:"_1-js为什么是单线程的"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-js为什么是单线程的"}},[r._v("#")]),r._v(" 1. JS为什么是单线程的")]),r._v(" "),a("p",[r._v("因为Javascript是处理页面中用户的交互、操作DOM树和CSS样式树来给用户呈现一份动态而丰富的交互体验和服务器逻辑的交互处理。")]),r._v(" "),a("p",[r._v("如果JS是多线程的方式来操作这些 UI DOM,则可能出现 UI 操作的冲突。"),a("br"),r._v("\n🌰：假设存在两个线程同时操作一个 DOM,一个负责修改一个负责删除,那么这个时候就需要浏览器来裁决生效哪个线程的执行结果。")]),r._v(" "),a("h4",{attrs:{id:"_2-为什么js阻塞页面加载"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-为什么js阻塞页面加载"}},[r._v("#")]),r._v(" 2. 为什么JS阻塞页面加载")]),r._v(" "),a("p",[r._v("因为JS是可操作DOM的，如果在修改这些元素属性同时渲染界面（即 JavaScript 线程和 UI 线程同时运行）,那么渲染线程前后获得的元素数据就可能不一致了。")]),r._v(" "),a("p",[r._v("因此为了防止渲染出现不可预期的结果,浏览器设置 GUI 渲染线程与 JavaScript 引擎为互斥的关系。"),a("br"),r._v("\n当 JavaScript 引擎执行时 GUI 线程会被挂起,GUI 更新会被保存在一个队列中等到引擎线程空闲时立即被执行。")]),r._v(" "),a("p",[r._v("因此如果 JS 执行的时间过长,这样就会造成页面的渲染不连贯,导致页面渲染加载阻塞的感觉。")]),r._v(" "),a("h4",{attrs:{id:"_3-css-加载会造成阻塞吗？"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-css-加载会造成阻塞吗？"}},[r._v("#")]),r._v(" 3. css 加载会造成阻塞吗？")]),r._v(" "),a("hr"),r._v(" "),a("p",[r._v("😑我累了...好饿😵")])])}),[],!1,null,null,null);t.default=e.exports}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{586:function(v,e,l){"use strict";l.r(e);var i=l(56),_=Object(i.a)({},(function(){var v=this,e=v.$createElement,l=v._self._c||e;return l("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[l("h3",{attrs:{id:"vue-的指令"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#vue-的指令"}},[v._v("#")]),v._v(" vue 的指令")]),v._v(" "),l("ul",[l("li",[v._v("v-for：用于遍历数组/对象/字符串/指定次数\n"),l("ul",[l("li",[v._v("使用时需要搭配 key，这个 key 是给 vue 去使用的，页面不会把这个 key 渲染出来")]),v._v(" "),l("li",[v._v("key 必须的， 且值是能唯一识别数据的，如果没写，会默认用 index 作为 key")]),v._v(" "),l("li",[v._v("以 index 作为 key 是有问题的，比如对数据进行逆序添加、逆序删除等破环数据顺序的操作会产生不要的 DOM 更新，如果结构中包含输入类标签，会发生错误的 DOM 更新。\n"),l("blockquote",[l("p",[v._v("如果不写 key 或者用了 index, 当每一项有该项的值并且还有个有输入值的 input 框，然后给这个数组从头部添加项时，期望是在列表添加多一项，后面是个空的 input 框，而实际是新增的那一项的 input 框会有值，值为添加前第一项的值，并且后面项的 input 框的值，都会以此类推往上移，最终是最后一项的 input 框为空")])])]),v._v(" "),l("li",[v._v("key 是 diff 算法的核心，是根据这个 key 去判断 DOM 节点是否可以复用。根据 key 比较两个节点的内容是否相同，相同直接复用；不相同则直接生成真实 DOM；若在旧的虚拟 DOM 中找到不，则创建新的真实 DOM")])])]),v._v(" "),l("li",[v._v("v-if:\n"),l("ul",[l("li",[v._v("条件渲染，如果为 ture，就"),l("strong",[v._v("渲染")]),v._v("这个元素，如果是 false,就不渲染这个元素。")]),v._v(" "),l("li",[v._v("可以和 v-else-if、v-else 搭配使用，但是中间不能被打断，不然会报错。")]),v._v(" "),l("li",[v._v("可以和 template 搭配使用，template 本身不会被渲染成 html 标签")])])]),v._v(" "),l("li",[v._v("v-show\n"),l("ul",[l("li",[v._v("条件显示，如果为 true,就会"),l("strong",[v._v("显示")]),v._v("这个元素，如果为 false，就不显示这个元素")]),v._v(" "),l("li",[v._v("v-show 切换的是 css 中 display 属性，不管是 true 还是 false，页面都有这个元素只是不一定显示，但是 v-if 切换的是是否去渲染这个元素")]),v._v(" "),l("li",[v._v("不能和 tempalte 搭配使用")])])]),v._v(" "),l("li",[v._v("v-pre: 没有值，添加之后会跳过其所在节点的编译过程，你写的啥就是啥，vue 不会去处理。利用好这个指令，可以跳过部分节点，提高编译效率，优化性能")]),v._v(" "),l("li",[v._v("v-text：向其所在的节点中渲染文本内容，v-text 会替换掉节点中的内容")]),v._v(" "),l("li",[v._v("v-html：向指定节点中渲染包含 html 结构的内容，可以识别 html 结构。有安全隐患，使用不当容易造成 xss 攻击。比如可能造成 cookie 的泄漏。不能信任服务器内容，一定要在可信的内容上用 v-html")]),v._v(" "),l("li",[v._v("v-once：没有值，添加该指令后表示只动态渲染一次，之后就不会变了")]),v._v(" "),l("li",[v._v("v-clock：没有值，可以结合 css 去隐藏因 vue 实例创建未完车而出现插值语法"),l("code",[v._v(v._s(v.banana))]),v._v("，等 vue 实例创建并接管容器后，vue 会自动删除。可以解决网速慢时页面展示出"+v._s(v.xx)+"的问题")]),v._v(" "),l("li",[v._v("自定义指令 directive： 自定义指令其实就是自定义一些 dom 的操作\n"),l("ul",[l("li",[v._v("自定义指令指令的执行：")])]),v._v(" "),l("ol",[l("li",[v._v("与元素初次绑定时会执行。")]),v._v(" "),l("li",[v._v("指令所在的模板重新解析时会执行，比如修改同个模板的其他数据值，也会执行，因为模板重新解析了")])]),v._v(" "),l("ul",[l("li",[v._v("自定义指令的写法：\n"),l("ol",[l("li",[v._v("函数式：指令在函数里面写 dom 操作，但这个会有一些问题，指令与元素初次绑定时会执行，但是绑定成功不代表页面已经有这个元素(与生命周期有关)，有些 dom 操作不会执行，比如 dom.focus(),")]),v._v(" "),l("li",[v._v("对象式：对象里面有是三个函数\n"),l("ul",[l("li",[v._v("bind(el,binding): 指令与元素绑定时执行")]),v._v(" "),l("li",[v._v("inserted(el,binding): 指令所在的元素插入页面时执行")]),v._v(" "),l("li",[v._v("update(el,binding): 指令所在的模版被重新渲染时调用")])])]),v._v(" "),l("li",[v._v("局部使用：在当前 vue 实例中配置 directive，如果指令名是多个单词组成，推荐写法是："),l("code",[v._v("v-my-banana")]),v._v(","),l("code",[v._v("my-banana")])]),v._v(" "),l("li",[v._v("全局使用：指令只能用于当前 vue 实例里面的元素，如果需要在全局使用，对象式："),l("code",[v._v("Vue.directive('mbind', {})")]),v._v("/ 函数式："),l("code",[v._v("Vue.directive('mbind', function(){})")])])])]),v._v(" "),l("li",[v._v("自定义指令的指向：所有指令里面的 this 指向都是 window")])])]),v._v(" "),l("li",[v._v("v-model:数据的双向绑定\n"),l("ul",[l("li",[v._v("修饰符\n"),l("ul",[l("li",[v._v("lazy: 失去焦点再收集数据")]),v._v(" "),l("li",[v._v("number: 输入字符串转为数字")]),v._v(" "),l("li",[v._v("trim: 首尾去空")])])]),v._v(" "),l("li",[v._v("使用注意：\n"),l("ul",[l("li",[v._v("如果绑定的是 input 的输入值，用 v-model。如果绑定的不能输入的值，如 radio，用了 v-model 绑定之外要用配置 value 值。如果是单个 checkBoxd 的绑定，如没有配置 value，则绑定的是 true/false。如果是多个 checkBoxd 的绑定，如果配置了 value，初始值是非数组，则绑定的是 true/false，而且只要一个勾选其他也会勾选。如果初始值是数组，则绑定的是选中的值组成的数组，勾哪个就会有哪个。")]),v._v(" "),l("li",[v._v("原生的 input，可以通过 type 指定 number，这样就只能输入数字，但是结果还会是字符串数字。而修饰符 number 是指，可以输入字符但是最终结果会帮你转成数字，比如输入 3a0 的结果是 3，不是'3'")])])])])])])])}),[],!1,null,null,null);e.default=_.exports}}]);
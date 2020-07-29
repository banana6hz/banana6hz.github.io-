没有想到我现在还在学jq...

## jQuery常用方法
```js
//Attribute：
$(”p”).addClass(css中定义的样式类型); //给某个元素添加样式

$(”img”).attr({src:”test.jpg”,alt:”test Image”}); //给某个元素添加属性/值，参数是map
$(”img”).attr(”src”,”test.jpg”); //给某个元素添加属性/值
$(”img”).attr(”title”, function() { return this.src }); //给某个元素添加属性/值

$(”元素名称”).html(); //获得该元素内的内容（元素，文本等）
$(”元素名称”).html(”<b>new stuff</b>”); //给某元素设置内容

$(”元素名称”).removeAttr(”属性名称”); //给某元素删除指定的属性以及该属性的值
$(”元素名称”).removeClass(”class”) //给某元素删除指定的样式

$(”元素名称”).text(); //获得该元素的文本
$(”元素名称”).text(value); //设置该元素的文本值为value

$(”元素名称”).toggleClass(class) //当元素存在参数中的样式的时候取消,如果不存在就设置此样式

$(”input元素名称”).val(); //获取input元素的值
$(”input元素名称”).val(value); //设置input元素的值为value
//Manipulation：
$(”元素名称”).after(content); //在匹配元素后面添加内容
$(”元素名称”).append(content); //将content作为元素的内容插入到该元素的后面
$(”元素名称”).appendTo(content); //在content后接元素
$(”元素名称”).before(content); //与after方法相反
$(”元素名称”).clone(布尔表达式) //当布尔表达式为真时，克隆元素（无参时，当作true处理）
$(”元素名称”).empty() //将该元素的内容设置为空

$(”元素名称”).insertAfter(content); //将该元素插入到content之后
$(”元素名称”).insertBefore(content); //将该元素插入到content之前

$(”元素”).prepend(content); //将content作为该元素的一部分，放到该元素的最前面
$(”元素”).prependTo(content); //将该元素作为content的一部分，放content的最前面

$(”元素”).remove(); //删除所有的指定元素
$(”元素”).remove(”exp”); //删除所有含有exp的元素

$(”元素”).wrap(”html”); //用html来包围该元素
$(”元素”).wrap(element); //用element来包围该元素
//Core：
$(html).appendTo(”body”) //相当于在body中写了一段html代码
$(elems) //获得DOM上的某个元素
$(function(){……..}); //执行一个函数
$(”div > p”).css(”border”, “1px solid gray”); //查找所有div的子节点p，添加样式
$(”input:radio”, document.forms[0]) //在当前页面的第一个表单中查找所有的单选按钮
```

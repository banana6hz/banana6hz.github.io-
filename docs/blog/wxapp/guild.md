![wxapplife](../../.vuepress/imgs/blog/wxapp/wxapplife.jpg)

## ✨小程序的一生啊  
**打开小程序**:   
<u>OnLaunch()</u> => <u>OnShow()</u> => onLoad() => onShow() => onReady()  

**切换页面**：   
OnHide()<font color="#425fe">(cur)</font> => onLoad()<font color="#425fe">(next)</font> => onShow()<font color="#425fe">(next)</font> => OnReady()<font color="#425fe">(next)</font> 

**返回上一个页面**：  
onUnload()<font color="#425fe">(cur)</font> => onShow()<font color="#425fe">(pre)</font>  

**退出小程序**：  
<u>onHide()</u>   

**再次进入**：
- App未销毁：热启动
- App已销毁：冷启动   


那什么是热启动和冷启动呢：  
**热启动**：指的是小程序启动成功后，你点了左上角的x或者按了home键离开小程序，小程序并没有直接被销毁，而是进入了后台运行机制中，当你在一定时间内再次打开该小程序时，小程序这时候从后台又重新进入前台，重新渲染页面，这个过程就是热启动。  
**冷启动**：指的是小程序初次加载（从未打开），或者当你卸载小程序,或者被微信自动销毁的时候，当你再次进入重新加载小程序时，这个过程就是冷启动

注意点：小程序只有在冷启动的时候，才会触发onLaunch生命周期

## ✨Page的生命周期  
![wxapplife](../../.vuepress/imgs/blog/wxapp/pagelife.jpg)

## ✨小程序路由方式  
**打开新页面**：`wx.navigateTo` 或 `< navigator open-type="navigateTo"/>`  

**Tab切换**：`wx.switchTab` 或 `<navigator open-type="switchTab"/>`  

**页面返回**:  `navigateBack` 或 `<navigator open-type="navigateBack">` 或用户按左上角返回按钮  

**重启动**: `wx.reLaunch` 或  `<navigator open-type="reLaunch"/> ` 
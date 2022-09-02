```js
import store from "../store";

export function onMouseDown(e) {
  const messageBoxWapperDom = document.getElementsByClassName(
    "el-message-box__wrapper"
  )[0];
  if (!messageBoxWapperDom || messageBoxWapperDom.style.display === "none")
    return;
  const messageBoxDom = document.getElementsByClassName("el-message-box")[0];
  if (!messageBoxDom) return;
  const headerDom = messageBoxDom.getElementsByClassName(
    "el-message-box__header"
  )[0];
  if (headerDom) {
    let downX = e.clientX;
    let downY = e.clientY;
    const { offsetX, offsetY } = store.state.messageBoxTransform;

    const targetDom = messageBoxDom.getBoundingClientRect();
    const targetLeft = targetDom.left;
    const targetTop = targetDom.top;
    const targetWidth = targetDom.width;
    const targetHeight = targetDom.height;

    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;

    const minLeft = -targetLeft + offsetX;
    const minTop = -targetTop + offsetY;
    const maxLeft = clientWidth - targetLeft - targetWidth + offsetX;
    const maxTop = clientHeight - targetTop - targetHeight + offsetY;
    let onMousemove = (e) => {
      const moveX = Math.min(
        Math.max(offsetX + e.clientX - downX, minLeft),
        maxLeft
      );
      const moveY = Math.min(
        Math.max(offsetY + e.clientY - downY, minTop),
        maxTop
      );

      store.commit("setMessageBoxTransform", {
        offsetX: moveX,
        offsetY: moveY,
      });
      messageBoxDom.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    const onMouseup = () => {
      window.removeEventListener("mousemove", onMousemove);
      window.removeEventListener("mouseup", onMouseup);
      onMousemove = null;
    };
    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("mouseup", onMouseup);
  }
}

export function resetMessageBoxStyle() {
  const messageBoxWapperDom = document.getElementsByClassName(
    "el-message-box__wrapper"
  )[0];
  if (!messageBoxWapperDom) return;
  const messageBoxDom = document.getElementsByClassName("el-message-box")[0];
  if (messageBoxDom) {
    store.commit("setMessageBoxTransform", {
      offsetX: 0,
      offsetY: 0,
    });
    messageBoxDom.style.transform = "translate(0px, 0px)";
  }
}
```

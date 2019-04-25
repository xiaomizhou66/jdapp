<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "jdapp"
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Source Sans Pro", sans-serif;
}

html,
body {
  background: rgba(0, 0, 0, 0)!important;//让 body 变成透明无色的,要配合主线程的 frame: false，transparent: true一起，并且
  // 这里一定是 !important; 否则就会覆盖不了默认白色
  -webkit-user-select: none;//文本不可选择
  //-webkit-app-region: drag;// 设置可以拖动，因为 窗口隐藏了 主进程拖动没有了，body 就被固定了，只能通过渲染进程css来拖动了
  // 是可以拖动了但是又会导致 body 下的元素无法操作了，并且双击还会导致全屏缩小，还要用  no-drag;来处理，可以操作了，但是却不可以拖动了
  // 这个就很麻烦了，就不要用就好了
  // -webkit-app-region: no-drag; 
  //设置不可以拖动，在需要点击的元素上添加 no-drag。-webkit-app-region: no-drag;
}

.wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  width: 100vw;
  border-radius: 15px;
  border-color: #fff;
  // box-shadow: 1px 1px 1px gray;
}
</style>

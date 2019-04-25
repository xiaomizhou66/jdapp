<template>
  <div class="home wrapper">
    <div class="left-menu">
      <div class="item">
        <img>
      </div>
      <div class="item" @click="itemActive('apply')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dianji"></use>
        </svg>
        <p class="text" :class="isActive=='apply'?'text-checked':''">申请试用</p>
      </div>
      <div class="item" @click="itemActive('success')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-face11"></use>
        </svg>
        <p class="text" :class="isActive=='success'?'text-checked':''">申请成功</p>
      </div>
      <div class="item" @click="itemActive('fail')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fail"></use>
        </svg>
        <p class="text" :class="isActive=='fail'?'text-checked':''">申请失败</p>
      </div>
      <div class="foot-menu-btn" @click="isMenuActive=!isMenuActive">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-caidan"></use>
        </svg>
        <p class="text" :class="isMenuActive?'text-checked':''">菜单</p>
      </div>
    </div>

    <div class="menu-modal" v-if="isMenuActive">
      <div class="menu-item">意见反馈</div>
      <div class="menu-item">备份与恢复</div>
      <div class="menu-item">设置</div>
    </div>

    <!-- <webview src="https://www.adobe.com/software/flash/about/" plugins></webview> 
    这个就是加载 web 网页进来啊-->
    <div class="right-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
//import SystemInformation from './LandingPage/SystemInformation'
//import axios from "axios";
const { dialog } = require("electron").remote;

export default {
  name: "home",
  data() {
    return {
      isMenuActive: false,
      isActive: 1
    };
  },
  components: {
    //
  },
  methods: {
    // 原生的拖放：https://electronjs.org/docs/tutorial/native-file-drag-drop
    // 原生的为啥还跟主进程关联，这下面做的不需要跟主进程关联啊
    //dragIn() {
    // 这个是原生的，我们用的是 vue 那么就要用 iview 组件，或者是 element-ui 组件来做了
    // 不需要自己去做原生的上传下载了。
    // 原生：https://juejin.im/post/5a169d08518825592c07c666
    //var dragSrc = document.getElementById("txt");
    //var target = document.getElementById("target");
    //dragSrc.ondragstart = handle_start;
    //dragSrc.ondrag = handle_drag;
    //dragSrc.ondragend = handle_end;
    //document.addEventListener("drop", function(e) {
    //  e.preventDefault();
    //  e.stopPropagation();
    //  for (let f of e.dataTransfer.files) {
    //    //console.log("File(s) you dragged here: ", f.path);
    //    console.log("拖拽文件上来了");
    //  }
    //});
    //document.addEventListener("dragover", function(e) {
    //  e.preventDefault();
    //  e.stopPropagation();
    //});
    //  }
    itemActive(str) {
      this.isActive = str;
      //this.$router.push("/home/" + str); 在改级路由 去 找子路由的路径就好，不要再带上该级的路径!!!!
      this.$router.push(str);
    }
  }
};
</script>


<style lang="scss" scoped>
// @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
@import "home";
</style>

<style lang="scss">
</style>

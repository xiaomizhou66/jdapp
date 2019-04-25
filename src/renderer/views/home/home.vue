<template>
  <div class="home wrapper">
    <div class="left-menu">
      <div class="item">
        <img>
      </div>
      <div class="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dianji"></use>
        </svg>
        <p class="text">申请试用</p>
      </div>
      <div class="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-face11"></use>
        </svg>
        <p class="text">申请成功</p>
      </div>
      <div class="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fail"></use>
        </svg>
        <p class="text">申请失败</p>
      </div>
    </div>
    <!-- <webview src="https://www.adobe.com/software/flash/about/" plugins></webview> 
    这个就是加载 web 网页进来啊-->
    <!-- <div class="right-content">
      <a href="#" ref="dragOut">item</a>
      <div ref="dragIn" @click="showOpenDialogHandler">点击或将文件拖拽到此区域处理</div>
    </div> -->
  </div>
</template>

<script>
//import SystemInformation from './LandingPage/SystemInformation'
//import axios from "axios";
//const { dialog } = require("electron");

export default {
  name: "home",
  data() {
    return {
      //
    };
  },
  components: {
    //
  },
  methods: {
    // 原生的拖放：https://electronjs.org/docs/tutorial/native-file-drag-drop
    // 原生的为啥还跟主进程关联，这下面做的不需要跟主进程关联啊

    // 监听拖放 或点击
    dragIn() {
      dragIn = this.$refs.dragIn;
      // 鼠标滑过不执行
      dragIn.ondragover = () => {
        return false;
      };
      // 鼠标离开不执行
      dragIn.ondragleave = holder.ondragend = () => {
        return false;
      };
      //文件被扔进来了就执行
      dragIn.ondrop = e => {
        e.preventDefault(); //取消默认事件
        for (let file of e.dataTransfer.files) {
          console.log("File(s) you dragged here: ", file.path);
          start_process(filepath);
        }
        return false;
      };
      // 好像这样不行的，这个是从 jQuery 抄来的不对
      dragIn.addEventListener("click", showOpenDialogHandler);//作为参数不需要 showOpenDialogHandler()
    },
    // 点击选择文件，点击鼠标打开文件管理器
    showOpenDialogHandler() {
      var options = {
        defaultPath: "D:\\service-data",
        filters: [{ name: "Database", extensions: ["db"] }],
        properties: ["openFile"]
      };
      dialog.showOpenDialog(options, fileNames => {
        // fileNames is an array that contains all the selected
        if (fileNames === undefined) {
          console.log("No file selected");
          return;
        } else {
          console.log(fileNames[0]);
          var filepath = fileNames[0];
        }
        start_process(filepath);
      });
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

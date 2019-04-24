<template>
  <div class="home wrapper">
    <div class="left-menu">
      <div class="item">
        <img/>
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
    <div class="right-content"></div>
  </div>
</template>

<script>
//import SystemInformation from './LandingPage/SystemInformation'
//import axios from "axios";
export default {
  name: "home",
  data(){
    return{
      //
    }
  },
  components: {
    //
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
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

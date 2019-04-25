<template>
  <div class="login wrapper">
    <div class="login-box">
      <Form ref="loginForm" :model="loginData" :rules="loginDataRule">
        <img src="../../assets/256x256.png" style="width:60px;height:60px;margin-bottom:20px;">
        <div class="login-title">京东试用</div>
        <FormItem prop="username">
          <Input type="text" v-model="loginData.username" placeholder="Username" style="-webkit-app-region: no-drag;">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="loginData.password" placeholder="Password" style="-webkit-app-region: no-drag;">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="login('loginForm')" style="-webkit-app-region: no-drag;">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
//import SystemInformation from './LandingPage/SystemInformation'
//import axios from 'axios'
const { ipcRenderer } = require("electron");
// 想要禁止 双击 最大化最小化的然后没有任何效果。
// 微信的登录好像只是标题可以拖动其他地方不能拖动的，所以没有关系了，不做这个整个窗口拖动了
// 微信聊天的界面的话是最左边回双击方法，不在聊天框的时候也是双击放大的，所以没有关系啦，
// 但是在聊天窗口中双击是不会放大的哦，
//const win = require('electron').remote.getCurrentWindow()
//let el = document.getElementsByTagName('body')[0]
//el.addEventListener('dblclick', () => {
//  win.setIgnoreMouseEvents(true)
//})

export default {
  name: "login",
  data() {
    return {
      loginData: {
        username: "",
        password: ""
      },
      loginDataRule: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            type: "string",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度不可小于 6 位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    //
  },
  methods: {
    //open(link) {
    //  this.$electron.shell.openExternal(link);
    //},
    login(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          //axios({
          //  url: "/session",
          //  method: "post",
          //  data: this.loginData
          //}).then(res => {
            //localStorage.setItem("token", `Code ${res.data.token}`);
            //localStorage.setItem("sessionToken", JSON.stringify(res.data));
            //this.$router.push("/overview");
            ipcRenderer.send("login-success", "ping"); //发送消息给 主进程
            //监听主进程返回的消息
            ipcRenderer.on("login-success-reply", (event, arg) => {      
              console.log(arg); // prints "pong"
              this.$router.push("/");
            });
          //});
        } else {
          this.$Message.error("用户名或者密码错误!");
        }
      });
    }
  }
};
</script>


<style lang="scss" scoped>
// @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
@import "login";
</style>

<style lang="scss">
</style>

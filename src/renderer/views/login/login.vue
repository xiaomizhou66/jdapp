<template>
  <div class="login wrapper">
    <div class="login-box">
      <Form ref="loginForm" :model="loginData" :rules="loginDataRule">
        <img src="../../assets/256x256.png" style="width:60px;height:60px;margin-bottom:20px;">
        <div class="login-title">京东试用</div>
        <FormItem prop="username">
          <Input type="text" v-model="loginData.username" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="loginData.password" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="login('loginForm')">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
//import SystemInformation from './LandingPage/SystemInformation'
//import axios from 'axios'
const { ipcRenderer } = require("electron");

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

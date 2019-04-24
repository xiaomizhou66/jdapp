<template>
  <div class="login">
   mei
  </div>
</template>

<script>
  //import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'login',
    components: { 
      //
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style lang="scss">
  // @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  .login{
    color: red;
  }
</style>

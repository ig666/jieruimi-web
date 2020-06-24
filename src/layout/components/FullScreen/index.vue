<template>
  <a-icon
    class="full-screen"
    :type="isFullScreen ? 'fullscreen-exit' : 'fullscreen'"
    @click="handleFullScreen"
  />
</template>

<script>
export default {
  name: "FullScreen",
  data() {
    return {
      isFullScreen: false
    };
  },
  methods: {
    // 全屏切换
    handleFullScreen() {
      this.isFullScreen = !this.isFullScreen;
      this.isFullScreen ? this.fullScreen() : this.fullExit();
      this.$emit("reload");
    },
    // 全屏
    fullScreen() {
      var element = document.documentElement; // 若要全屏页面中div，var element= document.getElementById("divID");
      // IE 10及以下ActiveXObject
      if (window.ActiveXObject) {
        // eslint-disable-next-line no-undef
        var WsShell = new ActiveXObject("WScript.Shell");
        WsShell.SendKeys("{F11}");
      } else if (element.requestFullScreen) {
        element.requestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      }
    },
    // 退出全屏
    fullExit() {
      var element = document.documentElement; // 若要全屏页面中div，var element= document.getElementById("divID");
      if (window.ActiveXObject) {
        // eslint-disable-next-line no-undef
        var WsShell = new ActiveXObject("WScript.Shell");
        WsShell.SendKeys("{F11}");
      } else if (element.requestFullScreen) {
        document.exitFullscreen();
      } else if (element.msRequestFullscreen) {
        document.msExitFullscreen();
      } else if (element.webkitRequestFullScreen) {
        document.webkitCancelFullScreen();
      } else if (element.mozRequestFullScreen) {
        document.mozCancelFullScreen();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.full-screen {
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
</style>

<template>
  <div class="home">
    <input
      type="file"
      accept="video/*"
      id="take-video"
      capture="camcorder"
      @change="change"
    />
    <a-button type="primary" @click="start">开始轨迹</a-button>
    <video
      id="video"
      width="320"
      height="240"
      webkit-playsinline="true"
      playsinline="true"
      poster="../assets/person.png"
      preload="auto"
      src="../assets/shilie.mp4"
      type="video/mp4"
    ></video>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      video: undefined
    };
  },
  mounted() {
    this.video = document.getElementById("video");
    console.log(123, this.video.duration);
    // this.video.currentTime = 0;
  },
  methods: {
    change(event) {
      const files = event.target.files;
      if (files && files.length > 0) {
        let url = window.URL.createObjectURL(files[0]);
        this.video.src = url;
      }
    },
    start() {
      this.video.play();
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  display: flex;
  align-items: center;
  flex-direction: column;
  .map {
    width: 100%;
    height: 80vh;
  }
}
</style>

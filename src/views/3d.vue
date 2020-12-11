<template>
  <div class="home">
    <iframe
      src="https://www.thingjs.com/pp/4128fe7c6b77b29b218597be"
      frameborder="0"
    ></iframe>
  </div>
</template>
<script>
export default {
  name: "3d",
  data() {
    return {};
  },
  mounted() {
    console.log(123);
  },
  methods: {
    start() {
      this.$refs.map.start();
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  display: flex;
  align-items: center;
  flex-direction: column;
  iframe {
    width: 70vw;
    height: 70vh;
  }
}
</style>

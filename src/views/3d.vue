<template>
  <div class="home">
    <iframe
      src="https://www.thingjs.com/pp/4128fe7c6b77b29b218597be"
      frameborder="1"
    ></iframe>
    <dv-capsule-chart :config="config" class="list" />
    <dv-percent-pond :config="config1" class="electricity" />
  </div>
</template>
<script>
export default {
  name: "3d",
  data() {
    return {
      config: {
        data: [
          {
            name: "南阳",
            value: 167
          },
          {
            name: "周口",
            value: 67
          },
          {
            name: "漯河",
            value: 123
          },
          {
            name: "郑州",
            value: 55
          },
          {
            name: "西峡",
            value: 98
          }
        ]
      },
      config1: {
        value: 66,
        localGradient: true
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  .list {
    position: absolute;
    top: 10%;
    left: 10%;
  }
  .electricity {
    width: 6rem;
    height: 3rem;
    position: absolute;
    top: 10%;
    right: 10%;
  }
  iframe {
    width: 100vw;
    height: 100vh;
  }
}
</style>

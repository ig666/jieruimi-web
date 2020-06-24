<template>
  <div class="home">
    <a-button type="primary" @click="start">开始轨迹</a-button>
    <div class="map">
      <Map ref="map" :dataSource="dataSource" :centerPoint="centerPoint"></Map>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      dataSource: [
        {
          lng: 104.099786,
          lat: 30.682027
        },
        {
          lng: 104.100639,
          lat: 30.681612
        },
        {
          lng: 104.099422,
          lat: 30.679965
        },
        {
          lng: 104.100711,
          lat: 30.679189
        },
        {
          lng: 104.10151,
          lat: 30.678409
        },
        {
          lng: 104.102049,
          lat: 30.677127
        },
        {
          lng: 104.100805,
          lat: 30.676762
        },
        {
          lng: 104.100953,
          lat: 30.676277
        }
      ],
      centerPoint: {
        x: 104.10118,
        y: 30.676088
      }
    };
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
  .map {
    width: 100%;
    height: 80vh;
  }
}
</style>

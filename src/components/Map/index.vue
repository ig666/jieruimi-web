<template>
  <div id="map"></div>
</template>

<script>
export default {
  name: "Map",
  props: {
    dataSource: {
      type: Array
    },
    centerPoint: {
      type: Object
    }
  },
  data() {
    return {
      trackAni: ""
    };
  },

  components: {},

  created() {},
  mounted() {
    this.creatMap();
  },

  methods: {
    start() {
      this.trackAni.start();
    },
    //构建基本地图
    creatMap() {
      this.$nextTick(() => {
        var bmap = new window.BMapGL.Map("map"); // 创建Map实例
        bmap.setMapStyleV2({
          styleId: "5de6c8b1530e35878fedca88f99709e8"
        });
        var centerPoint = new window.BMapGL.Point(
          this.centerPoint.x,
          this.centerPoint.y
        );
        bmap.centerAndZoom(centerPoint, 19); // 初始化地图，设置中心点坐标和地图级别
        var marker = new window.BMapGL.Marker(centerPoint); // 创建标注
        bmap.addOverlay(marker);
        var home = new window.BMapGL.Marker(
          new window.BMapGL.Point(104.099786, 30.682027)
        ); // 创建标注
        bmap.addOverlay(home);
        bmap.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        var point = [];
        for (var i = 0; i < this.dataSource.length; i++) {
          point.push(
            new window.BMapGL.Point(
              this.dataSource[i].lng,
              this.dataSource[i].lat
            )
          );
        }
        var pl = new window.BMapGL.Polyline(point, {
          strokeColor: "#2C8CEC",
          strokeWeight: 7,
          strokeOpacity: 0.5
        });
        this.trackAni = new window.BMapGLLib.TrackAnimation(bmap, pl, {
          overallView: true, // 动画完成后自动调整视野到总览
          tilt: 45, // 轨迹播放的角度，默认为55
          duration: 20000, // 动画持续时长，默认为10000，单位ms
          delay: 3000 // 动画开始的延迟，默认0，单位ms
        });
      });
    }
  },

  filters: {},

  watch: {}
};
</script>
<style lang="less">
#map {
  height: 100%;
  .BMap_cpyCtrl {
    display: none;
  }
  .anchorBL {
    display: none;
  }
}
</style>

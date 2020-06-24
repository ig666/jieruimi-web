import store from "@/store";

export default {
  beforeMount() {
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted() {
    // const userAgent = navigator.userAgent;
    const isMobile = this.handleIsMobile();
    console.log("ismobile----", isMobile);
    if (isMobile) {
      store.dispatch("common/toggleDevice", "mobile");
    }
  },
  methods: {
    handleIsMobile() {
      return document.body.getBoundingClientRect().width - 1 < 992;
    },
    handleResize() {
      if (!document.hidden) {
        const isMobile = this.handleIsMobile();
        store.dispatch("common/toggleDevice", isMobile ? "mobile" : "desktop");
      }
    }
  }
};

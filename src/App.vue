<template>
  <div class="main">
    <settings v-show="showSettings" />
    <div v-show="!showSettings">
      <div v-for="(city, index) in infoCities" :key="city.id">
        <widget :city="city" :index="index" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Widget from "./components/Widget.vue";
import Settings from "./components/Settings.vue";
export default {
  name: "App",
  components: {
    Widget,
    Settings
  },
  async created() {
    if (this.cities.length === 0) {
      this.getCurrentPosition();
    } else {
      this.getCities();
    }
  },
  computed: {
    ...mapState(["infoCities", "showSettings", "cities"])
  },
  methods: {
    ...mapActions(["getCities", "currentCity"]),
    getCurrentPosition() {
      if(!("geolocation" in navigator)) {
        console.warn('Geolocation is not available.');
        return;
      }
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.currentCity({
          lat: lat, 
          lon: lon
        })
      }, err => {
        console.warn(err.message);
        this.$store.commit("setSettings", true);
      })
    }
  }
};
</script>

<style lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  outline: none;
}
html,
body {
  height: 100%;
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #48484a;
}
.main {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 10000;
}
</style>

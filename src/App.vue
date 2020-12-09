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
  created() {
    this.getCities();
    if (this.cities.length === 0) {
      this.$store.commit("setSettings", true);
    }
  },
  computed: {
    ...mapState(["infoCities", "showSettings", "cities"])
  },
  methods: {
    ...mapActions(["getCities"])
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
  background: #ffffff;
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #48484a;
}
.main {
  position: absolute;
  z-index: 10000;
}
</style>

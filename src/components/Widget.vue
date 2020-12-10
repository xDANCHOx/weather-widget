<template>
  <div class="widget">
    <div class="widget__main">
      <div class="widget__header">
        <h4>{{ city.name }}, {{ city.sys.country }}</h4>
        <img
          v-if="index === 0"
          src="../assets/icons/settings.svg"
          alt="settings"
          style="width: 20px"
          @click="show(true)"
        />
      </div>
      <div class="widget__temperature">
        <img
          :src="
            `http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`
          "
          alt=""
        />
        <h1>{{ Math.round(city.main.temp) }}°C</h1>
      </div>
      <div class="widget__info">
        <p>
          Feels like {{ Math.round(city.main.feels_like) }}°C. {{ description }}
        </p>
      </div>
      <div class="widget__extra-info">
        <span
          ><img
            src="../assets/icons/arrow.svg"
            alt="arrow"
            v-bind:style="{ transform: `rotate(${city.wind.deg}deg)` }"
          />
          {{ city.wind.speed }}m/s</span
        >
        <span
          ><img src="../assets/icons/barometer.svg" alt="barometer" />
          {{ city.main.pressure }}hPa</span
        >
        <span>Humidity: {{ city.main.humidity }}%</span>
        <span>Visibility: {{ city.visibility / 1000 }}km</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Widget",
  props: ["city", "index"],
  computed: {
    description() {
      return (
        this.city.weather[0].description.charAt(0).toUpperCase() +
        this.city.weather[0].description.slice(1)
      );
    }
  },
  methods: {
    show(value) {
      this.$store.commit("setSettings", value);
    }
  }
};
</script>

<style lang="scss">
.widget {
  border: 1px solid #eee;
  width: 280px;
  padding: 16px;
  margin: 8px;
  background: #ffffff;
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    img {
      width: 15px;
      cursor: pointer;
    }
  }
  &__temperature {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }
  &__info {
    margin-bottom: 24px;
  }
  &__extra-info {
    display: flex;
    flex-wrap: wrap;
    span {
      width: 50%;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      img {
        width: 15px;
        margin-right: 5px;
      }
    }
  }
}
</style>

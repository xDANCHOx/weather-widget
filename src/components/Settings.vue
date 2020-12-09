<template>
  <div class="widget">
    <div class="widget__header">
      <h4>Settings</h4>
      <img
        v-if="cities.length !== 0"
        src="../assets/icons/close.svg"
        alt="settings"
        @click="closeSetting()"
      />
    </div>
    <draggable v-model="infoCities">
      <div class="widget__city" v-for="city in infoCities" :key="city.id">
        <div class="widget__city__name">
          <img src="../assets/icons/menu.svg" alt="menu" />
          <p>{{ city.name }}, {{ city.sys.country }}</p>
        </div>
        <img
          src="../assets/icons/trash.svg"
          alt="trash"
          @click="removeCity(city.name)"
        />
      </div>
    </draggable>
    <div class="widget__add-city">
      <h4>Add Location:</h4>
      <div class="widget__add-city__input">
        <input type="text" v-model="newCity" @keyup.enter="addCity" />
        <img
          src="../assets/icons/corner-down-left.svg"
          alt="trash"
          @click="addCity"
        />
      </div>
      <p v-if="message !== ''" class="widget__add-city-error">{{ message }}</p>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import draggable from "vuedraggable";
export default {
  name: "Settings",
  components: {
    draggable
  },
  data() {
    return {
      newCity: ""
    };
  },
  computed: {
    cities() {
      return this.$store.state.cities;
    },
    infoCities: {
      get() {
        return this.$store.state.infoCities;
      },
      set(value) {
        this.$store.commit("updateCities", value);
      }
    },
    message: {
      get() {
        return this.$store.state.message;
      },
      set(value) {
        this.$store.commit("setMessage", value);
      }
    }
  },
  methods: {
    ...mapMutations(["removeCity", "setMessage", "setSettings"]),
    addCity() {
      if (this.newCity !== "") {
        const checkCity = this.cities.some(item =>
          this.newCity.toLowerCase().includes(item.toLowerCase())
        );
        if (!checkCity) {
          this.$store.dispatch("setCity", this.newCity);
          this.newCity = "";
        } else {
          this.message = "This city is already on the list";
          this.newCity = "";
        }
      }
    },
    closeSetting() {
      this.setSettings(false);
      this.setMessage("");
    }
  }
};
</script>
<style lang="scss">
.widget {
  &__city {
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    margin-bottom: 16px;
    &__name {
      display: flex;
      align-items: center;
      img {
        width: 20px;
        margin-right: 8px;
        cursor: pointer;
      }
    }
    img {
      width: 20px;
      cursor: pointer;
    }
  }
  &__add-city {
    margin-top: 48px;
    &__input {
      display: flex;
      align-items: center;
      margin: 6px 0;
      input {
        width: 100%;
        padding: 6px 8px;
        font-size: 14px;
        outline: none;
        border: 1px solid #ccc;
      }
      input:focus {
        border: 1px solid blueviolet;
      }
      img {
        width: 25px;
        margin-left: 8px;
        cursor: pointer;
      }
    }
    &-error {
      color: #f34f4f;
      font-size: 12px;
    }
  }
}
</style>

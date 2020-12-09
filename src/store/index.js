import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
const apiKey = "a77b3dcfcdd44ab34c6a383e724a9487";
export default new Vuex.Store({
  state: {
    infoCities: [],
    cities: JSON.parse(localStorage.getItem("cities")) || [],
    message: "",
    showSettings: false
  },
  mutations: {
    getCities(state, payload) {
      state.infoCities.push(payload);
    },
    setCity(state, payload) {
      state.cities.push(payload.toLowerCase());
      localStorage.setItem("cities", JSON.stringify(state.cities));
    },
    setMessage(state, payload) {
      state.message = payload.charAt(0).toUpperCase() + payload.slice(1);
    },
    updateCities(state, payload) {
      state.infoCities = payload;
    },
    setSettings(state, payload) {
      state.showSettings = payload;
    },
    removeCity(state, payload) {
      const city = payload.toLowerCase();
      const index = state.cities.indexOf(city);
      if (index > -1) {
        state.infoCities = state.infoCities.filter(
          item => item.name.toLowerCase() !== city
        );
        state.cities.splice(index, 1);
        localStorage.setItem("cities", JSON.stringify(state.cities));
      }
    }
  },
  actions: {
    async getCities({ state, commit }) {
      for (const city of state.cities) {
        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
          )
          .then(res => {
            commit("getCities", res.data);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    async setCity({ commit }, city) {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        )
        .then(res => {
          const data = res.data;
          commit("getCities", data);
          commit("setCity", data.name);
          commit("setMessage", "");
        })
        .catch(error => {
          commit("setMessage", error.response.data.message);
        });
    }
  }
});

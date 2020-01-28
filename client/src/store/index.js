import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    history: []
  },
  actions: {
    async getHistory({ commit }) {
      const { data } = await axios.get('http://localhost:3000/api/history');

      commit('setHistory', data);
    },
    async addRecord({ commit }, equation) {
      const { data } = await axios.post('http://localhost:3000/api/history', {
        equation
      });

      commit('updateHistory', data);
    }
  },
  mutations: {
    setHistory(state, payload) {
      state.history = payload;
    },
    updateHistory(state, payload) {
      state.history.push(payload);
    }
  }
});

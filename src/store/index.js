import { createStore } from 'vuex'

export default createStore({
  state: {
    desserts: [], // Tu arreglo de desserts
  },
  mutations: {
    setDesserts(state, newDesserts) {
      state.desserts = newDesserts;
    },
  },
  actions: {
    updateDesserts({ commit }, newDesserts) {
      commit('setDesserts', newDesserts);
    },
  },
  getters: {
    getDesserts(state) {
      return state.desserts;
    },
  },
});

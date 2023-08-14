import { createStore } from 'vuex'

export default createStore({
  state: {
    dialog: false,
  },
  getters: {},
  mutations: {
    setDialog(state, value) {
      state.dialog = value;
    },
  },
  actions: {},
  modules: {},
});

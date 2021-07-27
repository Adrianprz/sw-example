import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showLoader: false,
  },
  mutations: {
    setShowLoader(state, showLoader) {
      state.showLoader = showLoader;
    },
  },
  actions: {
    setShowLoader(context, showLoader) {
      return new Promise<void>((resolve) => {
        context.commit('setShowLoader', showLoader);
        resolve();
      });
    }
  },
});

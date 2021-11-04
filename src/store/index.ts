import TinkoffService from '@/services/TinkoffService';
import { createStore } from 'vuex';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    async testBuy({ commit }) {
      const user = await TinkoffService.testbuy();
      // commit('setCurrrentUser', user);
    },
  },
  modules: {
  },
});

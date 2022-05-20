import { Module } from "vuex";

/**
 * Module containing socket.io related functions and variables.
 */
export const logs: Module<any, any> = {
  state: () => ({
    tab: null,
  }),
  mutations: {
    setTab(state, value: any) {
      state.tab = value;
    },
  },
  getters: {
    tab(state) {
      return state.tab;
    },
  },
  actions: {
    setTab(context, value: any) {
      context.commit("setTab", value);
    },
  },
};

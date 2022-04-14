export default {
  namespaced: true,
  state() {
    return {
      isLoading: false,
      type: ''
    };
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    type(state) {
      return state.type;
    }
  },
  mutations: {
    toggle(state, payload) {
      state.isLoading = !state.isLoading;
      state.type = payload;
    }
  },
  actions: {
    toggle(context, payload) {
      if (!payload) context.commit('toggle', '');
      else context.commit('toggle', payload.type);
    }
  }
};

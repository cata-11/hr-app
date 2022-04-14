export default {
  namespaced: true,
  state() {
    return {
      message: '',
      type: ''
    };
  },
  getters: {
    message(state) {
      return state.message;
    },
    type(state) {
      return state.type;
    }
  },
  mutations: {
    open(state, payload) {
      state.message = payload.message;
      state.type = payload.type.toLowerCase();
    },
    close(state) {
      state.type = '';
      state.message = '';
    }
  },
  actions: {
    open(context, payload) {
      context.commit('open', payload);
    },
    close(context) {
      context.commit('close');
    }
  }
};

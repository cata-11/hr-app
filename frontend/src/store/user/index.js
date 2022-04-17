export default {
  namespaced: true,
  state() {
    return {
      email: '',
      token: '',
      status: '',
      isAuth: false
    };
  },
  getters: {
    status(context) {
      return context.status;
    },
    email(context) {
      return context.email;
    },
    token(context) {
      return context.token;
    },
    isAuth(context) {
      return context.isAuth;
    }
  },
  mutations: {
    login(state, payload) {
      state.email = payload.email;
      state.token = payload.token;
      state.status = payload.status;
      state.isAuth = true;
    },
    logout(state) {
      state.email = '';
      state.token = '';
      state.status = '';
      state.isAuth = false;
    }
  },
  actions: {
    login(context, payload) {
      context.commit('login', payload);
      localStorage.setItem('token', payload.token);
      localStorage.setItem('email', payload.email);
      localStorage.setItem('status', payload.status);
    },
    logout(context) {
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      localStorage.removeItem('status');
      context.commit('logout');
    }
  }
};

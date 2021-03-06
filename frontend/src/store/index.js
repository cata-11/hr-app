import { createStore } from 'vuex';

import loaderModule from './loader/index.js';
import dialogModule from './dialog/index.js';
import userModule from './user/index.js';

export default createStore({
  modules: {
    loader: loaderModule,
    dialog: dialogModule,
    user: userModule
  }
});

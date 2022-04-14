import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import TheLoader from './components/layout/TheLoader';
import TheDialog from './components/layout/TheDialog';

const app = createApp(App);

app.use(store);
app.use(router);

app.component('TheLoader', TheLoader);
app.component('TheDialog', TheDialog);

app.mount('#app');

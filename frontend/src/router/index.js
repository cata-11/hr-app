import { createRouter, createWebHistory } from 'vue-router';

import Auth from '../views/Auth.vue';
import Employees from '../views/Employees.vue';
import Teams from '../views/Teams.vue';
import Roles from '../views/Roles.vue';
import NotFound from '../views/NotFound.vue';

import store from '../store/index.js';

const routes = [
  {
    path: '/',
    redirect: '/employees'
  },
  {
    path: '/auth',
    component: Auth,
    meta: {
      auth: true
    }
  },
  {
    path: '/employees',
    component: Employees
  },
  {
    path: '/teams',
    component: Teams
  },
  {
    path: '/roles',
    component: Roles
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth === true && store.getters['user/isAuth']) {
    next('/');
  } else next();
});

export default router;

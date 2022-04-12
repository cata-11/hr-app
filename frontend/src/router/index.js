import { createRouter, createWebHistory } from 'vue-router';

import Employees from '../views/Employees.vue';
import Teams from '../views/Teams.vue';
import Roles from '../views/Roles.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  {
    path: '/',
    redirect: '/employees'
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

export default router;

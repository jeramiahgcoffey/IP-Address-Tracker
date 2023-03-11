import { createRouter, createWebHistory } from 'vue-router';
import { publicPath } from '../../vue.config';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'IP Address Tracker',
    },
  },
];

const router = createRouter({
  history: createWebHistory(publicPath),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router;

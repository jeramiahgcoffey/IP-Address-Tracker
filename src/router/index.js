import { createRouter, createWebHistory } from 'vue-router';
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
  history: createWebHistory(
    'https://jeramiahgcoffey.github.io/IP-Address-Tracker/'
  ),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router;

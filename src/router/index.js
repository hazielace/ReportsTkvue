import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'Login',
      component: ()=> import('../views/login/login.vue'),
    },
    { 
      path: '/reports', 
      meta: { authRequired: true },
      name: 'Reports',
      component: () => import('../views/reports/reports.vue'),
    },
  ],
})


router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');

  if (to.matched.some(record => record.meta.authRequired)) {
    if (!isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router

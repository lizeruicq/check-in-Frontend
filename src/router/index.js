import { useRoute, createRouter, createWebHashHistory } from 'vue-router';

import baseRouters from './modules/base';
import componentsRouters from './modules/components';

// 存放动态路由
export const asyncRouterList = [...baseRouters, ...componentsRouters];
const defaultRouterList = [
{
  path: '/login',
      name: 'login',
    component: () => import('@/pages/login/index.vue'),
},
  {
    path: '/',
    redirect: '/main/index',
    component: () => import('@/pages/layouts/index.vue'),
  },
];
export const allRoutes = [...defaultRouterList, ...asyncRouterList];
export const getActive = (maxLevel = 2) => {
  const route = useRoute();
  if (!route.path) {
    return '';
  };
    return route.path
        .split('/')
        .filter((_item, index) => index <= maxLevel && index > 0)
        .map((item) => `/${item}`)
        .join('');
  };

  const router = createRouter({
    history: createWebHashHistory(),
    routes: allRoutes,
    scrollBehavior() {
      return {
        el: '#app',
        top: 0,
        behavior: 'smooth',
      };
    },
  });

  export default router;


// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../pages/AboutView.vue')
//     }
//   ]
// })



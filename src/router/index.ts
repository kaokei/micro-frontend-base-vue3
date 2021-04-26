import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
} from '@ant-design/icons-vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      pagePath: '/',
      title: '首页',
      icon: UserOutlined,
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      pagePath: '/about',
      title: '关于我',
      icon: UserOutlined,
    },
  },
  {
    path: '/subapp/demo-vue3/:path(.*)',
    component: () => import('../components/iframeContainer.vue'),
    meta: {
      appName: 'demo-vue3',
      publicPath: `http://localhost:8081/`,
      pagePath: '/subapp/demo-vue3/',
      title: 'demo-vue3',
      icon: UserOutlined,
    },
  },
  {
    path: '/nav1',
    name: 'Nav1',
    component: () =>
      import(/* webpackChunkName: "nav1" */ '../views/About.vue'),
    meta: {
      pagePath: '/nav1',
      title: 'Nav1',
      icon: UserOutlined,
    },
  },
  {
    path: '/nav2',
    name: 'Nav2',
    component: () =>
      import(/* webpackChunkName: "nav2" */ '../views/About.vue'),
    meta: {
      pagePath: '/nav2',
      title: 'Nav2',
      icon: VideoCameraOutlined,
    },
  },
  {
    path: '/nav3',
    name: 'Nav3',
    component: () =>
      import(/* webpackChunkName: "nav3" */ '../views/About.vue'),
    meta: {
      pagePath: '/nav3',
      title: 'Nav3',
      icon: UploadOutlined,
    },
  },
  {
    path: '/nav4',
    name: 'Nav4',
    component: () =>
      import(/* webpackChunkName: "nav4" */ '../views/About.vue'),
    meta: {
      pagePath: '/nav4',
      title: 'Nav4',
      icon: BarChartOutlined,
    },
  },
  {
    path: '/nav5',
    name: 'Nav5',
    component: () =>
      import(/* webpackChunkName: "nav5" */ '../views/About.vue'),
    meta: {
      pagePath: '/nav5',
      title: 'Nav5',
      icon: CloudOutlined,
    },
  },
  {
    path: '/nav6',
    name: 'Nav6',
    component: () =>
      import(/* webpackChunkName: "nav6" */ '../views/About.vue'),
    meta: {
      pagePath: '/nav6',
      title: 'Nav6',
      icon: AppstoreOutlined,
    },
  },
  {
    path: '/nav7',
    name: 'Nav7',
    component: () =>
      import(/* webpackChunkName: "nav7" */ '../views/About.vue'),
    meta: {
      pagePath: '/nav7',
      title: 'Nav7',
      icon: TeamOutlined,
    },
  },
  {
    path: '/nav8',
    name: 'Nav8',
    component: () =>
      import(/* webpackChunkName: "nav8" */ '../views/About.vue'),
    meta: {
      pagePath: '/nav8',
      title: 'Nav8',
      icon: ShopOutlined,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue' // <-- 1. 导入新的主页组件

// 为了演示，我们暂时保留其他页面的占位符
// 后面我们会为它们创建真实的组件
const News = { template: '<h1>健康资讯页面</h1>' }
const About = { template: '<h1>关于我们页面</h1>' }
const Login = { template: '<h1>登录/注册页面</h1>' }

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView, // <-- 2. 使用新的主页组件
  },
  { path: '/news', name: 'News', component: News },
  { path: '/about', name: 'About', component: About },
  { path: '/login', name: 'Login', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

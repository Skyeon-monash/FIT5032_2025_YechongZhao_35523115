// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import NewsView from '../views/NewsView.vue'
import ArticleDetailView from '../views/ArticleDetailView.vue'
import AboutView from '../views/AboutView.vue' // 导入

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView }, // 使用组件
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/news', name: 'News', component: NewsView },
  { path: '/article/:id', name: 'ArticleDetail', component: ArticleDetailView },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminDashboard,
    meta: {
      requiresAuth: true,
      requiredRole: 'admin',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ... (导航守卫代码保持不变)
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  if (!authStore.isAuthReady) {
    await new Promise((resolve) => {
      const unsubscribe = authStore.$onAction(({ name, after }) => {
        if (name === '$patch' || authStore.isAuthReady) {
          unsubscribe()
          resolve()
        }
      })
      if (authStore.isAuthReady) resolve()
    })
  }
  const requiresAuth = to.meta.requiresAuth
  const requiredRole = to.meta.requiredRole
  if (requiresAuth && !authStore.isLoggedIn) {
    next({ name: 'Login' })
  } else if (requiredRole && authStore.role !== requiredRole) {
    console.warn(`权限不足：需要角色 '${requiredRole}', 但用户角色是 '${authStore.role}'`)
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router

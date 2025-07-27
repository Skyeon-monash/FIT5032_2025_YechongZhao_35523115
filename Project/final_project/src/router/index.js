// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore' // 导入 authStore

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminDashboard from '../views/AdminDashboard.vue' // 导入管理员页面

const News = { template: '<h1>健康资讯页面</h1>' }
const About = { template: '<h1>关于我们页面</h1>' }

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/news', name: 'News', component: News },
  { path: '/about', name: 'About', component: About },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminDashboard,
    // **ADDED: meta 字段用于定义路由元信息**
    meta: {
      requiresAuth: true, // 这个页面需要登录
      requiredRole: 'admin', // 且需要 'admin' 角色
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// **ADDED: 全局导航守卫**
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // 等待 Firebase 认证状态初始化完成
  if (!authStore.isAuthReady) {
    // onAuthStateChanged 尚未完成，我们需要等待它
    // 我们可以创建一个简单的 Promise 来等待
    await new Promise((resolve) => {
      const unsubscribe = authStore.$onAction(({ name, after }) => {
        if (name === '$patch' || authStore.isAuthReady) {
          unsubscribe()
          resolve()
        }
      })
      if (authStore.isAuthReady) resolve() // 如果已经 ready，立即解决
    })
  }

  const requiresAuth = to.meta.requiresAuth
  const requiredRole = to.meta.requiredRole

  if (requiresAuth && !authStore.isLoggedIn) {
    // 情况 1: 页面需要登录，但用户未登录 -> 跳转到登录页
    next({ name: 'Login' })
  } else if (requiredRole && authStore.role !== requiredRole) {
    // 情况 2: 页面需要特定角色，但用户角色不匹配 -> 跳转到首页（或未授权页面）
    console.warn(`权限不足：需要角色 '${requiredRole}', 但用户角色是 '${authStore.role}'`)
    next({ name: 'Home' })
  } else {
    // 情况 3: 满足所有权限要求 -> 正常放行
    next()
  }
})

export default router

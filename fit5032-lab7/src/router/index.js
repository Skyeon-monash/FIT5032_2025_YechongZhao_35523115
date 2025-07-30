import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase' 

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AccessDenied from '../views/AccessDenied.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AdminView from '../views/AdminView.vue' // 如果您有管理页面，请取消此行注释

// 1. 以 Promise 方式异步获取当前登录用户
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(auth, (user) => {
      removeListener();
      resolve(user);
    }, reject);
  });
};

// 2. 异步从 Firestore 获取指定用户的角色
const getUserRole = async (user) => {
  if (!user) return null;
  const userDocRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userDocRef);
  if (docSnap.exists()) {
    return docSnap.data().role;
  }
  // 如果在 Firestore 中找不到用户文档，返回默认角色
  return 'regularuser';
};

// --- 路由定义 ---
const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/access-denied', name: 'AccessDenied', component: AccessDenied },
  { path:'/FireLogin', name: 'FireLogin', component: FirebaseSigninView },
  { path:'/FireRegister', name: 'FireRegister', component: FirebaseRegisterView },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true } // 此页面需要登录才能访问
  },
  // 示例：一个需要管理员权限才能访问的页面
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    meta: {
      requiresAuth: true,     // 1. 需要登录
      roles: ['admin']        // 2. 且角色必须是 'admin'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// --- 全局路由守卫 (核心逻辑) ---
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // 如果目标路由不需要认证，直接放行
  if (!requiresAuth) {
    next();
    return;
  }

  // 如果需要认证，则获取当前用户
  const user = await getCurrentUser();

  if (!user) {
    // 用户未登录，重定向到登录页
    next('/FireLogin');
  } else {
    // 用户已登录，检查是否需要特定角色
    const requiredRoles = to.meta.roles;
    if (requiredRoles && requiredRoles.length > 0) {
      const userRole = await getUserRole(user);
      if (requiredRoles.includes(userRole)) {
        // 角色符合要求，放行
        next();
      } else {
        // 角色不符，重定向到“访问被拒绝”页面
        next('/access-denied');
      }
    } else {
      // 路由需要登录但不需要特定角色，直接放行
      next();
    }
  }
});

export default router
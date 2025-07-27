<!-- src/components/AppHeader.vue -->
<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <i class="bi bi-heart-pulse-fill text-danger"></i> 健康慈善
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item">
              <router-link class="nav-link" to="/">首页</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/news">健康资讯</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">关于我们</router-link>
            </li>

            <!-- 如果用户已登录 -->
            <template v-if="authStore.isLoggedIn">
              <!-- **ADDED: 只有 admin 角色的用户才能看到这个链接** -->
              <li v-if="authStore.isAdmin" class="nav-item">
                <router-link class="nav-link text-danger" to="/admin">管理员后台</router-link>
              </li>

              <li class="nav-item ms-lg-3">
                <span class="navbar-text">欢迎, {{ authStore.user?.email }}</span>
              </li>
              <li class="nav-item">
                <button @click="handleLogout" class="btn btn-outline-secondary ms-2">登出</button>
              </li>
            </template>

            <!-- 如果用户未登录 -->
            <template v-else>
              <li class="nav-item">
                <router-link class="btn btn-primary ms-lg-3" to="/login">登录/注册</router-link>
              </li>
            </template>

          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  await authStore.logout();
  router.push('/'); // 登出后跳转到首页
};
</script>

<style scoped>
/* ... 之前的样式保持不变 ... */
.router-link-active,
.router-link-exact-active {
  font-weight: bold;
  color: #0d6efd !important;
}

.btn.router-link-active,
.btn.router-link-exact-active {
  font-weight: normal;
  color: var(--bs-btn-color) !important;
}
</style>

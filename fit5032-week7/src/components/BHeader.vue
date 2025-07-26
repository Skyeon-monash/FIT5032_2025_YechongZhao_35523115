<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuthenticated = computed(() => localStorage.getItem('isAuthenticated') === 'true')

function logout() {
  localStorage.removeItem('isAuthenticated')
  router.push('/login')
}
</script>

<template>
  <div class="container">
    <header class="d-flex justify-content-between align-items-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home (Week 5)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireLogin" class="nav-link" active-class="active">Firebase Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active">Firebase Register</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/users" class="nav-link" active-class="active">UserList</router-link>
        </li>
      </ul>

      <!-- 登录状态控制按钮 -->
      <div>
        <router-link v-if="!isAuthenticated" to="/login" class="btn btn-outline-primary">Login</router-link>
        <button v-else @click="logout" class="btn btn-outline-danger">Logout</button>
      </div>
    </header>
  </div>
</template>

<style scoped>
/* 保留 Bootstrap 样式，可选地自定义导航样式 */
</style>

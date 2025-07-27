<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <i class="bi bi-heart-pulse-fill text-danger"></i> Health Charity
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/news">Health News</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About Us</router-link>
            </li>

            <!-- If user is logged in -->
            <template v-if="authStore.isLoggedIn">
              <!-- **ADDED: Only users with admin role can see this link** -->
              <li v-if="authStore.isAdmin" class="nav-item">
                <router-link class="nav-link text-danger" to="/admin">Admin Dashboard</router-link>
              </li>

              <li class="nav-item ms-lg-3">
                <span class="navbar-text">Welcome, {{ authStore.user?.email }}</span>
              </li>
              <li class="nav-item">
                <button @click="handleLogout" class="btn btn-outline-secondary ms-2">Logout</button>
              </li>
            </template>

            <!-- If user is not logged in -->
            <template v-else>
              <li class="nav-item">
                <router-link class="btn btn-primary ms-lg-3" to="/login">Login / Register</router-link>
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
  router.push('/'); // Redirect to home page after logout
};
</script>

<style scoped>
/* ... previous styles remain unchanged ... */
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

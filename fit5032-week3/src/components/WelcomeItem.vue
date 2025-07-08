<!-- LoginRegister.vue -->
<template>
  <div class="container">
    <h2>Welcome Back! Please log in</h2>

    <form @submit.prevent="handleLogin">
      <label>Email:</label>
      <input v-model="email" type="email" required />

      <label>Password:</label>
      <input v-model="password" type="password" required />

      <label>
        <input type="checkbox" v-model="rememberMe" />
        Remember Me
      </label>

      <div>
        <span>Login as:</span>
        <label><input type="radio" v-model="role" value="user" /> User</label>
        <label><input type="radio" v-model="role" value="caregiver" /> Caregiver</label>
        <label><input type="radio" v-model="role" value="admin" /> Admin</label>
      </div>

      <button type="submit">Login</button>
    </form>

    <hr />

    <div>
      <p>Don't have an account?</p>
      <button @click="goToRegister">Register</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const role = ref('user')

function handleLogin() {
  alert(`Logging in as ${role.value}: ${email.value}`)
}

function goToRegister() {
  // Use your router here
  alert('Redirect to registration page')
}
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
}
input, button {
  display: block;
  width: 100%;
  margin: 0.5rem 0;
}
</style>

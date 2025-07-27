<!-- src/views/LoginView.vue -->
<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Welcome Back</h2>
            <!-- Login Form -->
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input type="email" class="form-control" id="email" v-model="email" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <!-- Error Message -->
              <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
              <div class="d-grid">
                <button type="submit" class="btn btn-primary">Login</button>
              </div>
            </form>
            <p class="mt-3 text-center">
              Don't have an account? <router-link to="/register">Sign up for free</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    errorMessage.value = ''; // Reset error message
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log('Login successful!', userCredential.user);
    router.push('/'); // Redirect to home after login
  } catch (error) {
    console.error("Login failed:", error.message);
    errorMessage.value = 'Login failed: Incorrect email or password.';
  }
};
</script>

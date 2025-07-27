<!-- src/views/LoginView.vue -->
<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">欢迎回来</h2>
            <!-- 登录表单 -->
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="email" class="form-label">邮箱地址</label>
                <input type="email" class="form-control" id="email" v-model="email" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">密码</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <!-- 错误提示 -->
              <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
              <div class="d-grid">
                <button type="submit" class="btn btn-primary">登录</button>
              </div>
            </form>
            <p class="mt-3 text-center">
              还没有账户？ <router-link to="/register">免费注册</router-link>
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
    errorMessage.value = ''; // 重置错误信息
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log('登录成功!', userCredential.user);
    router.push('/'); // 登录成功后跳转到首页
  } catch (error) {
    console.error("登录失败:", error.message);
    errorMessage.value = '登录失败：邮箱或密码错误。';
  }
};
</script>

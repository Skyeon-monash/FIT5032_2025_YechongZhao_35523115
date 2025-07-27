<!-- views/FirebaseSigninView.vue -->
<template>
  <div class="container mt-5">
      <div class="row justify-content-center">
          <div class="col-md-6">
              <div class="card">
                  <div class="card-header text-center">
                      <h2>Firebase Login</h2>
                  </div>
                  <div class="card-body">
                      <form @submit.prevent="login">
                          <div class="mb-3">
                              <label for="email" class="form-label">Email address</label>
                              <input type="email" class="form-control" id="email" v-model="email" required>
                          </div>
                          <div class="mb-3">
                              <label for="password" class="form-label">Password</label>
                              <input type="password" class="form-control" id="password" v-model="password" required>
                          </div>
                          <div class="d-grid gap-2">
                              <button type="submit" class="btn btn-success">Login</button>
                          </div>
                      </form>
                      <hr>
                      <p class="text-center">Don't have an account? <router-link to="/FireRegister">Register here</router-link></p>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const router = useRouter()

// 获取 Firebase Auth 实例
const auth = getAuth()

const login = async () => {
  try {
      await signInWithEmailAndPassword(auth, email.value, password.value)
      console.log("Firebase Login Successful!")
      // 登录成功后，清除之前的 localStorage 认证状态（如果存在）
      localStorage.removeItem('isAuthenticated');
      // 跳转到需要认证的页面，例如用户列表或主页
      alert("Login successful!");
      router.push("/users") // 假设登录成功后跳转到用户列表页
  } catch (error) {
      console.error("Firebase login error:", error.code, error.message)
      let errorMessage = "Login failed. Please check your credentials."
      switch (error.code) {
          case "auth/invalid-email":
              errorMessage = "Invalid email address."
              break
          case "auth/user-not-found":
              errorMessage = "User not found. Please register or check your email."
              break
          case "auth/wrong-password":
              errorMessage = "Incorrect password. Please try again."
              break
          default:
              errorMessage = `Error: ${error.message}`
      }
      alert(errorMessage)
  }
}
</script>

<style scoped>
/* 可以添加一些基本的样式，或者依赖 Bootstrap */
</style>
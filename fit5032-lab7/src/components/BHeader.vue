<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { signOut, onAuthStateChanged } from 'firebase/auth'
// 引入 Firestore 相关函数
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

const router = useRouter()

// --- State Management ---
const firebaseUser = ref(null)
const userRole = ref(null) // 用于存储用户角色
let unsubscribe = null;

// --- Logic ---

// 异步函数，用于从 Firestore 获取用户角色
async function updateUserRole(user) {
  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        userRole.value = docSnap.data().role;
      } else {
        // 如果用户的角色文档不存在，给予默认角色 "regularuser"
        console.log("用户角色文档不存在，设置为默认 'regularuser' 角色。");
        userRole.value = 'regularuser';
      }
    } catch (error) {
      console.error("从 Firestore 获取角色失败:", error);
      userRole.value = null; // 出错时清空
    }
  } else {
    userRole.value = null; // 用户未登录，清空角色
  }
}

// --- Lifecycle Hooks ---
onMounted(() => {
  unsubscribe = onAuthStateChanged(auth, (user) => {
    firebaseUser.value = user
    updateUserRole(user) // 当认证状态改变时，立即更新用户角色
  })
})

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe()
  }
})

// --- Computed Properties ---
const isAuthenticated = computed(() => !!firebaseUser.value)
const currentUserEmail = computed(() => firebaseUser.value ? firebaseUser.value.email : '')
// 计算属性，判断用户是否为管理员，方便在模板中使用
const isAdmin = computed(() => userRole.value === 'admin')

// --- Methods ---
async function logout() {
  try {
    await signOut(auth)
    // 登出后 onAuthStateChanged 会自动处理状态，无需手动清除 localStorage
    console.log("Firebase 登出成功!")
    alert("您已成功登出。");
    router.push('/FireLogin')
  } catch (error) {
    console.error("Firebase 登出错误:", error.message)
    alert("登出失败，请重试。");
  }
}
</script>

<template>
  <div class="container">
    <header class="d-flex justify-content-between align-items-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Main (Week 5)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <!-- 仅当用户是管理员时才显示此链接 -->
        <li v-if="isAdmin" class="nav-item">
          <router-link to="/admin" class="nav-link" active-class="active">Admin Page</router-link>
        </li>
        <!-- 如果未登录，显示登录/注册链接 -->
        <template v-if="!isAuthenticated">
          <li class="nav-item">
            <router-link to="/FireLogin" class="nav-link" active-class="active">Firebase Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/FireRegister" class="nav-link" active-class="active">Firebase Register</router-link>
          </li>
        </template>
      </ul>

      <!-- 如果用户已登录，显示用户信息和登出按钮 -->
      <div v-if="isAuthenticated" class="d-flex align-items-center">
        <span class="text-dark me-3">{{ currentUserEmail }} ({{ userRole }})</span>
        <button @click="logout" class="btn btn-danger">Logout</button>
      </div>
    </header>
  </div>
</template>

<style scoped>
.nav-link {
    color: #007bff;
}
.nav-link.active {
    background-color: #007bff;
    color: white;
}
.text-dark {
    color: #212529 !important;
}
</style>
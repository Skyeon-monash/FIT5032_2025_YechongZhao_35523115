// src/stores/authStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore' // 导入 getDoc
import { auth, db } from '@/firebase/config'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const role = ref(null) // **ADDED: 新增一个 ref 来存储角色**
  const isAuthReady = ref(false) // **ADDED: 跟踪 Firebase 认证是否已初始化**

  const isLoggedIn = computed(() => !!user.value)
  const isAdmin = computed(() => role.value === 'admin') // **ADDED: 一个方便的计算属性**

  // 监听 Firebase 认证状态的变化
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      user.value = currentUser
      // **MODIFIED: 如果用户登录了，就去 Firestore 获取他的角色**
      const userDocRef = doc(db, 'users', currentUser.uid)
      const userDocSnap = await getDoc(userDocRef)
      if (userDocSnap.exists()) {
        role.value = userDocSnap.data().role // 从文档中获取角色
      } else {
        console.error('用户文档不存在！')
        role.value = null // 或者设置为默认值
      }
    } else {
      // 用户未登录
      user.value = null
      role.value = null
    }
    // **ADDED: 无论登录与否，现在认证状态都已就绪**
    isAuthReady.value = true
    console.log('Auth state changed. User:', currentUser?.email, 'Role:', role.value)
  })

  // 登出操作
  const logout = async () => {
    try {
      await signOut(auth)
      // onAuthStateChanged 会自动处理 user 和 role 的重置
    } catch (error) {
      console.error('登出失败:', error)
    }
  }

  return { user, role, isLoggedIn, isAdmin, isAuthReady, logout, unsubscribe }
})

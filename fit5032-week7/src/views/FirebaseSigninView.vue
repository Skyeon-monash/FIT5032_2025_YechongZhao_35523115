<template>
    <h1>Sign in</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()

const db = getFirestore()

const signin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    // 写入或更新 Firestore 用户信息
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      lastLogin: serverTimestamp()
    }, { merge: true })  // merge 表示保留已有字段

    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userEmail', user.email)
    router.push('/dashboard')
  } catch (error) {
    console.log('Login failed:', error.code)
  }
}
</script>

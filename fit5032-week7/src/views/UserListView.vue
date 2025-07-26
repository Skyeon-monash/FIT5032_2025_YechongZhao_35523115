<template>
  <div class="container mt-5">
    <h2>Registered Users</h2>
    <table class="table table-bordered mt-3">
      <thead class="table-light">
        <tr>
          <th>Email</th>
          <th>Last Login</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.email }}</td>
          <td>{{ formatTimestamp(user.lastLogin) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const db = getFirestore()
const users = ref([])

const fetchUsers = async () => {
  const snapshot = await getDocs(collection(db, 'users'))
  users.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

const formatTimestamp = (ts) => {
  if (!ts || !ts.toDate) return ''
  const date = ts.toDate()
  return date.toLocaleString()
}

onMounted(() => {
  fetchUsers()
})
</script>

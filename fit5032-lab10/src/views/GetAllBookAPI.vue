<template>
  <div class="json-container">
    <h2>Bookstore Information</h2>
    <div v-if="loading">Loading bookstore data...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <pre v-else>{{ JSON.stringify(bookstoreData, null, 2) }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const bookstoreData = ref(null)
const loading = ref(false)
const error = ref(null)

const fetchBookstoreData = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await fetch('src/assets/json/bookstores.json')
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    bookstoreData.value = data
  } catch (err) {
    error.value = `Failed to load bookstore data: ${err.message}`
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchBookstoreData()
})
</script>

<style scoped>
.json-container {
  padding: 1rem;
  font-family: monospace;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
}
.error {
  color: red;
}
</style>

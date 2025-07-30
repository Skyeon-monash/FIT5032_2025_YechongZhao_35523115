<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8">
        <h1 class="text-center mb-4">User Information Form</h1>
        <form @submit.prevent="submitForm" novalidate>
          <div class="row g-3">
            <div class="col-12 col-md-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                id="username"
                class="form-control"
                v-model="formData.username"
                placeholder="Enter username"
                required
              />
            </div>
            <div class="col-12 col-md-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                id="password"
                class="form-control"
                v-model="formData.password"
                placeholder="Enter password"
                required
              />
            </div>
            <div class="col-12">
              <div class="form-check">
                <input
                  type="checkbox"
                  id="isAustralian"
                  class="form-check-input"
                  v-model="formData.isAustralian"
                />
                <label class="form-check-label" for="isAustralian">
                  Are you an Australian Resident?
                </label>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <label for="gender" class="form-label">Gender</label>
              <select id="gender" class="form-select" v-model="formData.gender" required>
                <option value="" disabled>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="col-12">
              <label for="reason" class="form-label">Reason for joining</label>
              <textarea
                id="reason"
                class="form-control"
                v-model="formData.reason"
                placeholder="Share your reason..."
                rows="3"
              ></textarea>
            </div>
          </div>

          <div class="text-center mt-4">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>

    <div class="row mt-5" v-if="submittedCards.length">
      <div class="col-12">
        <h3 class="text-center mb-3">Submitted Users</h3>
        <div class="d-flex flex-wrap justify-content-center">
          <div
            v-for="(card, index) in submittedCards"
            :key="index"
            class="card m-2"
            style="width: 18rem"
          >
            <div class="card-header">User Information</div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Username: {{ card.username }}</li>
              <li class="list-group-item">Password: {{ card.password }}</li>
              <li class="list-group-item">
                Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}
              </li>
              <li class="list-group-item">Gender: {{ card.gender || 'N/A' }}</li>
              <li class="list-group-item">Reason: {{ card.reason || 'N/A' }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: '',
})

const submittedCards = ref([])

const submitForm = () => {
  if (!formData.value.username || !formData.value.password || !formData.value.gender) {
    alert('Please fill in username, password, and select gender.')
    return
  }
  submittedCards.value.push({ ...formData.value })
  clearForm()
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: '',
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>

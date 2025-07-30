<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8">
        <h1 class="text-center mb-4">User Information Form</h1>
        <form @submit.prevent="submitForm">
          <div class="row g-3">
            <div class="col-12 col-md-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                id="username"
                class="form-control"
                placeholder="Enter username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div class="text-danger" v-if="errors.username">{{ errors.username }}</div>
            </div>
            <div class="col-12 col-md-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                id="password"
                class="form-control"
                placeholder="Enter password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div class="text-danger" v-if="errors.password">{{ errors.password }}</div>
            </div>
            <div class="col-12">
              <div class="form-check">
                <input
                  type="checkbox"
                  id="isAustralian"
                  class="form-check-input"
                  v-model="formData.isAustralian"
                  @blur="validateResident"
                />
                <label class="form-check-label" for="isAustralian">
                  Are you an Australian Resident?
                </label>
                <div class="text-danger mt-1" v-if="errors.isAustralian">
                  {{ errors.isAustralian }}
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                id="gender"
                class="form-select"
                v-model="formData.gender"
                @blur="validateGender"
              >
                <option value="" disabled>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div class="text-danger mt-1" v-if="errors.gender">{{ errors.gender }}</div>
            </div>
            <div class="col-12">
              <label for="reason" class="form-label">Reason for joining</label>
              <textarea
                id="reason"
                class="form-control"
                v-model="formData.reason"
                placeholder="Share your reason..."
                rows="3"
                @blur="validateReason"
              ></textarea>
              <div class="text-danger mt-1" v-if="errors.reason">{{ errors.reason }}</div>
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
        <DataTable :value="submittedCards" stripedRows responsiveLayout="scroll">
          <Column field="username" header="Username" />
          <Column field="password" header="Password" />
          <Column
            field="isAustralian"
            header="Australian Resident"
            :body="(rowData) => (rowData.isAustralian ? 'Yes' : 'No')"
          />
          <Column field="gender" header="Gender" />
          <Column field="reason" header="Reason" />
        </DataTable>
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
  if (validateAll()) {
    submittedCards.value.push({ ...formData.value })
    clearForm()
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: '',
  }
  errors.value = {
    username: null,
    password: null,
    isAustralian: null,
    gender: null,
    reason: null,
  }
}

const errors = ref({
  username: null,
  password: null,
  resident: null,
  gender: null,
  reason: null,
})

const validateName = () => {
  if (formData.value.username.length < 3) {
    errors.value.username = 'Name must be at least 3 characters'
    return false
  }
  errors.value.username = null
  return true
}

const validatePassword = () => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    errors.value.password = 'Password must be at least 8 characters'
    return false
  } else if (!hasUppercase) {
    errors.value.password = 'Password must contain at least one uppercase letter'
    return false
  } else if (!hasLowercase) {
    errors.value.password = 'Password must contain at least one lowercase letter'
    return false
  } else if (!hasNumber) {
    errors.value.password = 'Password must contain at least one number'
    return false
  } else if (!hasSpecialChar) {
    errors.value.password = 'Password must contain at least one special character'
    return false
  }

  errors.value.password = null
  return true
}
// 是否澳大利亚居民
const validateResident = () => {
  if (typeof formData.value.isAustralian !== 'boolean') {
    errors.value.isAustralian = 'Please select if you are an Australian resident'
    return false
  }
  errors.value.isAustralian = null
  return true
}

// 性别选择
const validateGender = () => {
  if (!formData.value.gender) {
    errors.value.gender = 'Please select your gender'
    return false
  }
  errors.value.gender = null
  return true
}

// 理由
const validateReason = () => {
  if (!formData.value.reason.trim()) {
    errors.value.reason = 'Please provide a reason for joining'
    return false
  }
  errors.value.reason = null
  return true
}

// 一键验证所有字段
const validateAll = () => {
  const validName = validateName()
  const validPassword = validatePassword()
  const validResident = validateResident()
  const validGender = validateGender()
  const validReason = validateReason()
  return validName && validPassword && validResident && validGender && validReason
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

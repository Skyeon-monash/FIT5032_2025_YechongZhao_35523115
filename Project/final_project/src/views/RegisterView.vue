<!-- src/views/RegisterView.vue -->
<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Create Account</h2>

            <form @submit.prevent="handleRegister" novalidate>

              <!-- Email Field -->
              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input type="email" class="form-control" :class="{ 'is-invalid': emailError }" id="email"
                  v-model="email" @input="validateEmail" required placeholder="Enter your email">
                <div v-if="emailError" class="invalid-feedback">{{ emailError }}</div>
              </div>

              <!-- Password Field -->
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" :class="{ 'is-invalid': passwordError }" id="password"
                  v-model="password" @input="validatePassword" required minlength="8"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Password must be at least 8 characters long and include numbers, lowercase and uppercase letters"
                  placeholder="At least 8 characters with upper/lowercase letters and numbers">
                <div v-if="passwordError" class="invalid-feedback">{{ passwordError }}</div>
              </div>

              <!-- Confirm Password Field -->
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" :class="{ 'is-invalid': confirmPasswordError }"
                  id="confirmPassword" v-model="confirmPassword" @input="validateConfirmPassword" required
                  placeholder="Re-enter your password">
                <div v-if="confirmPasswordError" class="invalid-feedback">{{ confirmPasswordError }}</div>
              </div>

              <!-- Firebase Error -->
              <div v-if="formError" class="alert alert-danger">{{ formError }}</div>

              <div class="d-grid">
                <button type="submit" class="btn btn-primary">Register</button>
              </div>
            </form>

            <p class="mt-3 text-center">
              Already have an account? <router-link to="/login">Login here</router-link>
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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';

// Form fields and error refs
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const emailError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');
const formError = ref('');

const router = useRouter();

// --- Validation Functions ---
const validateEmail = (event) => {
  const value = event.target.value;

  if (!value) {
    emailError.value = 'Please enter your email address.';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      emailError.value = 'Please enter a valid email address.';
    } else {
      emailError.value = '';
    }
  }
};

const validatePassword = (event) => {
  const input = event.target;
  if (!input.checkValidity()) {
    if (input.validity.patternMismatch) {
      passwordError.value = input.title;
    } else {
      passwordError.value = input.validationMessage;
    }
  } else {
    passwordError.value = '';
  }

  if (confirmPassword.value) {
    validateConfirmPassword({ target: document.getElementById('confirmPassword') });
  }
};

const validateConfirmPassword = (event) => {
  const input = event.target;
  if (!input.checkValidity()) {
    confirmPasswordError.value = input.validationMessage;
  } else if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Passwords do not match.';
  } else {
    confirmPasswordError.value = '';
  }
};
// --- End Validation ---

const handleRegister = async () => {
  validateEmail({ target: document.getElementById('email') });
  validatePassword({ target: document.getElementById('password') });
  validateConfirmPassword({ target: document.getElementById('confirmPassword') });

  if (emailError.value || passwordError.value || confirmPasswordError.value) {
    return;
  }

  formError.value = '';

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: 'regularUser'
    });

    router.push('/');
  } catch (error) {
    console.error("Registration failed:", error.message);
    if (error.code === 'auth/email-already-in-use') {
      formError.value = 'This email address is already registered.';
    } else {
      formError.value = 'Registration failed. Please try again later.';
    }
  }
};
</script>

<style scoped>
.invalid-feedback {
  display: block;
}
</style>

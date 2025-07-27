<!-- src/views/RegisterView.vue -->
<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">创建账户</h2>

            <form @submit.prevent="handleRegister" novalidate>

              <!-- 邮箱字段 -->
              <div class="mb-3">
                <label for="email" class="form-label">邮箱地址</label>
                <input type="email" class="form-control" :class="{ 'is-invalid': emailError }" id="email"
                  v-model="email" @input="validateEmail" required placeholder="请输入您的邮箱">
                <div v-if="emailError" class="invalid-feedback">{{ emailError }}</div>
              </div>

              <!-- 密码字段 -->
              <div class="mb-3">
                <label for="password" class="form-label">密码</label>
                <input type="password" class="form-control" :class="{ 'is-invalid': passwordError }" id="password"
                  v-model="password" @input="validatePassword" required minlength="8"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="密码必须至少8个字符，且包含数字、小写字母和大写字母"
                  placeholder="至少8个字符，含大小写字母和数字">
                <div v-if="passwordError" class="invalid-feedback">{{ passwordError }}</div>
              </div>

              <!-- 确认密码字段 -->
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">确认密码</label>
                <input type="password" class="form-control" :class="{ 'is-invalid': confirmPasswordError }"
                  id="confirmPassword" v-model="confirmPassword" @input="validateConfirmPassword" required
                  placeholder="请再次输入您的密码">
                <div v-if="confirmPasswordError" class="invalid-feedback">{{ confirmPasswordError }}</div>
              </div>

              <!-- Firebase 返回的错误 -->
              <div v-if="formError" class="alert alert-danger">{{ formError }}</div>

              <div class="d-grid">
                <button type="submit" class="btn btn-primary">注册</button>
              </div>
            </Form>

            <p class="mt-3 text-center">
              已有账户？ <router-link to="/login">立即登录</router-link>
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

// 为每个字段的值和错误信息创建 ref
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const emailError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');
const formError = ref(''); // 用于 Firebase 或其他表单级错误

const router = useRouter();

// --- 实时验证函数 ---
const validateEmail = (event) => {
  const input = event.target;
  if (!input.checkValidity()) {
    emailError.value = input.validationMessage;
  } else {
    emailError.value = '';
  }
};

const validatePassword = (event) => {
  const input = event.target;
  if (!input.checkValidity()) {
    // 优先显示我们自定义的 title 提示
    if (input.validity.patternMismatch) {
      passwordError.value = input.title;
    } else {
      passwordError.value = input.validationMessage;
    }
  } else {
    passwordError.value = '';
  }
  // 每次密码变化时，都重新检查一次“确认密码”字段
  if (confirmPassword.value) {
    validateConfirmPassword({ target: document.getElementById('confirmPassword') });
  }
};

const validateConfirmPassword = (event) => {
  const input = event.target;
  if (!input.checkValidity()) {
    confirmPasswordError.value = input.validationMessage;
  } else if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = '两次输入的密码不一致。';
  } else {
    confirmPasswordError.value = '';
  }
};
// --- 验证函数结束 ---

const handleRegister = async () => {
  // 提交前，手动触发所有验证，确保万无一失
  validateEmail({ target: document.getElementById('email') });
  validatePassword({ target: document.getElementById('password') });
  validateConfirmPassword({ target: document.getElementById('confirmPassword') });

  // 检查是否有任何错误
  if (emailError.value || passwordError.value || confirmPasswordError.value) {
    return; // 如果有错误，则阻止提交
  }

  // 重置表单级错误
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
    console.error("注册失败:", error.message);
    if (error.code === 'auth/email-already-in-use') {
      formError.value = '此邮箱地址已被注册。';
    } else {
      formError.value = '注册失败，请稍后再试。';
    }
  }
};
</script>

<style scoped>
/* 确保错误信息总是可见，而不是仅在 focus 时 */
.invalid-feedback {
  display: block;
}
</style>

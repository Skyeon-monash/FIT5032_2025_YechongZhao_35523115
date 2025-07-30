<!-- views/FirebaseRegisterView.vue -->
<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header text-center">
                        <h2>Create Firebase Account</h2>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="register">
                            <div class="mb-3">
                                <label for="email" class="form-label">Email address</label>
                                <input type="email" class="form-control" id="email" v-model="email" required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" v-model="password" required>
                            </div>
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-primary">Register</button>
                            </div>
                        </form>
                        <hr>
                        <p class="text-center">Already have an account? <router-link to="/FireLogin">Login here</router-link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, setDoc } from "firebase/firestore"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const router = useRouter()

const auth = getAuth()
const db = getFirestore()

const register = async () => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
        const user = userCredential.user

        // 关键修改点：在用户注册成功后，将其默认角色设置为 "regularuser"
        await setDoc(doc(db, "users", user.uid), {
            email: email.value,
            role: "regularuser" // 将默认角色设置为 "regularuser"
        })

        console.log("Firebase Register Successful!", user.uid)
        alert("Registration successful! You can now log in.");
        router.push("/FireLogin")
    } catch (error) {
        console.error("Firebase registration error:", error.code, error.message)
        let errorMessage = "Registration failed. Please try again."
        switch (error.code) {
            case "auth/email-already-in-use":
                errorMessage = "This email is already in use."
                break
            case "auth/invalid-email":
                errorMessage = "Invalid email address."
                break
            case "auth/weak-password":
                errorMessage = "Password is too weak. It must be at least 6 characters."
                break
            default:
                errorMessage = `Error: ${error.message}`
        }
        alert(errorMessage)
    }
}
</script>

<style scoped>
/* 样式保持不变 */
</style>
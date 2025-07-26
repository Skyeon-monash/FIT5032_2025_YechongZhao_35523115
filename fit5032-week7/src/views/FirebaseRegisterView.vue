<template>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Save to Firebase</button></p>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useRouter } from "vue-router"

// 1. 定义响应式变量
const email = ref("")
const password = ref("")

// 2. 获取 Vue Router 和 Firebase Auth 的实例
const router = useRouter()
const auth = getAuth()
const db = getFirestore();

// 3. 定义注册函数
const register = async () => {
    try {
        const data = await createUserWithEmailAndPassword(auth, email.value, password.value);
        // 注册成功后写入角色信息到Firestore
        await setDoc(doc(db, "users", data.user.uid), {
            email: email.value,
            role: "user"
        });
        console.log("Firebase Register Successful!");
        router.push("/FireLogin");
    } catch (error) {
        console.log(error.code);
    }
};
</script>
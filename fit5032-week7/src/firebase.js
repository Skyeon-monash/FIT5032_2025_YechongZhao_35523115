// 1. 从 Firebase SDK 中导入所需的函数
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 2. 您的 Firebase 项目配置信息
// TODO: 将这里替换成您自己项目的真实配置
const firebaseConfig = {
  apiKey: "AIzaSyDekOB91wtA-X1fdn10L61a53ll56d1XO4",
  authDomain: "skyeon-feaca.firebaseapp.com",
  projectId: "skyeon-feaca",
  storageBucket: "skyeon-feaca.firebasestorage.app",
  messagingSenderId: "760671582778",
  appId: "1:760671582778:web:22b8019973ef00dd125303"
};

// 3. 初始化 Firebase App
const app = initializeApp(firebaseConfig);

// 4. 初始化 Firebase 的各项服务，并导出它们
// 其他文件将从这里导入已经初始化好的实例，而不是自己去调用 getAuth() 或 getFirestore()
export const auth = getAuth(app);
export const db = getFirestore(app);
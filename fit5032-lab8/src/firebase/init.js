// 从您需要的 SDK 中导入函数
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// TODO: 添加您想使用的 Firebase 产品的 SDK
// https://firebase.google.com/docs/web/setup#available-libraries

// 您的 Web 应用的 Firebase 配置
// 有关 Firebase JS SDK v7.20.0 及更高版本，measurementId 是可选的
const firebaseConfig = {
  apiKey: 'AIzaSyDekOB91wtA-X1fdn10L61a53ll56d1XO4',
  authDomain: 'skyeon-feaca.firebaseapp.com',
  projectId: 'skyeon-feaca',
  storageBucket: 'skyeon-feaca.firebasestorage.app',
  messagingSenderId: '760671582778',
  appId: '1:760671582778:web:22b8019973ef00dd125303'
}

// 初始化 Firebase
const firebaseApp = initializeApp(firebaseConfig)

// 初始化 Cloud Firestore 并获取对该服务的引用
const db = getFirestore(firebaseApp)

// 导出 Firestore 实例以在您的组件中使用
export { db }

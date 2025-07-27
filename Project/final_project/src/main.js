// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia' // 导入

import App from './App.vue'
import router from './router/index.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)
app.use(createPinia()) // 使用 Pinia
app.use(router)
app.mount('#app')

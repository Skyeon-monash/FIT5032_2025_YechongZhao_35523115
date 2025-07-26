import 'bootstrap/dist/css/bootstrap.min.css'
import { initializeApp } from 'firebase/app'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')

const firebaseConfig = {
  apiKey: 'AIzaSyDekOB91wtA-X1fdn10L61a53ll56d1XO4',
  authDomain: 'skyeon-feaca.firebaseapp.com',
  projectId: 'skyeon-feaca',
  storageBucket: 'skyeon-feaca.firebasestorage.app',
  messagingSenderId: '760671582778',
  appId: '1:760671582778:web:22b8019973ef00dd125303'
}

const firebaseApp = initializeApp(firebaseConfig)
export { firebaseApp }
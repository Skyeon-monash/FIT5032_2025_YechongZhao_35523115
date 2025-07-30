import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

// 引入PrimeVue
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

// 引入DataTable组件
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

// 创建App
const app = createApp(App)
app.use(PrimeVue)

// 注册组件
app.component('DataTable', DataTable)
app.component('Column', Column)

app.mount('#app')

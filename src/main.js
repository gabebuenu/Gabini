import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importar o CSS do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// Importar o JavaScript do Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)

app.use(router)

app.mount('#app')

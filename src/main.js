import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import '../assets/js/global.js'

const app = createApp(App)

app.use(router)

app.mount('#app')

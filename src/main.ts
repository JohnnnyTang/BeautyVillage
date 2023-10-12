<<<<<<< Updated upstream
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
=======
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
>>>>>>> Stashed changes

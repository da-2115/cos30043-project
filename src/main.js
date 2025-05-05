import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '../router'
import "bootstrap/dist/css/bootstrap.css"
import Vue3Pagination from 'vue3-pagination'

const app = createApp(App)
app.component('Pagination', Vue3Pagination).use(router).mount('#app')

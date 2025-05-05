import { createWebHistory, createRouter } from 'vue-router'
import Home from './src/components/Home.vue'
import About from './src/components/About.vue'
import News from './src/components/News.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/news', component: News }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
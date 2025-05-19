import { createWebHistory, createRouter } from 'vue-router'
import Home from './src/components/Home.vue'
import About from './src/components/About.vue'
import News from './src/components/News.vue'
import Forum from './src/components/forum/Forum.vue'
import Blog from './src/components/blog/Blog.vue'
import Login from './src/components/auth/Login.vue'
import store from './src/store/store'

const routes = [
    { name: "Home", path: '/', component: Home },
    { name: "About", path: '/about', component: About },
    { name: "News", path: '/news', component: News },
    { name: "Forum", path: '/forum', component: Forum },
    { name: "Blog", path: '/blog', component: Blog },
    { name: "Login", path: '/login', component: Login }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

/*
router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !store.state.auth.isAuthenticated) {
        next({ name: 'Login' })
    } else {
        next()
    }
})
*/
export default router
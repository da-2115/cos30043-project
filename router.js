import { createWebHistory, createRouter } from 'vue-router'
import Home from './src/components/Home.vue'
import About from './src/components/About.vue'
import News from './src/components/News.vue'
import Forum from './src/components/forum/Forum.vue'
import Blog from './src/components/blog/Blog.vue'
import store from './src/store/store'
import Logout from './src/components/auth/Logout.vue'
import AdvancedSearch from './src/components/forum/AdvancedSearch.vue'
import PostDetails from './src/components/forum/PostDetails.vue'
import PostQuestion from './src/components/forum/PostQuestion.vue'
import Auth from './src/components/auth/Auth.vue'

const routes = [
  { name: "Home", path: '/', component: Home },
  { name: "About", path: '/about', component: About },
  { name: "News", path: '/news', component: News },
  { name: "Forum", path: '/forum', component: Forum },
  { name: "AdvancedSearch", path: '/forum/search', component: AdvancedSearch },
  { name: "PostDetails", path: '/forum/:id', component: PostDetails, props: route => ({ postId: JSON.parse(route.params.id) }) },
  { name: "PostQuestion", path: '/forum/post', component: PostQuestion },
  { name: "Blog", path: '/blog', component: Blog },
  { name: "Auth", path: '/auth', component: Auth },
  { name: "Logout", path: '/logout', component: Logout }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
    const auth0 = router.auth0
    console.log('Auth0 Instance in router.js:', auth0)
  
    if (!auth0) {
      console.error('Auth0 instance is undefined!')
      next({ name: 'Auth' })
      return
    }
  
    const isAuthenticated = store.state.auth?.isAuthenticated
  
    if (!isAuthenticated) {
      await store.dispatch('auth/checkAuthentication', auth0)
    }
  
    if (to.name !== 'Auth' && !store.state.auth.isAuthenticated) {
      next({ name: 'Auth' })
    } else {
      next()
    }
})

export default router
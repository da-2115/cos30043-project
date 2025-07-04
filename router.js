/*
  router.js
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1
*/

import { createWebHistory, createRouter } from 'vue-router'
import Home from './src/components/Home.vue'
import About from './src/components/About.vue'
import News from './src/components/News.vue'
import Forum from './src/components/forum/Forum.vue'
import store from './src/store/store'
import Logout from './src/components/auth/Logout.vue'
import AdvancedSearch from './src/components/forum/AdvancedSearch.vue'
import PostDetails from './src/components/forum/PostDetails.vue'
import PostQuestion from './src/components/forum/PostQuestion.vue'
import Auth from './src/components/auth/Auth.vue'

// Routes for app
const routes = [
  { name: "Home", path: '/', component: Home },
  { name: "About", path: '/about', component: About },
  { name: "News", path: '/news', component: News },
  { name: "Forum", path: '/forum', component: Forum },
  { name: "AdvancedSearch", path: '/forum/search', component: AdvancedSearch },
  { name: "PostDetails", path: '/forum/:id', component: PostDetails, props: route => ({ postId: JSON.parse(route.params.id) }) },
  { name: "PostQuestion", path: '/forum/post', component: PostQuestion },
  { name: "Auth", path: '/auth', component: Auth },
  { name: "Logout", path: '/logout', component: Logout }
]

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Check authentication
router.beforeEach(async (to, from, next) => {
    const auth0 = router.auth0

    if (!auth0) {
      next({ name: 'Home' })
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
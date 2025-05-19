<template>
  <nav v-if="!isAuthenticated"> <!-- Change later back to if isAuthenticated -->
    <div class="container">
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-12">
          <router-link class="m-1" to="/">Home</router-link>
          <router-link class="m-1" to="/news">News</router-link>
          <router-link class="m-1" to="/about">About</router-link>
          <router-link class="m-1" to="/forum">Forum</router-link>
          <router-link class="m-1" to="/blog">Blog</router-link>
          <!-- Chat feature goes here -->
        </div>
      </div>
    </div>
  </nav>
  <main>
    <router-view />
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState('auth', {
            isAuthenticated: (state) => state.isAuthenticated
        })
  }
}

</script>

<style>

</style>
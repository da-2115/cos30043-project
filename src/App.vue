<!--
  src/App.vue
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1
-->

<template>
  <nav>
    <div class="container">
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-12">
          <router-link class="m-1" to="/">Home</router-link>
          <router-link class="m-1" to="/news">News</router-link>
          <router-link class="m-1" to="/about">About</router-link>
          <router-link class="m-1" to="/forum">Forum</router-link>
          <!-- Chat feature goes here -->
          <router-link class="m-1" to="/logout">Logout</router-link>
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
    // Check if user is authenticated
    ...mapState('auth', {
            isAuthenticated: (state) => state.isAuthenticated
        })
  }
}

</script>

<style>

</style>
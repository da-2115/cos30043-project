<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/news">News</router-link>
    <router-link to="/about">About</router-link>
  </nav>
  <main>
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'App'
}

</script>

<style>

</style>
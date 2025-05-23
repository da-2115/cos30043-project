<template>
    <div class="container">
      <strong>Logging out...</strong>
    </div>
  </template>
  
  <script>
  export default {
    name: "Logout",
    mounted() {
        this.$auth0.logout();
        this.$router.push({ path: '/auth' });
    }
  };
  </script>
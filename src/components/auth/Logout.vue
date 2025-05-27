<!--
  src/components/auth/Logout.vue
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1
-->

<template>
  <div class="container">
    <strong>Logging out...</strong>
  </div>
</template>

<script>
export default {
  name: "Logout",
  mounted() {
    // On mount, logout and push the router to the auth route (Login/Signup Page)
    this.$auth0.logout()
    this.$router.push({ path: "/auth" })
  },
}
</script>

<template>
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12">
          <h2>Register</h2>
          <form @submit.prevent="register">
            <input
              class="form-control"
              v-model="username"
              placeholder="Username"
            />
            <input
              class="form-control"
              v-model="password"
              type="password"
              placeholder="Password"
            />
            <button class="btn btn-primary" type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapMutations } from 'vuex';
  
  export default {
    name: "Register",
    data() {
      return {
        username: "",
        password: "",
      };
    },
    methods: {
      ...mapMutations('auth', ['setCurrentUser']),
      register() {
        console.log("Auth0 Instance:", this.$auth0);
        console.log("Vuex Store:", this.$store);
  
        this.$auth0.loginWithRedirect({
          appState: {
            target: "/profile",
          },
          authorizationParams: {
            screen_hint: "signup",
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
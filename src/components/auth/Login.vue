<template>
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12">
          <form @submit.prevent="login">
            <input class="form-control" v-model="username" placeholder="Username" />
            <input class="form-control" v-model="password" type="password" placeholder="Password" />
            <button class="btn btn-primary" @click="login">Login</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapMutations } from 'vuex';
  
  export default {
    name: "Login",
    data() {
      return {
        username: "",
        password: "",
      };
    },
    methods: {
      ...mapMutations('auth', ['setAuthentication', 'setUser']),
        login() {
            this.$auth0.loginWithRedirect();
      },
    },
  };
  </script>
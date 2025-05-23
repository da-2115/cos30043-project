<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12">
                <h3>Login and Sign Up</h3>
                <p>Already have an account?</p>
                <form @submit.prevent="login">
                    <button class="btn btn-primary">Login</button>
                </form>
                <p>New here?</p>
                <form @submit.prevent="register">
                    <button class="btn btn-primary">Register</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name: "Auth",
    methods: {
        ...mapMutations('auth', ['setAuthentication', 'setUser']),
        login() {
            this.$auth0.loginWithRedirect();
        },
        ...mapMutations('auth', ['']),
        register() {
            this.$auth0.loginWithRedirect({
                appState: {
                    target: "/",
                },
                authorizationParams: {
                    screen_hint: "signup",
                },
            });
        },
    },
};
</script>
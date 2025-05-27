/*
  src/main.js
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1
*/

import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import router from "../router"
import "bootstrap/dist/css/bootstrap.css"
import store from "./store/store"
import { createAuth0 } from "@auth0/auth0-vue"

import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(fas)

const app = createApp(App)

// Initialize Auth0 plugin
app.use(
  createAuth0({
    domain: "dev-3u1o0ieh0rq454ym.us.auth0.com",
    clientId: "Nhoh5yVyj89ADdV1tRRdihq4WoxHqDk0",
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  })
)

// Use Vuex store and router
app.use(store)
app.component("font-awesome-icon", FontAwesomeIcon)
app.use(router)

// Mount the app
app.mount("#app")

// Pass the Auth0 instance to the router after mounting
router.auth0 = app.config.globalProperties.$auth0

// Debugging: Log the Auth0 instance
console.log("Auth0 Instance in main.js:", router.auth0)

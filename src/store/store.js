/*
  src/store/store.js
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1
*/

import { createStore } from "vuex"
import auth from "./modules/auth"
import forum from "./modules/forum"

// Create store
const store = createStore({
  modules: {
    auth,
    forum,
  },
})

export default store

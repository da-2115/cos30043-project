/*
  src/store/modules/auth.js
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1
*/

export default {
  namespaced: true,
  // State for authentication (contains initial state)
  state: {
    isAuthenticated: false,
    user: null,
  },
  // Mutations for authentication (update state)
  mutations: {
    setAuthentication(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated
    },
    setUser(state, user) {
      state.user = user
    },
  },
  // Asynchronous actions for authentication
  actions: {
    async checkAuthentication({ commit }, auth0) {
      try {
        // Access the isAuthenticated property
        const isAuthenticated = auth0.isAuthenticated
        commit("setAuthentication", isAuthenticated)

        if (isAuthenticated) {
          // Call the getUser function
          const user = await auth0.user
          commit("setUser", user)
        }
      } catch (error) {
        console.error("Error during authentication check:", error)
      }
    },
  },
}

export default {
    namespaced: true,
    state: {
      isAuthenticated: false,
      user: null,
    },
    mutations: {
      setAuthentication(state, isAuthenticated) {
        state.isAuthenticated = isAuthenticated;
      },
      setUser(state, user) {
        state.user = user;
      },
    },
    actions: {
      async checkAuthentication({ commit }, auth0) {
        console.log('Auth0 in checkAuthentication:', auth0); // Debugging
        console.log('Auth0 methods:', Object.keys(auth0 || {})); // Debugging
  
        try {
          // Access the isAuthenticated property
          const isAuthenticated = auth0.isAuthenticated;
          commit('setAuthentication', isAuthenticated);
  
          if (isAuthenticated) {
            // Call the getUser function
            const user = await auth0.user
            console.log('User Info:', user); // Debugging
            commit('setUser', user);
          }
        } catch (error) {
          console.error('Error during authentication check:', error);
        }
      },
    },
  };
export default {
    namespaced: true,
    state() {
        return {
            currentUser: "",
            isAuthenticated: false
        }
    },
    mutations: {
        setCurrentUser(state, user) {
            state.currentUser = user
            state.isAuthenticated = true
        }
    },
    getters: {
        currentUser(state) {
            return state.currentUser
        },
        isAuthenticated(state) {
            return state.isAuthenticated
        }
    },
    actions: {}
}
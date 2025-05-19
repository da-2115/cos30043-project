export default {
    namespaced: true,
    state() {
        return {
            posts: [],
            comments: []
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setComments(state, posts) {
            state.comments = comments
        },
        updateLikes(state, { id, likes }) {
            const post = state.posts.find(p => p.id === id)
            if (post) post.likes = likes
        },
        updateDislikes(state, { id, dislikes }) {
            const post = state.posts.find(p => p.id === id)
            if (post) post.dislikes = dislikes
        }
    },
    getters: {
        getLikes: (state) => (id) => {
            const post = state.posts.find(p => p.id === id)
            return post ? post.likes : 0
        },
        getDislikes: (state) => (id) => {
            const post = state.posts.find(p => p.id === id)
            return post ? post.dislikes : 0
        }
    },
    actions: {
        async fetchPosts({ commit }) {
            return fetch('http://localhost:3000/posts')
            .then(res => res.json())
            .then(data => commit('setPosts', data))
        },
        async fetchComments({ commit }) {
            return fetch('http://localhost:3000/comments')
            .then(res => res.json())
            .then(data => commit('setComments', data))
        }
    }
}
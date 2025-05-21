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
        setComments(state, comments) {
            state.comments = comments
        },
        updateLikes(state, { forumPostId, likes }) {
            const post = state.posts.find(p => p.forumPostId === forumPostId)
            if (post) post.likes = likes
        },
        updateDislikes(state, { forumPostId, dislikes }) {
            const post = state.posts.find(p => p.forumPostId === forumPostId)
            if (post) post.dislikes = dislikes
        }
    },
    getters: {
        getLikes: (state) => (id) => {
            const post = state.posts.find(p => p.forumPostId === id)
            return post ? post.likes : 0
        },
        getDislikes: (state) => (id) => {
            const post = state.posts.find(p => p.forumPostId === id)
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
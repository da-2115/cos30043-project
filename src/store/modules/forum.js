/*
  store/modules/forum.js
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1
*/

export default {
  namespaced: true,
  // Intitial state for forum
  state() {
    return {
      posts: [],
      comments: [],
      socials: [],
    }
  },
  // Mutations for forum
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    setComments(state, comments) {
      state.comments = comments
    },
    updateLikes(state, { forumPostId, likes }) {
      // Update likes based on post found
      const post = state.posts.find((p) => p.forumPostId === forumPostId)
      if (post) post.likes = likes
    },
    updateDislikes(state, { forumPostId, dislikes }) {
      // Update dislikes based on post found
      const post = state.posts.find((p) => p.forumPostId === forumPostId)
      if (post) post.dislikes = dislikes
    },
    setSocials(state, socials) {
      state.socials = socials
    },
  },
  // Getters, get state for forum
  getters: {
    getLikes: (state) => (id) => {
      const post = state.posts.find((p) => p.forumPostId === id)
      return post ? post.likes : 0
    },
    getDislikes: (state) => (id) => {
      const post = state.posts.find((p) => p.forumPostId === id)
      return post ? post.dislikes : 0
    },
  },
  // Asynchronous actions for forum
  actions: {
    async fetchPosts({ commit }) {
      return fetch("http://localhost:3000/posts")
        .then((res) => res.json())
        .then((data) => commit("setPosts", data))
    },
    async fetchComments({ commit }) {
      return fetch("http://localhost:3000/comments")
        .then((res) => res.json())
        .then((data) => commit("setComments", data))
    },
    async fetchSocials({ commit }) {
      return fetch("http://localhost:3000/socials")
        .then((res) => res.json())
        .then((data) => commit("setSocials", data))
    },
  },
}

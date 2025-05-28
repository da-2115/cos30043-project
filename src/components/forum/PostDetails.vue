<!--
  src/components/forum/PostDetails.vue
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1
-->

<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-12">
        <div class="card p-3">
          <h3>{{ post.title }}</h3>
          <p v-html="formatContent(post.contents)"></p>
          <p><strong>Posted by:</strong> {{ post.userPosted }}</p>

          <button
            class="btn btn-secondary"
            @click="$router.push({ name: 'AdvancedSearch' })"
          >
            Back to Posts
          </button>
          <p></p>
          <button
            @click="editingPost = !editingPost"
            v-if="post.userPosted === this.user.name"
            class="btn btn-warning"
          >
            {{ editingPost ? "Discard" : "Edit" }}
          </button>
          <div v-if="editingPost">
            <form>
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input
                  type="text"
                  id="title"
                  v-model="post.title"
                  class="form-control"
                />
              </div>
              <div class="mb-3">
                <label for="contents" class="form-label">Contents</label>
                <p>
                  You can use <strong>$$$ code here $$$</strong> for coding
                  markup.
                </p>
                <textarea
                  id="contents"
                  v-model="post.contents"
                  :rows="20"
                  class="form-control"
                ></textarea>
              </div>
              <button
                type="button"
                @click="editPost(post)"
                class="btn btn-primary"
              >
                Submit
              </button>
            </form>
          </div>
          <p></p>
          <button
            @click="deletePost(post)"
            v-if="post.userPosted === this.user.name"
            class="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12">
        <div class="card p-3">
          <h5>Comments Section</h5>
          <div
            id="comment"
            v-for="comment in getCommentsForPost"
            :key="comment.commentId"
          >
            <strong>{{ comment.userPosted }}</strong
            >: {{ comment.commentText }}
          </div>
          <p>Leave a comment</p>
          <textarea
            v-focus
            class="form-control"
            v-model="commentInputs[postId]"
          ></textarea>
          <button class="btn btn-primary" @click="createComment(postId)">
            Post
          </button>
          <button @click="likeCurrentPost(post)" class="btn btn-success m-1">
            {{ isLikedByUser ? "Unlike" : "Like" }} {{ getLikes(postId) }}
            <font-awesome-icon :icon="['fas', 'thumbs-up']" />
          </button>
          <button @click="dislikeCurrentPost(post)" class="btn btn-danger m-1">
            {{ isDislikedByUser ? "Undislike" : "Dislike" }}
            {{ getDislikes(postId) }}
            <font-awesome-icon :icon="['fas', 'thumbs-down']" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
import { mapMutations } from "vuex/dist/vuex.cjs.js"
import vFocus from "../../directives/v-focus"

export default {
  name: "PostDetails",
  directives: {
    focus: vFocus
  },
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      post: {}, // Holds the post details
      commentInputs: {}, // Holds the comment input for each post
      editingPost: false,
    }
  },
  computed: {
    ...mapState("forum", ["posts", "comments", "socials"]),
    ...mapGetters("forum", ["getLikes", "getDislikes"]),
    ...mapState("auth", ["user"]),

    // Get comments for post
    getCommentsForPost() {
      // If no comments, return empty array
      if (!this.comments) {
        return []
      }

      return this.comments.filter((c) => c.forumPostId === this.postId)
    },
    // Has the user liked the post already?
    isLikedByUser() {
      // Find the forumSocials record for this user and post
      const record = this.socials?.find(
        (s) => s.forumPostId === this.postId && s.username === this.user.name
      )

      return record ? record.hasLiked : false
    },
    // Has the user disliked the post already?
    isDislikedByUser() {
      const record = this.socials?.find(
        (s) => s.forumPostId === this.postId && s.username === this.user.name
      )

      return record ? record.hasDisliked : false
    },
  },
  methods: {
    ...mapActions("forum", ["fetchPosts", "fetchComments", "fetchSocials"]),
    ...mapMutations("forum", ["updateLikes", "updateDislikes"]),
    fetchPost(postId) {
      // Fetch the post details from Vuex
      this.post = this.posts.find((p) => p.forumPostId === postId) || {}
    },

    // When $$$ is opened and closed with $$$ the inbetween text will be marked up as a code tag, indicating code markup
    formatContent(content) {
      // If content is empty, return a blank string
      if (!content) {
        console.warn("Content is undefined or empty")
        return ""
      }

      // HTML Escape characters function
      const escapeHtml = (str) => {
        return str
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")
      }

      // Check if the content contains $$$
      const codeRegex = /\$\$\$(.*?)\$\$\$/gs // Matches text between $$$
      return content.replace(codeRegex, (match, code) => {
        // Escape HTML characters and wrap the extracted code in <pre><code> tags
        return `<pre><code>${escapeHtml(code.trim())}</code></pre>`
      })
    },
    editPost(post) {
      // Call API, edit the post
      fetch("http://localhost:3000/editPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          forumPostId: post.forumPostId,
          title: post.title,
          contents: post.contents,
        }),
      })
        .then(() => {
          // Update Vuex store if successful
          this.fetchPost(this.postId)
        })
        .catch((error) => {
          // Otherwise, display error to the console
          console.error("Error creating comment:", error)
        })
    },
    createComment(postId) {
      const commentText = this.commentInputs[postId] || ""
      if (!commentText.trim()) {
        console.error("Comment text is empty")
        return
      }

      // Create comment, call API
      fetch("http://localhost:3000/createComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          forumPostId: postId,
          userPosted: this.user.name,
          commentText: commentText,
        }),
      })
        .then(() => {
          // Update Vuex store if successful
          this.fetchComments(postId)
          this.commentInputs[postId] = ""
        })
        .catch((error) => {
          // Otherwise, display error to the console
          console.error("Error creating comment:", error)
        })
    },
    deletePost(post) {
      // Delete post, call API
      fetch("http://localhost:3000/deletePost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ forumPostId: post.forumPostId }),
      }).then(() => {
        // Return router to AdvancedSearch
        this.$router.push({ name: "AdvancedSearch" })
      })
    },
    likeCurrentPost(post) {
      // Like post
      fetch("http://localhost:3000/likePost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.user.name,
          forumPostId: post.forumPostId,
          likes: post.likes + 1,
        }),
      }).then(() => {
        this.fetchPosts().then(() => this.fetchPost(this.postId))
        this.fetchSocials()
      })
    },
    dislikeCurrentPost(post) {
      // Dislike post
      fetch("http://localhost:3000/dislikePost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.user.name,
          forumPostId: post.forumPostId,
          dislikes: post.dislikes + 1,
        }),
      })
        .then(() => {
          this.fetchPosts().then(() => this.fetchPost(this.postId))
          this.fetchSocials()
        })
        .catch(() => {})
    },
  },
  mounted() {
    // On mount fetch the post details
    this.fetchPost(this.postId)

    // Then, fetch comments for the specific post
    this.fetchComments(this.postId) 

    // Lastly, fetch socials
    this.fetchSocials()
  },
}
</script>

<style scoped>

</style>

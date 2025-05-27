<!--
  src/components/forum/Forum.vue
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1
-->

<template>
  <div class="container">
    <nav>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <h3>Forum</h3>
          <p>
            Ask questions, get help and much more (related to Computer Science &
            Programming).
          </p>
          <router-link
            class="btn btn-outline-info btn-lg m-1"
            to="/forum/search"
            ><font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            Search</router-link
          >
          <router-link class="btn btn-outline-info btn-lg m-1" to="/forum/post"
            ><font-awesome-icon :icon="['fas', 'question']" /> Ask a
            Question</router-link
          >
        </div>
      </div>
    </nav>
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <div
          class="card m-1"
          v-if="paginatedPosts.length > 0"
          v-for="(post, idx) in paginatedPosts"
          :key="post.forumPostId"
        >
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.contents }}</p>
            <p class="card-text text-muted">Posted by: {{ post.userPosted }}</p>
            <button class="btn btn-primary" @click="viewPost(post.forumPostId)">
              View Details
            </button>
          </div>
        </div>
        <paginate
          v-if="paginatedPosts.length > 0"
          :model-value="currentPage"
          :page-count="totalPages"
          :page-range="2"
          :click-handler="onPageChange"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :container-class="'pagination'"
          :page-class="'page-item'"
          :page-link-class="'page-link'"
          :prev-class="'page-item'"
          :prev-link-class="'page-link'"
          :next-class="'page-item'"
          :next-link-class="'page-link'"
        />
        <div v-else>
          <p>No posts yet</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex"
import VuejsPaginateNext from "vuejs-paginate-next"

export default {
  components: {
    paginate: VuejsPaginateNext,
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 8,
      postTitle: "",
      postContents: "",
    }
  },
  computed: {
    ...mapState("forum", ["posts", "comments"]),
    ...mapGetters("forum", ["getLikes", "getDislikes"]),
    ...mapState("auth", ["user"]),
    getCommentCount() {
      return this.comments.length
    },
    sortedPosts() {
      return [...this.posts].sort((a, b) => b.forumPostId - a.forumPostId)
    },

    paginatedPosts() {
      // Same as advanced search's paginatedPosts property
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.sortedPosts.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.sortedPosts.length / this.itemsPerPage)
    },
  },
  methods: {
    ...mapMutations("forum", ["updateLikes", "updateDislikes"]),

    ...mapActions("forum", ["fetchPosts"]),
    viewPost(postId) {
      this.$router.push({ name: "PostDetails", params: { id: postId } })
    },
    onPageChange(page) {
      this.currentPage = page
    },
  },
  watch: {
    searchParams() {
      this.currentPage = 1
    },
  },
  mounted() {
    // On mount, fetch posts
    this.fetchPosts()
  },
}
</script>

<style scoped></style>

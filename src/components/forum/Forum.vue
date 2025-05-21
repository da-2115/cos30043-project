<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-8 col-md-8 col-sm-12">
                <div class="card m-1" v-if="paginatedPosts.length > 0" v-for="(post, idx) in paginatedPosts" :key="idx">
                    <div class="card-body">
                        <h5 class="card-title">{{ post.title }}</h5>
                        <p class="card-text">{{ post.contents }}</p>
                        <div>
                          <h5>Comments Section</h5>
                          <div id="comment" v-for="comment in getCommentsForPost(post.forumPostId)">
                            {{ comment.commentText }}
                          </div>
                          <p>Leave a comment</p>
                          <textarea class="form-control" v-model="commentInputs[post.forumPostId]"></textarea>
                          <button class="btn btn-primary" @click="createComment(post.forumPostId)">Post</button>
                        </div>
                        <button @click="likeCurrentPost(post)" class="btn btn-success m-1">{{ getLikes(post.forumPostId) }} Likes</button>
                        <button @click="dislikeCurrentPost(post)" class="btn btn-danger m-1">{{ getDislikes(post.forumPostId) }} Dislikes</button>
                    </div>
                </div>
                <div v-else>
                  <p>No items match your search results.</p>
                </div>
                <paginate
  :model-value="currentPage"
  :page-count="totalPages"
  :page-range="2"
  @update:modelValue="onPageChange"
/>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Ask a Question</h5>
                        <p class="card-text">Ask a question on the forum here.</p>
                        <form>
                          <div class="mb-3">
                            <label for="postTitle">Question:
                              <input name="postTitle" v-model="postTitle" class="form-control" type="input">
                            </label>
                          </div>
                          <div class="mb-3">
                            <label>Contents:
                              <textarea class="form-control" v-model="postContents" rows="15"></textarea>
                            </label>
                          </div>

                          <button type="button" class="btn btn-success" @click="createPost(this.posts.length)">Post</button>
                        </form>
                    </div>
                </div>
                <br />
                <div class="card" id="search">
                  <div class="card-body">
                    <h5 class="card-title">Search</h5>
                    <input class="form-control" type="text" v-model="searchParams">
                    <div class="m-1">
                      <p>Sort By</p>
                        <select class="form-select" >
                          <option v-for="(sort, idx) in sortByOptions" :key="idx">{{ sort }}</option>
                        </select>
                      <br/>
                    </div>
                    <div class="m-1">
                      <p>Filter By</p>
                      <select class="form-select" >
                        <option v-for="(filter, idx) in filterByOptions" :key="idx">{{ filter }}</option>
                      </select>
                      <br />
                    </div>
                  </div>
                  
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import VuejsPaginateNext from 'vuejs-paginate-next'

export default {
  components: {
    paginate: VuejsPaginateNext,
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 4,
      postTitle: "",
      postContents: "",
      commentInputs: {},
      searchParams: "",
      filterByOptions: [
        "All",
        "C",
        "C++",
        "Rust",
        "C#",
        "Java",
        "JavaScript",
        "Kotlin",
        "Swift",
        "TypeScript",
        "SQL",
        "PHP",
        "HTML",
        "CSS",
        "Scala",
        "Python",
        "Ruby",
        "R",
        "Go",
        "AWS",
        "Azure",
        "Cisco",
        "GCP",
        "Docker",
        "Kubernetes",
        "Terraform"
      ],
      sortByOptions: [
        "Newest",
        "Oldest",
        "Most Liked"
      ]
    }
  },
  computed: {
  ...mapState('forum', ['posts', 'comments']),
  ...mapGetters('forum', ['getLikes', 'getDislikes']),
  getCommentCount() {
    return this.comments.length
  },
  sortedPosts() {
    return [...this.filteredPosts].sort((a, b) => b.forumPostId - a.forumPostId)
  },
  filteredPosts() {
    if (!this.searchParams) return this.posts
    const search = this.searchParams.toLowerCase()
    return this.posts.filter(post =>
      (post.title && post.title.toLowerCase().includes(search)) ||
      (post.contents && post.contents.toLowerCase().includes(search))
    )
  },
  paginatedPosts() {
    const start = (this.currentPage - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage
    return this.sortedPosts.slice(start, end)
  },
  totalPages() {
    return Math.ceil(this.filteredPosts.length / this.itemsPerPage)
  }
},
  methods: {
    ...mapMutations('forum', ['updateLikes', 'updateDislikes']),
    ...mapActions('forum', ['fetchPosts', 'fetchComments']),
    getCommentsForPost(postId) {
      return this.comments.filter(c => c.forumPostId === postId)
    },
    likeCurrentPost(post) {
      fetch('http://localhost:3000/likePost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forumPostId: post.forumPostId, likes: post.likes + 1 })
      })
      .then(() => {
        this.updateLikes({ forumPostId: post.forumPostId, likes: post.likes + 1 })
      })
    },
    createComment(postId) {
    const commentText = this.commentInputs[postId] || ""
    if (!commentText.trim()) return 

    fetch('http://localhost:3000/createComment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forumPostId: postId, commentText })
    })
    .then(() => {
      this.fetchComments()
      this.commentInputs[postId] = ""
    })
  },
    onPageChange(page) {
      this.currentPage = page
    },
    dislikeCurrentPost(post) {
      fetch('http://localhost:3000/dislikePost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forumPostId: post.forumPostId, dislikes: post.dislikes + 1 })
      })
      .then(() => {
        this.updateDislikes({ forumPostId: post.forumPostId, dislikes: post.dislikes + 1 })
      })
    },
    createPost(id) {
    fetch('http://localhost:3000/createPost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, title: this.postTitle, contents: this.postContents, likes: 0, dislikes: 0 })
    })
    .then(() => {
      this.fetchPosts()
      this.postTitle = ""
      this.postContents = ""
    })
  }
  },
  watch: {
    searchParams() {
      this.currentPage = 1
    }
  },
  mounted() {
    this.fetchPosts()
    this.fetchComments()
  }
}
</script>

<style scoped>

</style>
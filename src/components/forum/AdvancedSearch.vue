<template>
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="card" id="search">
            <div class="card-body">
                <h5 class="card-title">Search</h5>
                <input class="form-control" type="text" v-model="searchParams" placeholder="Search posts..." />
                <div class="m-1">
                    <p>Sort By</p>
                    <select class="form-select" v-model="sortBy">
                        <option v-for="(sort, idx) in sortByOptions" :key="idx" :value="sort">{{ sort }}</option>
                    </select>
                </div>
                <div class="m-1">
                    <p>Filter By</p>
                    <select class="form-select" v-model="selectedFilter">
                        <option v-for="filter in filterByOptions" :key="filter.id" :value="filter">{{ filter.name }}
                        </option>
                    </select>
                </div>
                <button @click="reset" class="btn btn-danger">Reset</button>
            </div>
        </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="post-list">
            <div v-for="post in paginatedPosts" :key="post.forumPostId" class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">{{ post.title }}</h5>
                    <p class="card-text">{{ post.contents }}</p>
                    <p class="card-text text-muted">Posted by: {{ post.userPosted }}</p>
                    <button class="btn btn-primary" @click="viewPost(post.forumPostId)" type="button">View
                        Details</button>
                </div>
            </div>
        </div>
        <paginate :model-value="currentPage" :page-count="totalPages" :page-range="2" :click-handler="onPageChange"
            :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'"
            :page-link-class="'page-link'" :prev-class="'page-item'" :prev-link-class="'page-link'"
            :next-class="'page-item'" :next-link-class="'page-link'" />

        <!-- Create Post Button -->
        <button class="btn btn-primary" @click="createPost">Create New Post</button>
    </div>
        </div>
    </div>

        <!-- Post List Section -->
        
</template>

<script>
import { mapState, mapActions } from "vuex"
import VuejsPaginateNext from 'vuejs-paginate-next'
export default {
    name: "AdvancedSearch",
    components: {
        paginate: VuejsPaginateNext
    },
    data() {
        return {
            searchParams: "",
            currentPage: 1,
            itemsPerPage: 4,
            sortBy: "Newest",
            sortByOptions: ["Newest", "Oldest", "Most Liked"],
            filterByOptions: [
                { id: 0, name: "All" },
                { id: 1, name: "C" },
                { id: 2, name: "C++" },
                { id: 3, name: "Rust" },
                { id: 4, name: "C#" },
                { id: 5, name: "Java" },
                { id: 6, name: "JavaScript" },
                { id: 7, name: "Kotlin" },
                { id: 8, name: "Swift" },
                { id: 9, name: "TypeScript" },
                { id: 10, name: "SQL" },
                { id: 11, name: "PHP" },
                { id: 12, name: "HTML" },
                { id: 13, name: "CSS" },
                { id: 14, name: "Scala" },
                { id: 15, name: "Python" },
                { id: 16, name: "Ruby" },
                { id: 17, name: "R" },
                { id: 18, name: "Go" },
                { id: 19, name: "AWS" },
                { id: 20, name: "Azure" },
                { id: 21, name: "Cisco" },
                { id: 22, name: "GCP" },
                { id: 23, name: "Docker" },
                { id: 24, name: "Kubernetes" },
                { id: 25, name: "Terraform" },
            ],
            selectedFilter: { id: 0, name: "All" }
        }
    },
    computed: {
        ...mapState("forum", ["posts"]), // Map posts from Vuex state
        sortedPosts() {
            return [...this.filteredPosts].sort((a, b) => b.forumPostId - a.forumPostId)
        },
        totalPages() {
            return Math.ceil(this.filteredPosts.length / this.itemsPerPage)
        },
        paginatedPosts() {
            const start = (this.currentPage - 1) * this.itemsPerPage
            const end = start + this.itemsPerPage
            return this.sortedPosts.slice(start, end)
        },

        sortedPosts() {
            console.log("Sorting by:", this.sortBy)
            if (this.sortBy === "Newest") {
                return [...this.filteredPosts].sort((a, b) => b.forumPostId - a.forumPostId)
            } else if (this.sortBy === "Oldest") {
                return [...this.filteredPosts].sort((a, b) => a.forumPostId - b.forumPostId)
            } else if (this.sortBy === "Most Liked") {
                return [...this.filteredPosts].sort((a, b) => b.likes - a.likes)
            }
            return this.filteredPosts
        },
        filteredPosts() {
            let filtered = this.posts

            if (this.searchParams) {
                const search = this.searchParams.toLowerCase()
                filtered = filtered.filter(
                    (post) =>
                        (post.title && post.title.toLowerCase().includes(search)) ||
                        (post.contents && post.contents.toLowerCase().includes(search)) ||
                        (post.userPosted && post.userPosted.toLowerCase().includes(search))
                )
            }

            if (this.selectedFilter.id !== 0) {
                filtered = filtered.filter((post) => post.categoryId === this.selectedFilter.id)
            }

            console.log("Filtered posts:", filtered) // Debugging
            return filtered
        },
    },
    methods: {
        ...mapActions("forum", ["fetchPosts"]), // Map the fetchPosts action from Vuex
        viewPost(postId) {
            this.$router.push({ name: "PostDetails", params: { id: postId } })
        },
        createPost() {
            this.$router.push({ name: "PostQuestion" })
        },
        onPageChange(page) {
            this.currentPage = page // Update the current page when the user changes it
        },
        reset() {
            this.sortBy = "Newest"
            this.selectedFilter = { id: 0, name: "All" }
            this.searchParams = ""
        }
    },
    mounted() {
        // Fetch posts from the database when the component is mounted
        this.fetchPosts()
    },
    watch: {
        searchParams() {
            this.currentPage = 1
        },
        selectedFilter(newValue) {
            console.log("Selected filter:", newValue)
        },
    },
}
</script>

<style scoped></style>
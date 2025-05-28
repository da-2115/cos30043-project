<!--
  src/components/forum/PostQuestion.vue
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1
-->

<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="card p-3">
          <h3>Create a New Post</h3>
          <form @submit.prevent="createPost(selectedFilter.id)">
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input
                v-focus
                type="text"
                id="title"
                v-model="title"
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
                v-model="contents"
                :rows="20"
                class="form-control"
              ></textarea>
              <p>Category</p>
              <select class="form-select" v-model="selectedFilter">
                <option
                  v-for="filter in filterByOptions"
                  :key="filter.id"
                  :value="filter"
                >
                  {{ filter.name }}
                </option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import vFocus from "../../directives/v-focus"

export default {
  name: "PostQuestion",
  directives: {
    focus: vFocus,
  },
  data() {
    return {
      title: "",
      contents: "",
      filterByOptions: [
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
      selectedFilter: { id: 1, name: "C" },
    }
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    createPost() {
      // Create post - return true or false to form for data validation
      if (!this.title || !this.contents) {
        alert("You must enter a title and contents!")
        return false
      } else {
        fetch("http://localhost:3000/createPost", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userPosted: this.user.name,
            categoryId: this.selectedFilter.id,
            title: this.title,
            contents: this.contents,
            likes: 0,
            dislikes: 0,
          }),
        })
          .then(() => {
            this.$router.push({ name: "AdvancedSearch" })
            return true
          })
          .catch(() => {
            alert("Error: Cannot connect to server.")
            return false
          })
      }
    },
  },
}
</script>

<style scoped></style>

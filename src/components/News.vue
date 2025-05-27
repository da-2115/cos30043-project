<!--
  src/components/News.vue
  COS30043 - Interface Design and Development Final Project
  Dylan Armstrong 105040962 - 2025 Semester 1
-->

<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-12">
        <h2 id="newsHeading">News</h2>
      </div>
      <div id="newsSearch">
        <label for="newsSearchBox">Search</label>
        <br />
        <input
          class="form-control"
          name="newsSearchBox"
          id="newsSearchBox"
          type="text"
          v-model="searchParams"
        />
      </div>
      <div>
        <div v-if="paginatedNewsItems.length > 0">
          <table
            class="table"
            id="newsItems"
            role="table"
            aria-label="News items table"
          >
            <caption>
              Latest news items
            </caption>
            <thead class="table-dark">
              <tr role="row">
                <th scope="col">ID</th>
                <th scope="col">Date</th>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
                <th scope="col">Category</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in paginatedNewsItems"
                :key="item.id"
                class="newsItem"
                role="row"
              >
                <th scope="row">{{ item.id }}</th>
                <td role="cell">{{ item.date }}</td>
                <td role="cell">{{ item.title }}</td>
                <td role="cell">{{ item.content }}</td>
                <td role="cell">{{ item.category }}</td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination Component for Pagination of News Table -->
          <paginate
            :model-value="currentPage"
            :page-count="totalPages"
            :page-range="2"
            @update:modelValue="onPageChange"
          />
        </div>
        <p v-else>No items found!</p>
      </div>
    </div>
  </div>
</template>

<script>
import data from "../data/news.json"
import VuejsPaginateNext from "vuejs-paginate-next"

export default {
  name: "News",
  components: {
    paginate: VuejsPaginateNext,
  },
  data() {
    return {
      searchParams: "",
      newsItems: data,
      currentPage: 1,
      itemsPerPage: 4,
    }
  },
  methods: {
    onPageChange(page) {
      this.currentPage = page
    },
  },
  watch: {
    searchParams() {
      this.currentPage = 1
    },
  },
  computed: {
    newsItemsSearched() {
      return this.newsItems.filter((item) => {
        const search = this.searchParams.toLowerCase()
        return (
          item.id.toString().includes(search) ||
          item.date.toString().includes(search) ||
          item.title.toString().includes(search) ||
          item.content.toString().includes(search) ||
          item.category.toString().includes(search)
        )
      })
    },
    paginatedNewsItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.newsItemsSearched.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.newsItemsSearched.length / this.itemsPerPage)
    },
  },
}
</script>

<style></style>

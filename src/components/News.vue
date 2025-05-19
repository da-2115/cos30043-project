<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-12">
        <h2 id="newsHeading">News</h2>
  </div>
  <div id="newsSearch">
    <label for="newsSearchBox">Search</label>
    <br />
    <input name="newsSearchBox" id="newsSearchBox" type="text" v-model="searchParams">
  </div>
  <div>
    <div v-if="paginatedNewsItems.length > 0">
      <table class="table" id="newsItems">
        <thead class="table-dark">
          <tr>
        <th>ID</th>
        <th>Date</th>
        <th>Title</th>
        <th>Content</th>
        <th>Category</th>
      </tr>
        </thead>
      <tbody>
        <tr v-for="item in paginatedNewsItems" class="newsItem">
          <th>{{ item.id }}</th>
          <td>{{ item.date }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.content }}</td>
          <td>{{ item.category }}</td>
        </tr>
      </tbody>
    </table>
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
import data from '../data/news.json'
import VuejsPaginateNext from 'vuejs-paginate-next'

export default {
  name: 'News',
  components: {
    paginate: VuejsPaginateNext,
  },
  data() {
    return {
        searchParams: "",
        newsItems: data,
        currentPage: 1,
        itemsPerPage: 4
    }
  },
  methods: {
    onPageChange(page) {
      this.currentPage = page
    }
  },
  watch: {
    searchParams() {
      this.currentPage = 1
    }
  },
  computed: {
    newsItemsSearched() {
        return this.newsItems.filter(item => {
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
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.newsItemsSearched.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.newsItemsSearched.length / this.itemsPerPage);
    },
  }
}
  
</script>
  
<style>
  
</style>
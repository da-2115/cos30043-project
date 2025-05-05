<template>
  <div>
    <h2 id="newsHeading">News</h2>
  </div>
  <div id="newsSearch">
    <label for="newsSearchBox">Search</label>
    <br />
    <input name="newsSearchBox" id="newsSearchBox" type="text" v-model="searchParams">
  </div>
  <div>
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-changed="onPageChange"
    />
    <p>No items found!</p>
  </div>
</template>
  
<script>
import data from '../data/news.json'

export default {
  name: 'News',
  data() {
    return {
        searchParams: "",
        newsItems: data
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
  }
}
  
</script>
  
<style>
  
</style>
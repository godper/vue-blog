<template>
  <div class="articles" v-loading="loading">
    <h3>同系列其他文章</h3>
    <ul>
      <li v-for="article in articles" :key="article.id" class="item">
        <router-link :to="{ path: `/post/${article.id}` }">{{article.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

</script>
<script>
export default {
  props: ["articleID"],
  name: "SameTopic",
  data() {
    return {
      loading: true,
      articles: []
    };
  },
  methods: {
    fetchArticle() {
      // replace getPost with your data fetching util / API wrapper
      this.axios
        .get("/topic-articles?id="+this.articleID)
        .then(response => {
          if (response.status <= 40000) {
            this.articles = response.data;
            this.loading = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.fetchArticle();
  }
};
</script>

<style>
.sidebar-primary .articles {
  height: auto;
  min-height: 200px;
  background-color: white;
  position: relative;
  box-shadow: 0 0 2px 0 rgba(58, 58, 58, 0.2);
  margin-bottom: 1.5em;
  padding: 1.875em 7.50006% 2.25em;
}
.articles .item {
  margin:  5px 2px;
}
</style>
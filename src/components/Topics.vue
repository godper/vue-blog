<template>
  <div class="topics" v-loading="loading">
    <h3>主题</h3>
    <ul>
      <li
        v-for="topic in topics"
        :key="topic.id"
        class="item"
        :style="listyle(topic.id)"
      >
        <router-link :to="{ path: `/topic/${topic.id}` }">{{
          topic.name
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

</script>
<script>
export default {
  name: "Topics",
  data() {
    return {
      loading: true,
      topics: []
    };
  },
  methods: {
    fetchTopic() {
      // replace getPost with your data fetching util / API wrapper
      this.axios
        .get("/topics")
        .then(response => {
          if (response.status <= 40000) {
            this.topics = response.data;
            this.loading = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    listyle(id) {
      if (this.$route.params.topic_id == id) {
        return "color: #61C8E2";
      }
    }
  },
  created() {
    this.fetchTopic();
  },

};
</script>

<style>
.sidebar-primary .topics {
  height: auto;
  min-height: 200px;
  background-color: white;
  position: relative;
  box-shadow: 0 0 2px 0 rgba(58, 58, 58, 0.2);
  margin-bottom: 1.5em;
  padding: 1.875em 7.50006% 2.25em;
}
.topics .item {
  margin: 5px 0;
}
</style>
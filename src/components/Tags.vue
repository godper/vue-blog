<template>
  <div class="tags" v-loading="loading">
    <h3>标签</h3>
    <el-tag v-for="tag in tags" :key="tag.id" :type="tagtype()" class="item">
      <router-link :to="{ path: `/tag/${tag.id}` }"> &nbsp;&nbsp;{{ tag.name }} &nbsp;&nbsp;</router-link>
      
    </el-tag>
  </div>
</template>

</script>
<script>
export default {
  name: "Tags",
  data() {
    return {
      loading: true,
      tags: [

      ]
    };
  },
  methods: {
    fetchTag() {
      // replace getPost with your data fetching util / API wrapper
      this.axios
        .get("/tags")
        .then(response => {
          if (response.status <= 40000) {
            this.tags = response.data;
            this.loading = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    tagtype() {
      let type = Math.floor(Math.random() * 4);
      switch (type) {
        case 0:
          return "";
        case 1:
          return "success";
        case 2:
          return "info";
        case 3:
          return "warning";
        case 4:
          return "danger";
      }
    }
  },
  created() {
    this.fetchTag();
  }
};
</script>

<style>
.sidebar-primary .tags {
  height: auto;
  min-height: 200px;
  background-color: white;
  position: relative;
  box-shadow: 0 0 2px 0 rgba(58, 58, 58, 0.2);
  margin-bottom: 1.5em;
  padding: 1.875em 7.50006% 2.25em;
}
.tags .item {
  padding: 0px;
  margin: 5px 10px;
}
.tags .item a{
  height: 30px;
  line-height: 30px
}
</style>
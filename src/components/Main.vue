<template>
  <div id="content-main" class="content-main">
    <div class="container" id="container" v-loading="loading">
      <div class="article" :style="articleloading">
        <div v-if="item">
          <div class="list-header">
            <div class="title">
              <h1>
                {{ item.title }}
              </h1>
            </div>
            <div class="time">
              <p>{{ item.created_at}}</p>
            </div>
          </div>

          <div class="list-body">
            <div class="content">
              <mavon-editor
                v-model="item.content"
                :toolbars="markdownOption"
                :subfield="false"
                defaultOpen="preview"
                :boxShadow="false"
                :toolbarsFlag="false"
                previewBackground="#fff"
                style="font-size: 18px;z-index:0"
              />
            </div>
          </div>

          <div class="list-footer">
            <div class="tag"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="comments">
      <div class="block"></div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Article",
  props: ["articleID"],
  data() {
    return {
      markdownOption: {
        toolbarsFlag: false,
      },
      item: null,
      post: null,
      error: null,
      loading: true
    };
  },
  computed: {
    articleloading() {
      if (this.loading == true) {
        return { height: "500px" };
      }
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    articleID: "fetchArticle"
  },
  methods: {
    fetchArticle() {
      this.loading = true;
      // replace getPost with your data fetching util / API wrapper
      this.axios
        .get("/article/" + this.articleID)
        .then(response => {
          if (response.status <= 40000) {
            this.item = response.data;

            this.loading = false;
          }
          window.scrollTo(0, 0);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchArticle();
  }
};
</script>

<style>
.content-main .article {
  height: auto;
  min-height: 200px;
  background-color: white;
  position: relative;
  box-shadow: 0 0 2px 0 rgba(58, 58, 58, 0.2);
  margin-bottom: 1.5em;
  padding: 1.875em 0 2.25em;
}
.content-main .article .list-header .title {
  font-weight: 400;
  color: #1f2f3d;
}
.content-main .article .list-header .time {
  font-size: 14px;
  color: #5e6d82;
  line-height: 20px;
}
.content-main .article .list-header {
  margin-bottom: 10px;
  padding: 0 3.50006%;
}
.content-main .article .list-body .content {
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 10px;
  line-height: 30px;
}

.content-main .comments {
  background-color: white;
  position: relative;
  box-shadow: 0 0 2px 0 rgba(58, 58, 58, 0.2);
  padding: 1em;
  margin-bottom: 5em;
}
</style>

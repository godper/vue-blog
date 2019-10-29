<template>
  <section id="main-content-content" class="main-content">
    <div
      class="loop-container"
      id="loop-container"
      v-loading="loading"
      :style="articleloading"
    >
      <div v-if="!articles">
        <div class="article">
          <h1>
            暂无数据
          </h1>
        </div>
      </div>

      <div v-if="articles">
        <div class="article" :key="item.id" v-for="item in articles">
          <div class="list-header">
            <div class="title">
              <h1>
                <router-link :to="{ path: `/post/${item.id}` }">
                  {{ item.title }}
                </router-link>
              </h1>
            </div>
            <div class="time">
              <p>{{ item.created_at }}</p>
            </div>
          </div>

          <div class="list-body">
            <div class="desc">
              {{ item.desc }}
            </div>
            <div class="image" v-if="item.cover_image_url">
              <el-image :src="item.cover_image_url" lazy></el-image>
            </div>
          </div>

          <div class="list-footer">
            <div class="tag" v-if="item.tags">
              <el-tag
                v-for="tag in item.tags"
                :key="tag.id"
                type="info"
                class="item"
              >
                {{ tag.name }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination" v-if="nosingle">
      <div class="block">
        <el-pagination
          background
          :hide-on-single-page="nosingle"
          :current-page.sync="currentPage"
          layout="total, prev, pager, next"
          :page-size="pagesize"
          :total="total"
          color="lightblue"
        >
        </el-pagination>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Articles",
  props: ["topic_id", "tag_id"],
  data() {
    return {
      articles: null,
      post: null,
      error: null,
      pagesize: 10,
      currentPage: 1,
      total: 1,
      loading: true
    };
  },
  computed: {
    nosingle() {
      return this.total > this.pagesize;
    },
    articleloading() {
      if (this.loading) {
        return { height: "auto", minHeight: "500px", backgroundColor: "white" };
      }
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    currentPage: function() {
      this.watchroute();
    },
    topic_id: function() {
      this.watchroute();
    },
    tag_id: function() {
      this.watchroute();
    }
  },
  methods: {
    watchroute() {
      if (this.topic_id) {
        this.$router.push({
          path: `/topic/${this.topic_id}/${this.currentPage}`
        });
      } else if (this.tag_id) {
        this.$router.push({ path: `/tag/${this.tag_id}/${this.currentPage}` });
      } else {
        this.$router.push({ path: `/home/${this.currentPage}` });
      }
      this.fetchArticles();
    },
    fetchArticles() {
      this.loading = true;
      var url = "";
      if (this.topic_id) {
        url =
          "/articles-topics?page_num=" +
          this.currentPage +
          "&topic_id=" +
          this.topic_id;
      } else if (this.tag_id) {
        url =
          "/articles-tags?page_num=" +
          this.currentPage +
          "&tag_id=" +
          this.tag_id;
      } else {
        url = "/articles?page_num=" + this.currentPage;
      }
      this.axios
        .get(url)
        .then(response => {
          if (response.status <= 40000) {
            this.articles = response.data.items;
            this.total = response.data.total;
            this.loading = false;
            if (this.articles.length == 0) {
              this.articles = null;
            }
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
    var cu = this.currentPage;
    if (this.$route.name == "root") {
      this.currentPage = 1;
    }
    if (this.$route.params.page_num) {
      this.currentPage = parseInt(this.$route.params.page_num);
    }
    if (this.currentPage == cu) {
      this.fetchArticles();
    }
  },
  mounted() {},
  beforeDestroy() {}
};
</script>

<style>
.main-content .loop-container:after {
  content: ".";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
}
.main-content .article {
  height: auto;
  min-height: 200px;
  background-color: white;
  position: relative;
  box-shadow: 0 0 2px 0 rgba(58, 58, 58, 0.2);
  margin-bottom: 1.5em;
  padding: 1.875em 7.50006% 2.25em;
}
.main-content .article .list-header .title {
  font-weight: 400;
  color: #1f2f3d;
}
.main-content .article .list-header .time {
  font-size: 14px;
  color: #5e6d82;
  line-height: 20px;
}
.main-content .article .list-header {
  margin-bottom: 10px;
}
.main-content .article .list-footer .tag .item {
  margin: 0 5px;
}
.main-content .article .list-body .desc {
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 10px;
  line-height: 30px;
}
.main-content .pagination {
  background-color: white;
  position: relative;
  box-shadow: 0 0 2px 0 rgba(58, 58, 58, 0.2);
  padding: 1em;
  margin-bottom: 5em;
}
</style>


<template>
  <div class="max-width">
    <section class="main">
      <Articles :topic_id="topic_id" :tag_id="tag_id" />
    </section>
    <aside class="sidebar-primary">
      <Info />
      <Topics />
      <Tags />
    </aside>
  </div>
</template>

<script>
// @ is an alias to /src
import Articles from "@/components/Articles.vue";
import Tags from "@/components/Tags.vue";
import Topics from "@/components/Topics.vue";
import Info from "@/components/Info.vue";

export default {
  props: ["topic_id", "tag_id"],
  name: "Home",
  components: {
    Articles,
    Tags,
    Topics,
    Info
  }
};
</script>

<style>


@media (min-width: 56.25em) {
  .main {
    width: 62.5005%;
    float: left;
    margin-right: 3.125025%;
  }

  .sidebar-primary {
    width: 34.375275%;
    float: left;
    margin-top: 3em;
  }
  .sidebar-primary:after {
    content: ".";
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
  }
}

.sidebar-primary .article {
  height: auto;
  min-height: 200px;
  background-color: white;
  position: relative;
  box-shadow: 0 0 2px 0 rgba(58, 58, 58, 0.2);
  margin-bottom: 1.5em;
  padding: 1.875em 7.50006% 2.25em;
}
</style>
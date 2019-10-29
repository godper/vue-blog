<template>
  <div class="max-width">
    <section class="main">
      <Main :articleID="articleID" />
    </section>
    <aside class="sidebar-primary">
      <Info />
      <SameTopic :articleID="articleID" />
    </aside>
  </div>
</template>

<script>
// @ is an alias to /src
import Main from "@/components/Main.vue";
import Info from "@/components/Info.vue";
import SameTopic from "@/components/SameTopic.vue";

export default {
  name: "Post",
  components: {
    Main,
    Info,
    SameTopic
  },
  props: ["articleID"]
};
</script>

<style>
@media (min-width: 56.25em) {
  .main {
    width: 62.5005%;
    float: left;
    margin-right: 3.125025%;
  }
  .main .container:after {
    content: ".";
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
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
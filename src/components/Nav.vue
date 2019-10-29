<template>
  <div class="max-width">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#31496d"
      text-color="#ffffff"
      active-text-color="#74CDDD"
      router
      style="border-bottom: solid 1px #31496D;"
    >
      <el-menu-item index="/">
        <img alt="Godper logo" src="../assets/godper.png" class="logo" />
      </el-menu-item>
      <el-menu-item index="/home" class="navitem">主页</el-menu-item>
      <el-menu-item index="/about" class="navitem">关于</el-menu-item>
    </el-menu>
  </div>
</template>


<script>
export default {
  name: "Nav",
  data() {
    return {
      activeIndex: this.$route.path
    };
  },
  methods: {},
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      this.activeIndex = this.$route.path;
    }
  }
};
</script>

<style>
.site-nav .navitem {
  margin-right: 10px;
}
.site-nav .logo {
  height: 60px;
}
.site-nav a {
  font-weight: bold;
  line-height: 60px;
}
</style>
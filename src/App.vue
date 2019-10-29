<template>
  <div id="app">
    <Backtop />
    <div id="site-header" class="site-header">
      <Header />
    </div>
    <div id="site-nav" class="site-nav">
      <Nav />
    </div>
    <div id="primary-container" class="primary-container">
      <transition name="component-fade" mode="out-in">
        <router-view />
      </transition>
    </div>

    <footer id="site-footer" class="site-footer">
      <Footer msg="©2019 godper.com"> </Footer>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
import Backtop from "@/components/Backtop.vue";

export default {
  name: "App",
  components: {
    Header,
    Nav,
    Footer,
    Backtop
  },
  created() {
    // 在页面加载时读取sessionStorage
    if (localStorage.getItem("godper.com-store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(localStorage.getItem("godper.com-store"))
        )
      );
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      localStorage.setItem(
        "godper.com-store",
        JSON.stringify(this.$store.state)
      );
    });
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  overflow: hidden;
  height: auto;
  min-height: 100%;
  white-space: normal;
  word-break: break-all;
  height: 100%;
  margin: 0;
  padding: 0;
  color: #636b6f;
  font-family: Helvetica, Arial, PingFang SC, Noto Sans, Roboto, Microsoft Yahei,
    sans-serif;
}
a {
  text-decoration: none;
  color: #333;
}
a:hover {
  color: #666
}

a.router-link-exact-active {
  color: #61C8E2;
} 
.site-header {
  background: white;
  color: #333;
  padding: 0px 5.5556% 0px;
  height: 30px;
  line-height: 30px;
}
.site-nav {
  background: #31496d;
  color: white;
  padding: 36px 5.5556% 5.25em;
}
.primary-container {
  padding: 0 5.5556%;
  margin-top: -5.25em;
  min-height: 100vh;
}

.max-width {
  max-width: 1300px;
  margin: 0 auto;
}

.site-footer {
  text-align: center;
  background: #31496d;
  margin-top: 3.75em;
  color: #d4d4d4;
  clear: both;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.2s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
/* webkit, opera, IE9 */
::selection { background:lightblue;color: #333 }
/* mozilla firefox */
::-moz-selection { background:#333; }
</style>

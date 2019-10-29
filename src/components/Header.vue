<template>
  <div id="max-width" class="max-width">
    <div class="top-bar-block">

      <div class="top-bar-left">
        <p class="com">
          <router-link to="/" :style="{ 'color': '#41BDDC'}">Godper.com</router-link>
        </p> 
      </div>
      
         
      <div>
        <div class="userinfo top-bar-right" v-if="userstatus">
          <Userinfo />
        </div>
        <div class="userlogin top-bar-right" v-else>
          <UserloginRegister />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Userinfo from "@/components/Userinfo.vue";
import UserloginRegister from "@/components/UserloginRegister.vue";
import { mapState } from "vuex";
export default {
  name: "Header",
  components: {
    Userinfo,
    UserloginRegister
  },
  computed: {
    ...mapState(["userstatus"]),
  }


};
</script>

<style>
.top-bar-left {
  float: left;
}
.top-bar-right {
  float: right;
   margin-left:10px; 
}
.top-bar-block:after {
  content: ".";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
}
.com {
  color: #41BDDC;
}
</style>
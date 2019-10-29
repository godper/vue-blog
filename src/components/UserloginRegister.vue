<template>

  <el-popover placement="bottom-end" width="300" trigger="click" v-model="visible">
    <div class="login-choose">
      <el-radio v-model="radio" label="login">登录</el-radio>
      <el-radio v-model="radio" label="register">注册</el-radio>
    </div>

    <div class="login-register">
      <Login v-if="radio == 'login'" />
      <Register v-if="radio == 'register'" />
    </div>
    
    <div slot="reference">
      <img src="../assets/gowaiting.png" alt="" class="reference-avater" />
    </div>
  </el-popover>


</template>

<script>
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
export default {
  components: {
    Login,
    Register
  },
  data() {
    return {
      visible: false,
      radio: "login"
    };
  },
  methods: {
    setVisible() {
      this.visible = false;
    },
    setRadioToLogin() {
      this.radio = "login";
    }
  },
  provide: function() {
    return {
      setRadioToLogin: this.setRadioToLogin,
      setVisible: this.setVisible
    };
  }
};
</script>

<style>
.login-register {
  margin-right: 20px;
  font-size: 10px;
}
.login-choose {
  margin: 20px;
}
.reference-avater {
  line-height: 30px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  overflow: hidden;
}
</style>
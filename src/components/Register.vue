<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="80px"
    class="demo-ruleForm"
    size="mini"
  >
    <el-form-item label="账号" prop="username">
      <el-input
        v-model.trim="ruleForm.username"
        autocomplete="off"
        placeholder="3 到 10 个字符"
        autofocus
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model.trim="ruleForm.password"
        autocomplete="off"
        placeholder="6 到 20 个字符"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="password_confirm">
      <el-input
        type="password"
        v-model.trim="ruleForm.password_confirm"
        autocomplete="off"
        placeholder="6 到 20 个字符"
      ></el-input>
    </el-form-item>

    <el-form-item label="验证码" prop="captcha">
      <el-input
        type="password"
        v-model.trim="ruleForm.captcha"
        autocomplete="off"
        placeholder="6 个字符"
      ></el-input>
      <img :src="captcha_src" alt="" height="60" @click="getCaptcha()"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      captcha_id: "",
      captcha_src: "",
      ruleForm: {
        username: "",
        password: "",
        password_confirm: "",
        captcha: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        password_confirm: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "请输入验证码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getCaptcha() {
      this.axios
        .get("/captcha")
        .then(response => {
          //操作成功
          if (response.status < 40000) {
            this.captcha_id = response.data.captcha_id;
            this.captcha_src = response.data.image_url;
          }
        })
        .catch(error => {
          //请求失败
          console.log(error);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
         var data =  this.ruleForm;
         data.captcha_id = this.captcha_id; 
          var request = {
            method: "post",
            url: "/register",
            data: data
          };
          //axios请求
          this.axios(request)
            .then(response => {
              //操作成功
              if (response.status < 40000) {
                this.$message({
                  message: response.msg,
                  type: "success"
                });
                this.setRadioToLogin();
              }
              //操作失败
              if (response.status > 40000) {
                this.$message.error(response.msg);
              }
            })
            .catch(error => {
              //请求失败
              console.log(error);
              this.$message({
                message: "请求失败",
                type: "warning"
              });
            });
        } else {
          this.$message({
            message: "请输入正确数据",
            type: "warning"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    this.getCaptcha();
  },
  inject: ["setRadioToLogin"]
};
</script>


<style>
</style>
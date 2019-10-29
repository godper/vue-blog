<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="60px"
    class="demo-ruleForm"
    size="mini"
  >
    <el-form-item label="账号" prop="username">
      <el-input
        v-model.trim="ruleForm.username"
        autocomplete="off"
        placeholder="请输入账号"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model.trim="ruleForm.password"
        autocomplete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState([
      "token",
      "userinfo"
    ])
  },
  methods: {
    ...mapMutations(["userDataSave"]),

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var request = {
            method: "post",
            url: "/login",
            data: this.ruleForm
          };
          this.axios(request)
            .then(response => {
              //操作成功
              if (response.status < 30000) {
                this.userDataSave(response.data);
                this.setVisible();
                this.$message.success(response.msg);
              }
            })
            .catch(error => {
              //请求失败
              this.$message.warning("有点问题");
            });
        } else {
          this.$message.warning("请输入正确数据");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  inject: ["setVisible"]
};
</script>


<style>
</style>
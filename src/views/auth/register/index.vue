<template>
  <div class="window">
    <div class="central-section">
      <div class="title">注册账号</div>
      <div class="form">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <!-- 账号 -->
          <el-form-item prop="account">
            <el-input v-model="ruleForm.account" type="text" placeholder="账号">
              <template #prefix>
                <el-icon><i-ep-User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              placeholder="密码"
            >
              <template #prefix>
                <el-icon><i-ep-Unlock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item prop="checkpassword">
            <el-input
              v-model="ruleForm.checkpassword"
              type="password"
              placeholder="确认密码"
            >
              <template #prefix>
                <el-icon><i-ep-Unlock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <!-- 注册按钮 -->
          <el-form-item>
            <el-button
              class="btn-login"
              type="primary"
              :loading="buttonLoading"
              @click="submitForm(ruleFormRef)"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer">
      <el-link type="primary" @click="onSign">返回登录</el-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import md5 from "crypto-js/md5";
import highToLowMD5 from "@/utils/highToLowMD5";

import { UserRegister } from "@/api/auth";

const Emit = defineEmits(["onSign"]);

// 按钮加载状态
const buttonLoading = ref<boolean>(false);

// form
const ruleFormRef = ref<FormInstance>();

// 账号效验
const validateAccount = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入账号"));
  } else {
    callback();
  }
};
// 密码效验
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (ruleForm.checkpassword !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkpassword", () => null);
    }
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (value !== ruleForm.password) {
    callback(new Error("两次密码不一致！"));
  } else {
    callback();
  }
};

// 表单数据
const ruleForm = reactive<RegisterParams>({
  account: "",
  password: "",
  checkpassword: "",
});

const rules = reactive({
  account: [{ validator: validateAccount, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
  checkpassword: [{ validator: validatePass2, trigger: "blur" }],
});

// form
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      buttonLoading.value = true;
      UserRegister({
        account: ruleForm.account,
        password: highToLowMD5(md5(ruleForm.password).toString().toUpperCase()),
      })
        .then(() => {
          buttonLoading.value = false;
          ElMessage({
            showClose: true,
            message: "注册成功!",
            type: "success",
            duration: 3 * 1000,
          });
          Emit("onSign");
        })
        .catch(() => {
          buttonLoading.value = false;
        });
    } else {
      return false;
    }
  });
};

const onSign = () => {
  Emit("onSign");
};
</script>

<style lang="scss" scoped>
// 中部
.central-section {
  user-select: none;

  .title {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .form {
    .el-form-item {
      width: 70%;
      margin-left: auto;
      margin-right: auto;
      ::v-deep .el-form-item__content {
        margin: 0 !important;
      }
    }

    .btn-login {
      width: 100%;
    }
  }
}

// 底部
.footer {
  height: 50px;
  width: 70%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .el-link {
    user-select: none;
  }
}
</style>

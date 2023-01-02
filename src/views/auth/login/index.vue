<template>
  <div class="window">
    <div class="central-section">
      <div class="avatar">
        <el-avatar shape="square" size="large" :src="squareUrl" />
      </div>
      <div class="form">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item prop="account">
            <el-input v-model="ruleForm.account" type="text" placeholder="账号">
              <template #prefix>
                <el-icon><i-ep-User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
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
          <el-form-item>
            <el-button
              class="btn-login"
              type="primary"
              :loading="buttonLoading"
              @click="submitForm(ruleFormRef)"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer">
      <el-link type="primary" @click="onSign">注册账号</el-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ipcRenderer } from "electron";
import { onMounted, reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import md5 from "crypto-js/md5";
import highToLowMD5 from "@/utils/highToLowMD5";

import { UserLogin } from "@/api/auth";

import { userStore } from "@/plugins/store/modules/user";

const userStoreRecord = userStore();

const Emit = defineEmits(["onSign"]);

const squareUrl = ref<string>(
  "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
);

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
    callback();
  }
};
// 表单数据
const ruleForm = reactive<LoginParams>({
  account: "",
  password: "",
});

const rules = reactive({
  account: [{ validator: validateAccount, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
});

onMounted(() => {
  // 自动获取已经保存的账号密码
  ruleForm.account = userStoreRecord.getUserInfo.account;
  ruleForm.password = userStoreRecord.getUserInfo.password;
});

// form
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      buttonLoading.value = true;
      UserLogin({
        account: ruleForm.account,
        password: highToLowMD5(md5(ruleForm.password).toString().toUpperCase()),
      }).then((res) => {
        const user: LoginData = {
          account: ruleForm.account,
          // password: ruleForm.password,
          accessToken: res,
        };
        userStoreRecord
          .authLogin(user)
          .then(() => {
            buttonLoading.value = false;
            ipcRenderer.send("authLogin");
          })
          .catch(() => {
            buttonLoading.value = false;
          });
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
  .avatar {
    margin: 50px 0 40px;
    display: flex;
    justify-content: center;
    align-items: center;
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

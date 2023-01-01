<template>
  <div class="window">
    <div class="top">
      <div class="top_title">social</div>
      <div class="top_operation">
        <div class="tools">
          <el-icon><i-ep-Tools /></el-icon>
        </div>
        <div class="close-bold" @click="closeWindow">
          <el-icon><i-ep-CloseBold /></el-icon>
        </div>
      </div>
    </div>
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
            <el-input v-model="ruleForm.account" type="text" autocomplete="off">
              <template #prefix>
                <el-icon><i-ep-User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
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
              @click="submitForm(ruleFormRef)"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer">
      <el-link type="primary">注册账号</el-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ipcRenderer, IpcRendererEvent } from "electron";
import { onMounted, reactive, ref } from "vue";
import type { FormInstance } from "element-plus";

const squareUrl = ref<string>(
  "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
);

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
});

// form
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
      const user = {
        account: ruleForm.account,
        password: ruleForm.password,
        token: "123",
      };
      ipcRenderer.send("login");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

// 关闭窗口
const closeWindow = () => {
  ipcRenderer.send("close-window");
};
</script>

<style lang="scss" scoped>
// 顶部
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding-left: 10px;
  user-select: none;

  &_title {
    flex: 1;
    -webkit-app-region: drag;
    color: rgb(121, 121, 121);
    font-size: 14px;
  }

  &_operation {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      width: 30px;
      flex-grow: 1;
      cursor: pointer;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgb(121, 121, 121);
      font-size: 14px;

      &.tools:hover {
        background-color: rgb(227, 227, 227);
      }
      &.close-bold:hover {
        background-color: rgb(251, 115, 115);
        color: #fff;
      }
    }
  }
}

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

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
          @keydown.enter="submitForm(ruleFormRef)"
        >
          <el-form-item prop="account">
            <el-input
              v-model="ruleForm.account"
              type="text"
              maxlength="18"
              placeholder="账号"
            >
              <template #prefix>
                <el-icon><i-ep-User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item
            prop="password"
            :class="isValidateTextLong ? 'text-left-right-scroll' : ''"
          >
            <el-input
              v-model="ruleForm.password"
              type="password"
              maxlength="16"
              placeholder="密码"
              show-password
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

import { UserLogin } from "@/api/auth";

import { userStore } from "@/plugins/store/modules/user";

const userStoreRecord = userStore();

const Emit = defineEmits(["onSign"]);

const squareUrl = ref<string>(
  "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
);

// 按钮加载状态
const buttonLoading = ref<boolean>(false);

// 判断校验提示文字过长添加动画
const isValidateTextLong = ref<boolean>(false);

// 正则
const accountRegex = /^[a-zA-Z0-9]{5,12}$/;
const passRegex =
  /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*()_.]+)$)^[\w~!@#$%^&*()_.]{8,16}$/; // 密码校验

// form
const ruleFormRef = ref<FormInstance>();

// 账号校验
const validateAccount = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入账号"));
  } else if (!accountRegex.test(value)) {
    callback(new Error("账号必须5位到12位数字或者英文"));
  } else {
    callback();
  }
};
// 密码校验
const validatePass = (rule: any, value: any, callback: any) => {
  isValidateTextLong.value = false;
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (!passRegex.test(value)) {
    isValidateTextLong.value = true;
    callback(
      new Error(
        "密码应为字母，数字，特殊符号(~!@#$%^&*()_.)，两种及以上组合，8-16位字符串，如：123456@aa"
      )
    );
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
  account: [{ validator: validateAccount, trigger: "change" }],
  password: [{ validator: validatePass, trigger: "change" }],
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
        password: md5(ruleForm.password).toString().toUpperCase().slice(8, 24),
      })
        .then((res) => {
          buttonLoading.value = false;
          const user: LoginData = {
            account: ruleForm.account,
            // password: ruleForm.password,
            accessToken: res,
          };
          userStoreRecord.authLogin(user).then(() => {
            ipcRenderer.send("authLogin");
          });
        })
        .catch(() => {
          buttonLoading.value = false;
          ipcRenderer.send("authLogin");
        });
    } else {
      return false;
    }
  });
};

const onSign = () => {
  // 重置 password 校验
  ruleFormRef.value?.resetFields(["password"]);
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

    .el-avatar {
      :deep(img) {
        // 图片不可拖动
        -webkit-user-drag: none;
      }
    }
  }

  .form {
    .el-form {
      width: 70%;
      margin-left: auto;
      margin-right: auto;
      overflow: hidden; /*文字溢出隐藏*/

      .el-form-item {
        :deep(.el-form-item__content) {
          margin: 0 !important;
          white-space: nowrap; /*文字不折行*/
        }
        // 校验提示过长时添加动画
        &.text-left-right-scroll {
          :deep(.el-form-item__error) {
            animation: 20s linear infinite text-left-right-scroll; /*滚动动画*/
          }
        }
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

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
          <!-- 密码 -->
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
          <!-- 确认密码 -->
          <el-form-item
            prop="checkpassword"
            :class="isValidateTextLong ? 'text-left-right-scroll' : ''"
          >
            <el-input
              v-model="ruleForm.checkpassword"
              type="password"
              maxlength="16"
              placeholder="确认密码"
              show-password
            >
              <template #prefix>
                <el-icon><i-ep-Unlock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item prop="email">
            <el-input v-model="ruleForm.email" type="text" placeholder="邮箱">
              <template #prefix>
                <el-icon><i-ep-Message /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item prop="code" class="code">
            <el-input v-model="ruleForm.code" type="text" placeholder="验证码">
              <template #prefix>
                <el-icon><i-ep-Key /></el-icon>
              </template>
              <template #append>
                <el-button :disabled="isCodeing" @click="getCode">{{
                  codeText
                }}</el-button>
              </template>
            </el-input>
          </el-form-item>
          <!-- 注册按钮 -->
          <el-form-item>
            <el-button
              class="btn-register"
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

import { UserRegister, UserSendMessage } from "@/api/auth";

const Emit = defineEmits(["onSign"]);

// 按钮加载状态
const buttonLoading = ref<boolean>(false);

// 获取验证码按钮状态
const isCodeing = ref<boolean>(false);
// 获取验证码按钮提示
const codeText = ref<string>("获取验证码");

// 判断校验提示文字过长添加动画
const isValidateTextLong = ref<boolean>(false);

// form
const ruleFormRef = ref<FormInstance>();

// 正则
const accountRegex = /^[a-zA-Z0-9]{5,12}$/;
const passRegex =
  /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*()_.]+)$)^[\w~!@#$%^&*()_.]{8,16}$/; // 密码校验
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // 邮箱校验

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
    if (ruleForm.checkpassword !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkpassword", () => null);
    }
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
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
  } else if (value !== ruleForm.password) {
    callback(new Error("两次密码不一致！"));
  } else {
    callback();
  }
};
// 邮箱校验
const validateEmail = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入邮箱"));
  } else if (!emailRegex.test(value)) {
    callback(new Error("请输入正确的邮箱格式"));
  } else {
    callback();
  }
};

// 表单数据
const ruleForm = reactive<RegisterParams>({
  account: "",
  password: "",
  checkpassword: "",
  email: "",
  code: "",
});

const rules = reactive({
  account: [{ validator: validateAccount, trigger: "change" }],
  password: [{ validator: validatePass, trigger: "change" }],
  checkpassword: [{ validator: validatePass2, trigger: "change" }],
  email: [{ validator: validateEmail, trigger: "change" }],
  code: [{ required: true, message: "请输入验证码", trigger: "change" }],
});

// form
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      buttonLoading.value = true;
      UserRegister({
        account: ruleForm.account,
        password: md5(ruleForm.password).toString().toUpperCase().slice(8, 24),
        email: ruleForm.email,
        code: ruleForm.code,
      })
        .then(() => {
          buttonLoading.value = false;
          ElMessage({
            message: "注册成功!",
            type: "success",
            duration: 2 * 1000,
          });
          onSign();
        })
        .catch(() => {
          buttonLoading.value = false;
        });
    } else {
      return false;
    }
  });
};

// 获取验证码
const getCode = () => {
  // 判断邮箱是否为空
  if (ruleForm.email === "") {
    ruleFormRef.value?.validateField("email");
    return ElMessage({
      message: "邮箱为空！",
      type: "warning",
      duration: 2 * 1000,
    });
  }

  isCodeing.value = true;
  // 获取验证码请求
  UserSendMessage({ email: ruleForm.email }).then((res) => {
    console.log(res);

    ElMessage({
      message: "发送成功!",
      type: "success",
      duration: 2 * 1000,
    });
  });

  // 倒计时
  let countdown = 59;
  codeText.value = `${countdown--} 秒`;
  const Interval = setInterval(() => {
    if (countdown === -1) {
      isCodeing.value = false;
      codeText.value = "获取验证码";
      clearInterval(Interval);
    } else {
      codeText.value = `${countdown--} 秒`;
    }
  }, 1000);
};

const onSign = () => {
  ruleFormRef.value?.resetFields();
  Emit("onSign");
};
</script>

<style lang="scss" scoped>
// 中部
.central-section {
  user-select: none;

  .title {
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  // 表单
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

        // 验证码
        &.code {
          :deep(.el-form-item__content) {
            flex-wrap: nowrap;
          }

          // 输入框
          .el-input {
            :deep(.el-input__wrapper) {
              padding-right: 0;
            }

            :deep(.el-input__suffix) {
              display: none;
            }

            // 尾部按钮
            :deep(.el-input-group__append) {
              font-size: 12px;
              width: 120px;
              padding: 0;
              color: #000;

              .is-disabled {
                color: #909399;
              }
            }
          }
        }
      }
      // 按钮
      .btn-register {
        width: 100%;
      }
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

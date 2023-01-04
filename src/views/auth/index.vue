<template>
  <div class="window">
    <!-- 顶部 -->
    <div class="top">
      <div class="top_title">social</div>
      <div class="top_operation">
        <!-- <div class="tools">
          <el-icon><i-ep-Tools /></el-icon>
        </div> -->
        <!-- 退出按钮 -->
        <div class="close-bold" @click="closeWindow">
          <el-icon><i-ep-CloseBold /></el-icon>
        </div>
      </div>
    </div>
    <!-- 内容区 -->
    <!-- 第一次加载的时候显示 -->
    <Login v-if="firstOpen" @onSign="onSign"></Login>
    <div class="content" :class="isSign ? 'slide-in-left' : 'slide-in-right'">
      <Login @onSign="onSign"></Login>
      <Register @onSign="onSign"></Register>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ipcRenderer } from "electron";
import { ref } from "vue";

import Login from "./login/index.vue";
import Register from "./register/index.vue";

// 第一次加载的时候显示
const firstOpen = ref<boolean>(true);

// 登录/注册 开关
const isSign = ref<boolean>(true);

// 关闭窗口
const closeWindow = () => {
  ipcRenderer.send("close-window");
};

// 切换登录/注册
const onSign = () => {
  firstOpen.value = false;
  isSign.value = !isSign.value;
};
</script>

<style lang="scss" scoped>
// 窗口大小
.window {
  width: 300px;
  height: 450px;
  overflow: hidden;
}

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

// 内容区
.content {
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}
</style>

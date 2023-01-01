<template>
  <router-view />
</template>

<script setup lang="ts">
import { ipcRenderer } from "electron";
import { onMounted } from "vue";

import { userStore } from "@/plugins/store/modules/user";

const userStoreRecord = userStore();

onMounted(() => {
  // 设置监听退出程序
  ipcRenderer.on("window-close", () => {
    userStoreRecord.logout();
  });
});
</script>

<style lang="scss"></style>

<template>
  <router-view />
</template>

<script setup lang="ts">
import { ipcRenderer } from "electron";
import { onMounted } from "vue";
import useUserStore from "@/plugins/store/modules/user";

const userStore = useUserStore();

onMounted(() => {
  // 设置监听退出程序
  ipcRenderer.on("window-close", () => {
    userStore.logout();
  });
});
</script>

<style lang="scss"></style>

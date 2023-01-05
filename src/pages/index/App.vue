<template>
  <router-view />
</template>

<script setup lang="ts">
import { ipcRenderer } from "electron";
import { onBeforeMount, onMounted } from "vue";
import useUserStore from "@/plugins/store/modules/user";
import { AppPermission } from "./permission";

const userStore = useUserStore();

onBeforeMount(() => {
  AppPermission.getInstance();
});

onMounted(() => {
  // 设置监听退出程序
  ipcRenderer.on("window-close", () => {
    userStore.logout();
  });
});
</script>

<style lang="scss"></style>

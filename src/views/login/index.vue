<template>
  <div>
    <button @click="login">登录</button>
  </div>
</template>

<script setup lang="ts">
import { ipcRenderer, IpcRendererEvent } from "electron";
import { onMounted } from "vue";

onMounted(() => {
  ipcRenderer.send("get-user-info-main");
  ipcRenderer.on("get-user-info-render", (event: IpcRendererEvent, data) => {
    console.log(data);
  });
});

const login = () => {
  const data = {
    token: "123",
  };
  ipcRenderer.send("login", JSON.stringify(data));
};
</script>

<style scoped></style>

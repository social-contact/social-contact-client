<template>
  <div class="sessions">
    <div class="sessions-chat">列表</div>
    <div class="sessions-window">聊天窗</div>
    <!-- <div class="sessions-info">聊天信息</div> -->
  </div>
</template>

<script setup lang="ts">
import { Socket } from "socket.io-client";
import { inject, onMounted } from "vue";

const socket = inject("socket") as Socket;

// socket.on("connect", () => {
//   console.log("连接成功");
// });

onMounted(() => {
  socket.connect();
});
</script>

<style lang="scss" scoped>
$chat-left-div-width: 200px;
$chat-right-div-width: 250px;

.sessions {
  height: 100%;
  position: relative;
  display: flex;

  &-chat {
    width: $chat-left-div-width;
    margin: 0 15px 0 0;
    @include divInitialization();
  }

  &-window {
    flex: 1;
    @include divInitialization();
  }

  &-info {
    width: $chat-right-div-width;
    position: absolute;
  }
}
</style>

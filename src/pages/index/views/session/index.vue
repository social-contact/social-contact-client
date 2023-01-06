<template>
  <div class="sessions">
    <div class="sessions-chat">
      列表

      <button @click="sendMessage">发送</button>
    </div>
    <div class="sessions-window">聊天窗</div>
    <!-- <div class="sessions-info">聊天信息</div> -->
  </div>
</template>

<script setup lang="ts">
import io from "socket.io-client";
import { inject, onMounted } from "vue";

// const socket = inject("socket") as Socket;
const socket = io("http://localhost:9090");
console.log(socket);

// console.log(socket.io.opts);

// console.log(
//   (socket.io.opts.query = {
//     UID: 666,
//   })
// );

socket.on("connect", () => {
  console.log(`连接成功${socket.id}`);
});

onMounted(() => {
  socket.connect();
});

const sendMessage = () => {
  socket.emit("push_event", { loginUserNum: "6", content: "nbnb" });
};
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

<template>
  <div class="layout-head">
    <!-- logo -->
    <div class="logo">
      <img class="logo-img" :src="squareUrl" />
    </div>
    <!-- 搜索框 -->
    <div class="search">搜索</div>
    <!-- 用户信息 -->
    <div class="user">
      <div class="avatar">
        <img class="avatar-img" :src="squareUrl" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const squareUrl = ref<string>(
  "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
);
</script>

<style lang="scss" scoped>
$head-left-div-width: 100px;
$head-right-div-width: 250px;

.layout-head {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-shadow: $global-currency-box-shadow;
  padding: $global-currency-padding;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    width: $head-left-div-width;

    &-img {
      width: 40px;
      height: 40px;
    }
  }

  .search {
    flex: 1;
  }

  .user {
    width: $head-right-div-width;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .avatar {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;

      &-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
}
</style>

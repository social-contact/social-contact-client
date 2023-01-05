<template>
  <div class="layout-menu">
    <div class="menu">
      <div class="menu-item">会话</div>
      <div class="footer-menu">退出</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.layout-menu {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .menu {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @include divInitialization();
  }
}
</style>

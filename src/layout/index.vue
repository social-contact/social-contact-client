<template>
  <div class="layout">
    <div class="layout-head">
      <div class="layout-head__container">
        <LayoutHead></LayoutHead>
      </div>
    </div>
    <div class="layout-container">
      <div class="layout-container-menu">
        <LayoutMenu></LayoutMenu>
      </div>
      <div class="layout-container-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LayoutHead from "./components/LayoutHead/index.vue";
import LayoutMenu from "./components/LayoutMenu/index.vue";
</script>

<style lang="scss" scoped>
$layout-head-hight: 80px;

.layout {
  background-color: $global-currency-background-color;
  .layout-head {
    height: $layout-head-hight;
  }

  .layout-container {
    height: calc(100vh - $layout-head-hight);

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    &-menu {
      width: 100px;
      height: 100%;
      box-sizing: border-box;
      padding: $global-currency-padding;
      padding-right: 0;
    }

    &-content {
      flex: 1;
      height: 100%;
      padding: $global-currency-padding;
      box-sizing: border-box;
    }
  }
}
</style>

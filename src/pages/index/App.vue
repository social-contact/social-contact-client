<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { AppPermission } from "./permission";

onBeforeMount(() => {
  AppPermission.getInstance();
});
</script>

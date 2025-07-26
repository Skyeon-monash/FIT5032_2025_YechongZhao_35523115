<!-- src/App.vue -->
<template>
  <div class="d-flex flex-column min-vh-100">
    <AppHeader />

    <main class="flex-grow-1">
      <router-view />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<style>
/* 你可以在这里添加一些全局样式 */
body {
  /* 可以为老年用户设置一个更舒适的默认字体大小 */
  font-size: 18px;
}
</style>

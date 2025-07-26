<!-- src/components/AppHeader.vue -->
<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div class="container">
        <!-- 品牌 Logo -->
        <router-link class="navbar-brand" to="/">
          <!-- 图标 -->
          <i class="bi bi-heart-pulse-fill text-danger"></i>
          健康慈善
        </router-link>
        <!-- 响应式切换按钮 -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- 导航链接 -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">首页</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/news">健康资讯</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">关于我们</router-link>
            </li>
            <li class="nav-item">
              <router-link class="btn btn-primary ms-lg-3" to="/login">登录</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
// 这个 script setup 区域是空的，因为我们目前不需要任何 JavaScript 逻辑。
// 关于图标的提示：请确保已将 Bootstrap Icons 的链接添加到了 public/index.html 文件的 <head> 标签中。
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</script>

<style scoped>
/* 我们希望当前激活的链接有更明显的样式 */
.router-link-active,
.router-link-exact-active {
  font-weight: bold;
  color: #0d6efd !important;
}

/* 登录按钮在激活状态下不需要特殊样式 */
.btn.router-link-active,
.btn.router-link-exact-active {
  font-weight: normal;
  color: var(--bs-btn-color) !important;
}
</style>

<!-- src/views/HomeView.vue -->
<template>
  <div>
    <!-- 1. 英雄区 (Hero Section) -->
    <section class="bg-light p-5 text-center">
      <div class="container">
        <h1 class="display-4">关爱长者，智享健康</h1>
        <p class="lead text-muted">我们致力于运用科技，为老年朋友们提供便捷、全面的健康支持与社区服务。</p>
        <p>
          <router-link to="/news" class="btn btn-primary my-2 mx-1">浏览健康资讯</router-link>
          <router-link to="/about" class="btn btn-secondary my-2 mx-1">了解我们更多</router-link>
        </p>
      </div>
    </section>

    <!-- 2. 服务介绍区 -->
    <section class="py-5">
      <div class="container">
        <h2 class="text-center mb-4">我们的核心服务</h2>
        <div class="row text-center">

          <!-- 卡片 1: 健康资讯 -->
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <i class="bi bi-file-earmark-text display-3 text-primary mb-3"></i>
                <h5 class="card-title">权威健康资讯</h5>
                <p class="card-text">获取由专家撰写的、易于理解的健康文章、营养建议和疾病预防知识。</p>
              </div>
            </div>
          </div>

          <!-- 卡片 2: 社区活动 -->
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <i class="bi bi-people display-3 text-success mb-3"></i>
                <h5 class="card-title">线上社区活动</h5>
                <p class="card-text">参与我们组织的线上健康讲座、兴趣小组和互动活动，丰富您的生活。</p>
              </div>
            </div>
          </div>

          <!-- 卡片 3: 个人支持 -->
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <i class="bi bi-person-check display-3 text-info mb-3"></i>
                <h5 class="card-title">一对一支持</h5>
                <p class="card-text">注册后，您可以与我们的志愿者或专业人士联系，获得个性化的咨询与帮助。</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 3. 关于我们简介 -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h2>关于我们</h2>
            <p>健康慈善机构是一个非营利组织，我们的使命是消除老年人群体在获取健康资源时面临的障碍。通过这个现代化的网络平台，我们希望将关爱送达到每一位需要帮助的长者手中。</p>
          </div>
          <div class="col-md-6 text-center">
            <!-- 您可以在这里放一张温馨的图片 -->
            <i class="bi bi-universal-access-circle display-1 text-muted"></i>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// 目前这个页面不需要特定的JavaScript逻辑
</script>

<style scoped>
/* scoped 样式确保这些样式只作用于当前组件 */
.display-1,
.display-3,
.display-4 {
  font-weight: 300;
}

.card:hover {
  transform: translateY(-5px);
  transition: all 0.2s ease-in-out;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
</style>

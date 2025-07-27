<!-- src/views/NewsView.vue -->
<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-5">健康资讯中心</h1>
      <p class="lead text-muted">学习最新的健康知识，拥抱更美好的晚年生活。</p>
    </div>

    <div v-if="articles.length > 0" class="row">
      <!-- 循环渲染文章卡片 -->
      <div v-for="article in articles" :key="article.id" class="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch">
        <!-- 将文章数据通过 prop 传递给子组件 -->
        <ArticleCard :article="article" />
      </div>
    </div>

    <!-- 如果没有文章，显示提示信息 -->
    <div v-else class="text-center">
      <p>正在加载文章...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ArticleCard from '@/components/ArticleCard.vue'; // 引入卡片组件
import db from '../../db.json'; // 导入模拟数据

const articles = ref([]);

onMounted(() => {
  // 模拟异步 API 请求
  setTimeout(() => {
    articles.value = db.articles;
  }, 500); // 延迟500毫秒，模拟网络延迟
});
</script>

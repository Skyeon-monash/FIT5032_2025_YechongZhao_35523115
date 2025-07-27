<!-- src/components/ArticleCard.vue -->
<template>
  <!-- 使用 router-link 包裹整个卡片，使其可点击 -->
  <router-link :to="{ name: 'ArticleDetail', params: { id: article.id } }" class="card-link">
    <div class="card h-100 shadow-sm custom-card">
      <img :src="article.imageUrl" class="card-img-top" :alt="article.title">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ article.title }}</h5>
        <p class="card-text text-muted small">Author: {{ article.author }} | Date: {{ article.publishDate }}</p>
        <p class="card-text mt-2 flex-grow-1">{{ article.summary }}</p>
        <span class="btn btn-primary mt-auto align-self-start">View</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  article: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.card-link {
  text-decoration: none;
  color: inherit;
}

.custom-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.custom-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>

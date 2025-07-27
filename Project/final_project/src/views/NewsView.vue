<!-- src/views/NewsView.vue -->
<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="display-5">Health News Center</h1>
      <p class="lead text-muted">Learn the latest in health knowledge and embrace a better life in your later years.</p>
    </div>

    <div v-if="articles.length > 0" class="row">
      <!-- Render article cards in a loop -->
      <div v-for="article in articles" :key="article.id" class="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch">
        <!-- Pass article data to child component via props -->
        <ArticleCard :article="article" />
      </div>
    </div>

    <!-- Show message if there are no articles -->
    <div v-else class="text-center">
      <p>Loading articles...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ArticleCard from '@/components/ArticleCard.vue'; // Import card component
import db from '../../db.json'; // Import mock data

const articles = ref([]);

onMounted(() => {
  // Simulate async API request
  setTimeout(() => {
    articles.value = db.articles;
  }, 500); // Simulate 500ms network delay
});
</script>

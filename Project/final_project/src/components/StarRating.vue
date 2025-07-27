<template>
  <div class="star-rating" :class="{ 'is-interactive': interactive }"
    @mouseleave="interactive ? hoverRating = 0 : null">
    <i v-for="star in 5" :key="star" class="bi" :class="getStarClass(star)"
      @mouseover="interactive ? hoverRating = star : null" @click="interactive ? emitRating(star) : null"></i>
    <span v-if="showCount" class="rating-count ms-2 text-muted small">
      ({{ ratingCount }} reviews)
    </span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  interactive: { type: Boolean, default: false },
  showCount: { type: Boolean, default: false },
});

const emit = defineEmits(['update:rating']);

const hoverRating = ref(0);
const displayRating = computed(() => hoverRating.value || props.rating);

function getStarClass(star) {
  // Round rating to nearest 0.5 for half stars
  const roundedRating = Math.round(displayRating.value * 2) / 2;
  if (star <= roundedRating) return 'bi-star-fill text-warning';
  if (star - 0.5 === roundedRating) return 'bi-star-half text-warning';
  return 'bi-star text-warning';
}

function emitRating(star) {
  emit('update:rating', star);
}
</script>

<style scoped>
.star-rating.is-interactive i {
  cursor: pointer;
  transition: transform 0.1s ease-in-out;
}

.star-rating.is-interactive i:hover {
  transform: scale(1.2);
}
</style>

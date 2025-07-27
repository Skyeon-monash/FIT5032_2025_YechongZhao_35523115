<!-- src/components/TeamMemberCard.vue -->
<template>
  <div class="card text-center h-100 border-0 shadow-sm">
    <div class="card-body">
      <img :src="member.imageUrl" :alt="member.name" class="rounded-circle mb-3" width="120" height="120"
        style="object-fit: cover;">
      <h5 class="card-title">{{ member.name }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ member.role }}</h6>
      <p class="card-text small">{{ member.bio }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  member: {
    type: Object,
    required: true,
  }
});
</script>

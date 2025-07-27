<template>
  <div>
    <!-- 1. Page Header -->
    <section class="bg-primary text-white text-center p-5">
      <div class="container">
        <h1 class="display-4">About Us</h1>
        <p class="lead">We are the bridge between technology and care, dedicated to serving the elderly community.</p>
      </div>
    </section>

    <!-- 2. Mission and Vision -->
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6 mb-4">
            <h2 class="h3"><i class="bi bi-bullseye text-primary me-2"></i>Our Mission</h2>
            <p>Our mission is to leverage innovative web technologies to provide comprehensive and accessible health
              resources and community support for the elderly, bridging the digital divide and enhancing the quality of
              later life.</p>
          </div>
          <div class="col-md-6 mb-4">
            <h2 class="h3"><i class="bi bi-eye-fill text-primary me-2"></i>Our Vision</h2>
            <p>Our vision is to build a caring online community where knowledge is shared and mutual support thrives,
              enabling every elder to enjoy a warm, convenient, healthy, and dignified life through technology.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Our Story -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h2>Our Story</h2>
            <p>
              Our health charity started with a simple idea: no group should be left behind by technological progress.
              When our founder saw their elder struggling with smart devices, they were inspired to create a health
              platform tailored specifically for seniors—easy to use and accessible. After years of dedication, we’ve
              grown from a small team into a nonprofit organization serving thousands.
            </p>
          </div>
          <div class="col-lg-6 text-center">
            <i class="bi bi-book-half display-1 text-muted"></i>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Core Team -->
    <section class="py-5">
      <div class="container">
        <h2 class="text-center mb-5">Core Team</h2>
        <div class="row justify-content-center">
          <div v-for="member in teamMembers" :key="member.id" class="col-lg-4 col-md-6 mb-4">
            <!-- Using our custom card component -->
            <TeamMemberCard :member="member" />
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import TeamMemberCard from '@/components/TeamMemberCard.vue';

// Mock data for team members
const teamMembers = ref([
  {
    id: 1,
    name: 'Yechong Zhao',
    role: 'IT Engineer',
    bio: 'Big-tech intern, earning over ¥10K/month, aspiring to go pro',
    imageUrl: 'https://zyc-learning-1309954661.cos.ap-nanjing.myqcloud.com/machine-learning-pic/2025%2F07%2F40069736403593c9cb22304e33d7c6e7.jpeg',
  }
]);
</script>

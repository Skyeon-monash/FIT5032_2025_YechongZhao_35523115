<!-- src/views/AboutView.vue -->
<template>
  <div>
    <!-- 1. 页面顶部介绍 -->
    <section class="bg-primary text-white text-center p-5">
      <div class="container">
        <h1 class="display-4">关于我们</h1>
        <p class="lead">我们是科技与关爱的桥梁，致力于服务老年社群</p>
      </div>
    </section>

    <!-- 2. 使命与愿景 -->
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6 mb-4">
            <h2 class="h3"><i class="bi bi-bullseye text-primary me-2"></i>我们的使命</h2>
            <p>我们的使命是利用创新的网络技术，为老年人群体提供全面、易于获取的健康资源与社区支持，消除信息鸿沟，提升晚年生活质量。</p>
          </div>
          <div class="col-md-6 mb-4">
            <h2 class="h3"><i class="bi bi-eye-fill text-primary me-2"></i>我们的愿景</h2>
            <p>我们的愿景是创建一个充满关怀、知识共享、互助互爱的线上社区，让每一位长者都能感受到科技带来的温暖与便利，健康、快乐、有尊严地生活。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. 我们的故事 -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h2>我们的故事</h2>
            <p>
              健康慈善机构始于一个简单的想法：科技发展不应让任何一个群体掉队。我们的创始人在看到自己的长辈在使用智能设备时遇到困难后，决心创建一个专为老年人设计的、简单易用的健康平台。经过数年的努力，我们从一个小团队发展成为一个服务数千名用户的非营利组织。
            </p>
          </div>
          <div class="col-lg-6 text-center">
            <i class="bi bi-book-half display-1 text-muted"></i>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. 核心团队 -->
    <section class="py-5">
      <div class="container">
        <h2 class="text-center mb-5">核心团队</h2>
        <div class="row justify-content-center">
          <div v-for="member in teamMembers" :key="member.id" class="col-lg-4 col-md-6 mb-4">
            <!-- 使用我们创建的卡片组件 -->
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

// 团队成员的模拟数据
const teamMembers = ref([
  {
    id: 1,
    name: 'Yechong Zhao',
    role: 'IT Engineer',
    bio: '大厂实习生、月入过万待成为选手',
    // 使用占位图服务，您也可以替换成 assets 中的图片
    imageUrl: 'https://zyc-learning-1309954661.cos.ap-nanjing.myqcloud.com/machine-learning-pic/2025%2F07%2F40069736403593c9cb22304e33d7c6e7.jpeg',
  }
]);
</script>

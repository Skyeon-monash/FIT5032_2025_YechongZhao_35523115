<template>
  <div class="container py-5">
    <div v-if="article" class="row justify-content-center">
      <div class="col-lg-8">
        <!-- Article title and rating -->
        <h1 class="display-6 mb-3">{{ article.title }}</h1>
        <div class="d-flex align-items-center mb-3">
          <StarRating :rating="averageRating" />
          <span class="ms-3 text-muted">
            Average {{ averageRating.toFixed(2) }} / 5 (based on {{ article.ratingCount }} ratings)
          </span>
        </div>
        <p class="text-muted border-bottom pb-3 mb-4">
          Author: {{ article.author }} | Published on: {{ article.publishDate }}
        </p>

        <!-- Content and image -->
        <img :src="article.imageUrl" class="img-fluid rounded mb-4" :alt="article.title">

        <!-- Security: sanitized HTML content -->
        <div class="article-content" v-html="sanitizedContent"></div>

        <hr class="my-5">

        <!-- Rating interaction (clicking stars submits) -->
        <div v-if="authStore.isLoggedIn" class="card bg-light">
          <div class="card-body">
            <h5 class="card-title">Rate this article</h5>
            <div v-if="isSubmitting" class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Submitting...</span>
              </div>
            </div>
            <div v-else>
              <p v-if="myRating > 0" class="small text-muted">You have rated this article. You can update your rating.
              </p>
              <StarRating :rating="myRating" :interactive="true" @update:rating="submitRating" />
              <p v-if="ratingStatus" class="mt-2 small" :class="ratingStatus.isError ? 'text-danger' : 'text-success'">
                {{ ratingStatus.message }}
              </p>
            </div>
          </div>
        </div>
        <div v-else class="alert alert-info">
          Please <router-link to="/login">log in</router-link> to rate this article.
        </div>

        <!-- Back button -->
        <hr class="my-4">
        <router-link to="/news" class="btn btn-secondary">
          <i class="bi bi-arrow-left"></i> Back to News List
        </router-link>
      </div>
    </div>
    <div v-else class="text-center py-5">
      <h2>Loading article...</h2>
      <div class="spinner-border text-primary mt-3"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import DOMPurify from 'dompurify';
import { useAuthStore } from '@/stores/authStore';
import { doc, getDoc, getDocs, query, where, collection, runTransaction } from 'firebase/firestore';
import { db } from '@/firebase/config';
import StarRating from '@/components/StarRating.vue';
import articleData from '../../db.json';

const route = useRoute();
const authStore = useAuthStore();

const article = ref(null);
const myRating = ref(0);
const myRatingDocId = ref(null);
const isSubmitting = ref(false);
const ratingStatus = ref(null);

// Sanitized HTML content
const sanitizedContent = computed(() => {
  if (article.value && article.value.content) {
    return DOMPurify.sanitize(article.value.content);
  }
  return '';
});

const averageRating = computed(() => {
  if (!article.value || !article.value.ratingCount) return 0;
  return article.value.totalScore / article.value.ratingCount;
});

const fetchMyRating = async (articleId, userId) => {
  const q = query(collection(db, 'userRatings'),
    where('userId', '==', userId),
    where('articleId', '==', articleId)
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    myRating.value = doc.data().score;
    myRatingDocId.value = doc.id;
  }
};

const submitRating = async (newScore) => {
  if (!article.value || !authStore.isLoggedIn) return;

  isSubmitting.value = true;
  ratingStatus.value = null;

  const articleId = article.value.id;
  const userId = authStore.user.uid;

  try {
    await runTransaction(db, async (transaction) => {
      const articleRef = doc(db, 'articles', String(articleId));
      const userRatingRef = myRatingDocId.value
        ? doc(db, 'userRatings', myRatingDocId.value)
        : doc(collection(db, 'userRatings'));

      const articleDoc = await transaction.get(articleRef);

      const currentTotal = articleDoc.data()?.totalScore || 0;
      const currentCount = articleDoc.data()?.ratingCount || 0;
      const oldScore = myRating.value;

      let newTotalScore, newRatingCount;

      if (oldScore > 0) {
        newTotalScore = currentTotal - oldScore + newScore;
        newRatingCount = currentCount;
      } else {
        newTotalScore = currentTotal + newScore;
        newRatingCount = currentCount + 1;
      }

      transaction.set(articleRef, { totalScore: newTotalScore, ratingCount: newRatingCount }, { merge: true });
      transaction.set(userRatingRef, { userId, articleId, score: newScore });

      article.value.totalScore = newTotalScore;
      article.value.ratingCount = newRatingCount;
      myRating.value = newScore;

      if (!myRatingDocId.value) {
        myRatingDocId.value = userRatingRef.id;
      }
    });
    ratingStatus.value = { message: 'Thanks for your rating!', isError: false };
  } catch (e) {
    console.error("Rating transaction failed: ", e);
    ratingStatus.value = { message: 'Failed to submit rating. Please try again later.', isError: true };
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(async () => {
  const articleId = parseInt(route.params.id, 10);
  const localArticle = articleData.articles.find(a => a.id === articleId);
  if (!localArticle) { return; }

  const articleRef = doc(db, "articles", String(articleId));
  const articleSnap = await getDoc(articleRef);

  if (articleSnap.exists()) {
    article.value = { ...localArticle, ...articleSnap.data() };
  } else {
    article.value = localArticle;
  }

  if (authStore.isLoggedIn) {
    await fetchMyRating(articleId, authStore.user.uid);
  }
});
</script>

<style scoped>
.container {
  min-height: 80vh;
}

.article-content ::v-deep(p) {
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.article-content ::v-deep(ul),
.article-content ::v-deep(ol) {
  padding-left: 2rem;
}
</style>

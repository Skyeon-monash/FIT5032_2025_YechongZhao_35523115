<!-- src/components/BookList.vue -->
<template>
    <div class="book-list">
      <!-- 标题清晰地说明了查询内容，方便截图 -->
      <h2>Top 3 Technology Books by Rating</h2>
      
      <div v-if="loading">Loading...</div>
      <div v-else-if="books.length === 0">No matching books found.</div>
      
      <ul v-else>
        <!-- 遍历查询结果 -->
        <li v-for="book in books" :key="book.id">
          <span class="name">{{ book.name }}</span>
          <!-- 显示 Category 和 Rating 以证明查询的正确性 -->
          <span class="details">
              Category: {{ book.category }} | Rating: {{ book.rating }}
          </span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onUnmounted } from 'vue';
  import { db } from '../firebase/init.js'; 
  // 导入所有需要的查询函数
  import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
  
  export default {
    name: 'BookList',
    setup() {
      const books = ref([]);
      const loading = ref(true);
  
      const booksCollectionRef = collection(db, 'books');
  
      // where + orderBy + limit复合查询
      const q = query(
        booksCollectionRef,
        where('category', '==', 'Technology'), // WHERE: 过滤分类为 'Technology'
        orderBy('rating', 'desc'),             // ORDER BY: 按评分 'rating' 降序 'desc' 排列
        limit(3)                               // LIMIT: 只获取前 3 条结果
      );
  
      // 使用构建好的查询 q 来设置实时监听器
      const unsubscribe = onSnapshot(q, (snapshot) => {
        books.value = snapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data() 
        }));
        loading.value = false; // 数据加载完成
      }, (error) => {
          console.error("Error getting documents: ", error);
          loading.value = false; // 即使出错也要停止加载
      });
  
      onUnmounted(() => {
        unsubscribe();
      });
  
      return {
        books,
        loading
      };
    }
  };
  </script>
  
  <style scoped>
  .book-list {
    margin-top: 20px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    padding: 12px 16px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .name {
      font-weight: bold;
  }
  .details {
      color: #555;
      font-size: 0.9em;
  }
  </style>
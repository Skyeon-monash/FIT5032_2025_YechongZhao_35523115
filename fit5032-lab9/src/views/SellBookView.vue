<template>
    <div class="sell-book-container">
      <header class="page-header">
        <h1>云书店 (连接真实Firestore)</h1>
        <p>书籍列表从Firestore实时读取，购买操作通过云函数安全执行。</p>
      </header>
  
      <div class="product-list card">
        <div class="card-header">
          <h3>在线书库</h3>
        </div>
        <div class="card-body">
          <div v-if="isLoadingBooks" class="status-display loading">
            <div class="spinner"></div>
            <p>正在从Firestore加载书籍列表...</p>
          </div>
          <div v-else-if="fetchError" class="status-display error">
            <h4>❌ 加载失败</h4>
            <p>{{ fetchError }}</p>
          </div>
          <div v-else>
            <!-- 关键改动: 模板中绑定的字段更新 -->
            <div v-for="book in availableBooks" :key="book.id" class="book-card">
              <div class="book-info">
                <h3>{{ book.name }}</h3>
                <p class="meta">类别: {{ book.category }} | ISBN: {{ book.isbn }}</p>
                <p class="meta">评分: {{ book.rating }} / 5</p>
                <p class="stock">实时库存: <strong>{{ book.num }}</strong></p>
              </div>
              <div class="purchase-controls">
                <input type="number" v-model.number="book.quantityToBuy" min="1" :max="book.num" />
                <button @click="purchaseBook(book)" :disabled="isProcessing[book.id] || book.num === 0">
                  <span v-if="isProcessing[book.id]">处理中...</span>
                  <span v-else-if="book.num === 0">已售罄</span>
                  <span v-else>立即购买</span>
                </button>
              </div>
            </div>
            <p v-if="availableBooks.length === 0" class="status-display initial">
              数据库中暂无可售书籍。
            </p>
          </div>
        </div>
      </div>
  
      <!-- 交易结果展示 -->
      <div class="transaction-log card">
        <div class="card-header"><h3>交易日志</h3></div>
        <div class="card-body">
          <div v-if="lastTransaction" :class="['transaction-entry', lastTransaction.status]">
            <h4 v-if="lastTransaction.status === 'success'">✅ 交易成功</h4>
            <h4 v-if="lastTransaction.status === 'error'">❌ 交易失败</h4>
            <p><strong>消息:</strong> {{ lastTransaction.message }}</p>
          </div>
          <div v-else class="initial-message"><p>暂无交易记录。</p></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { db } from '@/firebase/init.js';
  import { collection, onSnapshot } from "firebase/firestore";
  
  // =======================【云函数URL配置】=======================
  // 关键改动: 更新为您的真实URL
  const sellBookFunctionUrl = "https://sell-book-api-vxydhdrant.cn-hongkong.fcapp.run";
  // ==========================================================
  
  const availableBooks = ref([]);
  const isLoadingBooks = ref(true);
  const fetchError = ref(null);
  const isProcessing = ref({});
  const lastTransaction = ref(null);
  
  onMounted(() => {
    fetchBooks();
  });
  
  const fetchBooks = () => {
    const booksColRef = collection(db, 'books');
    onSnapshot(booksColRef, (snapshot) => {
      availableBooks.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        quantityToBuy: 1
      }));
      isLoadingBooks.value = false;
    }, (error) => {
      console.error("从Firestore获取数据失败:", error);
      fetchError.value = "无法从数据库加载书籍列表，请检查Firebase配置和网络连接。";
      isLoadingBooks.value = false;
    });
  };
  
  const purchaseBook = async (book) => {
    isProcessing.value[book.id] = true;
    lastTransaction.value = null;
    try {
      const payload = {
        // book.id 对应 Firestore 中的文档ID
        book_id: book.id,
        quantity: book.quantityToBuy
      };
      const response = await axios.post(sellBookFunctionUrl, payload);
      lastTransaction.value = { status: 'success', message: response.data.message };
    } catch (error) {
      console.error("购买失败:", error);
      lastTransaction.value = {
        status: 'error',
        message: error.response?.data?.message || "请求失败，请稍后重试。"
      };
    } finally {
      isProcessing.value[book.id] = false;
    }
  };
  </script>
  
  <style scoped>
  /* 样式与之前版本类似，可以复用 */
  .sell-book-container { max-width: 800px; margin: 2rem auto; padding: 1.5rem; }
  .page-header { text-align: center; margin-bottom: 2.5rem; }
  .page-header h1 { font-size: 2.5rem; color: #34495e; }
  .card { background: #fff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); margin-bottom: 2rem; }
  .card-header { padding: 1rem 1.5rem; border-bottom: 1px solid #ebeef5; }
  .card-header h3 { margin: 0; font-size: 1.3rem; font-weight: 600; }
  .card-body { padding: 1.5rem; min-height: 150px; }
  .book-card { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; border-bottom: 1px solid #f2f2f2; }
  .book-card:last-child { border-bottom: none; }
  .book-info h3 { margin: 0 0 0.5rem 0; color: #2c3e50; }
  .book-info .meta { color: #7f8c8d; margin: 0.25rem 0; font-size: 0.9rem; }
  .book-info .stock { font-size: 0.9rem; margin-top: 0.5rem; }
  .purchase-controls { display: flex; align-items: center; gap: 1rem; }
  .purchase-controls input { width: 60px; padding: 8px; text-align: center; border: 1px solid #bdc3c7; border-radius: 4px; }
  .purchase-controls button { background-color: #e67e22; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; transition: background-color 0.3s; }
  .purchase-controls button:disabled { background-color: #cccccc; cursor: not-allowed; }
  .transaction-log .card-body { min-height: 80px; }
  .transaction-entry { padding: 1rem; border-radius: 5px; }
  .transaction-entry.success { background-color: #e8f5e9; border-left: 5px solid #4caf50; }
  .transaction-entry.error { background-color: #ffebee; border-left: 5px solid #f44336; }
  .status-display { text-align: center; color: #7f8c8d; padding: 2rem 0; }
  .spinner { border: 4px solid rgba(0, 0, 0, 0.1); border-left-color: #e67e22; border-radius: 50%; width: 36px; height: 36px; animation: spin 1s linear infinite; margin: 0 auto 1rem; }
  @keyframes spin { to { transform: rotate(360deg); } }
  </style>
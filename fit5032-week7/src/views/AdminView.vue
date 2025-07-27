<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header">
        <h2>管理员后台</h2>
        <p>欢迎, 管理员！这里是所有用户的列表。</p>
      </div>
      <div class="card-body">
        <div v-if="isLoading" class="text-center">
          <p>正在加载用户数据...</p>
        </div>
        <div v-else-if="users.length > 0" class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">用户邮箱</th>
                <th scope="col">当前角色</th>
                <th scope="col">用户 UID</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.email }}</td>
                <td>
                  <span 
                    class="badge" 
                    :class="user.role === 'admin' ? 'bg-success' : 'bg-secondary'"
                  >
                    {{ user.role }}
                  </span>
                </td>
                <td>{{ user.id }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <p>没有找到任何用户信息。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// 导入我们集中的 firebase 实例
import { db } from '../firebase'; 
import { collection, getDocs, query } from 'firebase/firestore';

const users = ref([]);
const isLoading = ref(true);

// 当组件挂载时，从 Firestore 获取所有用户数据
onMounted(async () => {
  try {
    const usersCollection = collection(db, 'users');
    const q = query(usersCollection); // 可以添加排序等，例如 orderBy('email')
    const querySnapshot = await getDocs(q);
    
    users.value = querySnapshot.docs.map(doc => ({
      id: doc.id, // 将文档 ID (即用户 UID) 也保存下来
      ...doc.data()
    }));

  } catch (error) {
    console.error("无法获取用户列表:", error);
    alert("获取用户列表失败！");
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.card-header {
  background-color: #f8f9fa;
}
</style>
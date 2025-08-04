<!-- src/views/AddBookView.vue -->
<template>
    <div>
        <h1>Add Book</h1>
        <form @submit.prevent="addBook">
            <div>
                <label for="isbn">ISBN:</label>
                <input type="text" v-model="isbn" id="isbn" required />
            </div>
            <div>
                <label for="name">Name:</label>
                <input type="text" v-model="name" id="name" required />
            </div>
            
            <!-- 新增: 分类输入框 -->
            <div>
                <label for="category">Category:</label>
                <input type="text" v-model="category" id="category" placeholder="e.g., Technology, Fiction" required />
            </div>

            <!-- 新增: 评分输入框 -->
            <div>
                <label for="rating">Rating (1-5):</label>
                <input type="number" v-model.number="rating" id="rating" min="1" max="5" required />
            </div>

            <button type="submit">Add Book</button>
        </form>

        <hr />
        
        <!-- BookList 组件会显示在这里 -->
        <BookList />
    </div>
</template>

<script>
import { ref } from 'vue';
import { db } from '../firebase/init.js';
import { collection, addDoc } from 'firebase/firestore';

// 导入 BookList 组件
import BookList from '../components/BookList.vue';

export default {
    name: 'AddBookView',
    components: {
        BookList
    },
    setup() {
        const isbn = ref('');
        const name = ref('');
        // 新增: 为新字段创建 ref
        const category = ref('');
        const rating = ref(null); // 初始值为 null

        const addBook = async () => {
            if (!isbn.value || !name.value || !category.value || rating.value === null) {
                alert('Please fill out all fields.');
                return;
            }
            
            try {
                // 在 addDoc 中包含所有字段
                await addDoc(collection(db, 'books'), {
                    isbn: isbn.value,
                    name: name.value,
                    category: category.value, // 保存分类
                    rating: rating.value      // 保存评分 (已通过 v-model.number 自动转为数字)
                });

                // 清空所有输入框
                isbn.value = '';
                name.value = '';
                category.value = '';
                rating.value = null;

            } catch (error) {
                console.error('Error adding book: ', error);
                alert('Failed to add book.');
            }
        };

        return {
            isbn,
            name,
            category, // 记得返回给模板
            rating,   // 记得返回给模板
            addBook
        };
    }
};
</script>

<style scoped>
/* 样式可以保持不变或按需调整 */
form {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
}
form div {
    margin-bottom: 10px;
}
label {
    display: inline-block;
    width: 100px; /* 调整标签宽度以对齐 */
}
hr {
    margin-top: 40px;
}
</style>
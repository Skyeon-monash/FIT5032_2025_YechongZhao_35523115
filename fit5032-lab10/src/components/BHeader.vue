<script setup>


</script>

<template>
  <div class="container">
    <header class="d-flex justify-content-between align-items-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home (Week 5)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/weather" class="nav-link" active-class="active">Weather</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/countbookapi" class="nav-link" active-class="active">Count Book API</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/getallbookapi" class="nav-link" active-class="active">Get All Book API</router-link>
        </li>
      </ul>

    </header>
  </div>
</template>

<style scoped>
/* 保留 Bootstrap 样式，可选地自定义导航样式 */
</style>

<template>
  <div class="home-wrapper">
    <!-- Navigation -->
    <header class="navbar">
      <div class="logo">HealthyAging</div>
      <nav class="nav-links">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Resources</a>
        <a href="#">Login</a>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <h1>Empowering Elderly Health</h1>
      <p>We support seniors with accessible health services, resources, and community support.</p>
      <button @click="goToServices">Explore Our Services</button>
    </section>

    <!-- Services Overview -->
    <section class="services">
      <h2>Our Key Services</h2>
      <div class="card-container">
        <div class="card">
          <h3>Free Health Checkups</h3>
          <p>Schedule in-person or online checkups with experienced practitioners.</p>
        </div>
        <div class="card">
          <h3>Education Resources</h3>
          <p>Access guides, videos, and articles tailored for elderly care and wellness.</p>
        </div>
        <div class="card">
          <h3>Community Events</h3>
          <p>Join local health workshops and social events near you.</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2025 HealthyAging Charity. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
function goToServices() {
  alert('Navigate to service section (can use router-link in full version)')
}
</script>

<style scoped>
/* Layout */
.home-wrapper {
  font-family: 'Segoe UI', sans-serif;
  color: #222;
  background: #f8fafc;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1976d2;
  color: white;
  padding: 1rem 2rem;
}
.logo {
  font-size: 1.4rem;
  font-weight: bold;
}
.nav-links a {
  margin-left: 1.5rem;
  color: white;
  text-decoration: none;
  font-weight: 500;
}
.nav-links a:hover {
  text-decoration: underline;
}

/* Hero */
.hero {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(to right, #e3f2fd, #ffffff);
}
.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #0d47a1;
}
.hero p {
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto 2rem;
}
.hero button {
  padding: 0.7rem 1.5rem;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}
.hero button:hover {
  background-color: #115293;
}

/* Services */
.services {
  padding: 3rem 2rem;
  background: #fff;
  text-align: center;
}
.services h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}
.card {
  background: #f1f8ff;
  border: 1px solid #cfe2f3;
  border-radius: 10px;
  padding: 1.5rem;
  width: 280px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}
.card h3 {
  color: #1565c0;
  margin-bottom: 0.5rem;
}

/* Footer */
.footer {
  background: #1976d2;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: 3rem;
  font-size: 0.9rem;
}
</style>

<template>
  <div>
    <!-- 1. Hero Section -->
    <!-- MODIFIED: added hero-section class and adjusted text color -->
    <section class="hero-section p-5 text-center text-white">
      <div class="container">
        <h1 class="display-4">Caring for Seniors, Empowering Health with Technology</h1>
        <p class="lead">We are committed to using technology to provide convenient and comprehensive health support and
          community services for older adults.</p>
        <p>
          <router-link to="/news" class="btn btn-primary my-2 mx-1">Browse Health Articles</router-link>
          <router-link to="/about" class="btn btn-secondary my-2 mx-1">Learn More About Us</router-link>
        </p>
      </div>
    </section>

    <!-- 2. Services Section -->
    <section class="py-5">
      <div class="container">
        <h2 class="text-center mb-4">Our Core Services</h2>
        <div class="row text-center">
          <!-- Cards -->
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <i class="bi bi-file-earmark-text display-3 text-primary mb-3"></i>
                <h5 class="card-title">Reliable Health Information</h5>
                <p class="card-text">Access expert-written, easy-to-understand articles on health, nutrition, and
                  disease prevention.</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <i class="bi bi-people display-3 text-success mb-3"></i>
                <h5 class="card-title">Online Community Events</h5>
                <p class="card-text">Join our online health talks, interest groups, and interactive activities to enrich
                  your daily life.</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <i class="bi bi-person-check display-3 text-info mb-3"></i>
                <h5 class="card-title">One-on-One Support</h5>
                <p class="card-text">After registration, connect with our volunteers or professionals for personalized
                  advice and assistance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. About Us Overview -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h2>About Us</h2>
            <p>We are a nonprofit health organization on a mission to eliminate barriers seniors face in accessing
              health resources. Through our modern online platform, we strive to deliver care and support to every elder
              in need.</p>
          </div>
          <!-- MODIFIED: replaced with image -->
          <div class="col-md-6 text-center">
            <img src="@/assets/images/home_footer.png" alt="Volunteers interacting with seniors"
              class="img-fluid rounded shadow w-50">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
.display-1,
.display-3,
.display-4 {
  font-weight: 300;
}

.card:hover {
  transform: translateY(-5px);
  transition: all 0.2s ease-in-out;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

/* ADDED: Hero section background style */
.hero-section {
  /* Overlay a semi-transparent black mask on background image for text readability */
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/images/home_back.png');
  background-size: cover;
  background-position: center;
}

/* Adjust hero subtitle color */
.hero-section .lead {
  color: rgba(255, 255, 255, 0.85) !important;
}
</style>

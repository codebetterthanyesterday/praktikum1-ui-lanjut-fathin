<script setup lang="ts">
import Navbar from '@/components/app/Navbar.vue'
import Breadcrumb from '@/components/app/Breadcrumb.vue'
</script>

<template>
  <div class="app-layout">
    <Navbar />
    <main class="main-content">
      <Breadcrumb />
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}
.main-content {
  flex: 1;
  padding: var(--space-4);
  max-width: var(--container-max);
  margin: 0 auto;
  width: 100%;
}

@media (min-width: 769px) {
  .main-content {
    padding: var(--space-8);
  }
}
</style>

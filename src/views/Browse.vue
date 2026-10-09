<script setup>
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
</script>

<template>
  <div class="browse-page">
    <div class="browse-header">
      <h1>{{ t('browse.title') }}</h1>
      <p>{{ t('browse.subtitle') }}</p>
    </div>
    <div class="browse-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.browse-page {
  animation: fadeIn 0.4s ease;
}

.browse-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.browse-header h1 {
  font-size: clamp(1.75rem, 6vw, 2.5rem);
  color: #1c1948;
  margin-bottom: 0.5rem;
}

.browse-header p {
  color: #666;
  font-size: 1rem;
}

@media (min-width: 769px) {
  .browse-header {
    margin-bottom: 2rem;
  }
  .browse-header p {
    font-size: 1.1rem;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

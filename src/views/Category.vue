<template>
  <div class="category-page">
    <h2 class="section-title">{{ t('category.title') }}</h2>
    <div class="category-grid">
      <div class="category-card" v-for="(cat, index) in categories" :key="index">
        <div class="cat-icon">
          <component :is="cat.icon" :size="48" :stroke-width="1.5" color="#6644ff" />
        </div>
        <h3>{{ cat.name }}</h3>
        <p>{{ cat.count }} {{ t('category.events') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Music, Laptop, Palette, Briefcase, Activity, Utensils } from 'lucide-vue-next'
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()

const categories = computed(() => [
  { name: t('category.categories.music'), icon: Music, count: 24 },
  { name: t('category.categories.tech'), icon: Laptop, count: 18 },
  { name: t('category.categories.art'), icon: Palette, count: 12 },
  { name: t('category.categories.business'), icon: Briefcase, count: 30 },
  { name: t('category.categories.health'), icon: Activity, count: 15 },
  { name: t('category.categories.food'), icon: Utensils, count: 22 },
])
</script>

<style scoped>
.section-title {
  font-size: clamp(1.4rem, 4.5vw, 1.8rem);
  color: #1c1948;
  margin-bottom: 1.5rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.category-card {
  background: white;
  padding: 1.25rem 0.75rem;
  border-radius: 16px;
  text-align: center;
  border: 1px solid #eee;
  transition: all 0.3s ease;
  cursor: pointer;
}

@media (hover: hover) {
  .category-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    border-color: #6644ff;
  }
}

.cat-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.category-card h3 {
  color: #1c1948;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.category-card p {
  color: #888;
  font-size: 0.9rem;
}

@media (min-width: 769px) {
  .section-title {
    margin-bottom: 2rem;
  }
  .category-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
  }
  .category-card {
    padding: 2rem;
  }
  .category-card h3 {
    font-size: 1.1rem;
  }
}
</style>

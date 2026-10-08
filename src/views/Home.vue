<script setup>
import { computed } from 'vue'
import { Search, Ticket, ChartColumn } from 'lucide-vue-next'
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()

const features = computed(() => [
  { icon: Search, title: t('home.discoverTitle'), desc: t('home.discoverDesc') },
  { icon: Ticket, title: t('home.ticketingTitle'), desc: t('home.ticketingDesc') },
  { icon: ChartColumn, title: t('home.hostTitle'), desc: t('home.hostDesc') },
])
</script>

<template>
  <div class="home-page">
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">{{ t('home.title') }}</h1>
        <p class="hero-subtitle">
          {{ t('home.subtitle') }}
        </p>
        <div class="hero-action">
          <router-link to="/browse/events" class="btn-primary">
            {{ t('home.discoverBtn') }}
          </router-link>
        </div>
      </div>
    </section>

    <section class="features-section">
      <div class="features-header">
        <h2>{{ t('home.featuresTitle') }}</h2>
        <p>{{ t('home.featuresDesc') }}</p>
      </div>

      <div class="features-grid">
        <div class="feature-card" v-for="feature in features" :key="feature.title">
          <div class="feature-icon">
            <component :is="feature.icon" :size="48" :stroke-width="1.5" />
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.desc }}</p>
        </div>
      </div>
    </section>

    <section class="sitemap-visual">
      <h2>{{ t('home.sitemapTitle') }}</h2>
      <p class="sitemap-desc">
        {{ t('home.sitemapDesc') }}
      </p>
      <ul class="tree">
        <li>
          <router-link to="/">Home</router-link>
          <ul>
            <li><router-link to="/about">About</router-link></li>
            <li>
              <router-link to="/browse">Browse</router-link>
              <ul>
                <li>
                  <router-link to="/browse/events">Event List</router-link>
                  <ul>
                    <li><router-link to="/browse/events/1">Event Detail (Example)</router-link></li>
                  </ul>
                </li>
                <li><router-link to="/browse/category">Category</router-link></li>
              </ul>
            </li>
            <li><router-link to="/contact">Contact</router-link></li>
            <li><router-link to="/dashboard">Organizer Dashboard</router-link></li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  animation: fadeIn 0.5s ease;
}

.hero-section {
  /* THE FOLD: tinggi hero dijaga agar CTA utama selalu berada di area Above the Fold */
  min-height: 65vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: var(--bg-light);
  border-radius: var(--space-6);
  border: 1px solid var(--border-color);
  padding: var(--space-12) var(--space-6);
  margin-bottom: var(--space-12);
}

.hero-content {
  max-width: 800px;
  /* Z-PATTERN: elemen bertingkat rata tengah (judul -> subjudul -> CTA) */
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* SCALE: ukuran font terbesar menetapkan Ranked Importance tertinggi */
.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  color: var(--text-main);
  line-height: 1.1;
  margin-bottom: var(--space-6);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-muted);
  margin-bottom: var(--space-8);
  max-width: 600px;
}

.btn-primary {
  display: inline-block;
  background-color: var(--primary);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  padding: var(--space-3) var(--space-8);
  border-radius: 12px;
  transition:
    transform 0.2s,
    background-color 0.2s;
  /* FOCAL POINT: bayangan berwarna membuat tombol lolos Squint Test */
  box-shadow: 0 8px 20px rgba(102, 68, 255, 0.3);
}

.btn-primary:hover {
  background-color: var(--primary-hover);
  transform: translateY(-2px);
}

.features-section {
  padding-bottom: var(--space-12);
}

.features-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.features-header h2 {
  font-size: 2.2rem;
  color: var(--text-main);
  margin-bottom: var(--space-2);
}

.features-header p {
  color: var(--text-muted);
  font-size: 1.1rem;
}

.features-grid {
  /* GRID SYSTEM: membagi fitur menjadi kolom rata sejajar */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-8);
}

.feature-card {
  background: var(--bg-light);
  padding: var(--space-8);
  border-radius: var(--space-4);
  border: 1px solid var(--border-color);
  text-align: center;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
}

.feature-icon {
  display: flex;
  justify-content: center;
  color: var(--primary);
  margin-bottom: var(--space-4);
}

.feature-card h3 {
  font-size: 1.3rem;
  color: var(--text-main);
  margin-bottom: var(--space-2);
}

.feature-card p {
  color: var(--text-muted);
  line-height: 1.6;
}

.sitemap-visual {
  padding: var(--space-12);
  background: var(--bg-gray);
  border-radius: var(--space-4);
  border: 1px solid var(--border-color);
}
.sitemap-visual h2 {
  color: var(--text-main);
  margin-bottom: var(--space-2);
}
.sitemap-desc {
  color: var(--text-muted);
  margin-bottom: var(--space-8);
}

.tree,
.tree ul {
  list-style: none;
  padding-left: 20px;
}
.tree li {
  margin: var(--space-3) 0;
  position: relative;
}
.tree li::before {
  content: '';
  position: absolute;
  top: -12px;
  left: -15px;
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  width: 10px;
  height: 30px;
}
.tree a {
  text-decoration: none;
  color: #444;
  font-weight: 500;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--space-2);
  display: inline-block;
  transition: all 0.2s;
  background: white;
  border: 1px solid var(--border-color);
}
.tree a:hover {
  border-color: #ccc;
  color: var(--text-main);
}
.tree .router-link-exact-active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

@media (max-width: 768px) {
  .hero-subtitle {
    font-size: 1.1rem;
  }
  .sitemap-visual {
    padding: var(--space-6);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

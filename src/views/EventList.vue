<script setup>
import { MapPin } from 'lucide-vue-next'
import { useLanguage } from '@/composables/useLanguage'
import { events } from '@/data/events'

const { locale, t, formatDate } = useLanguage()
</script>

<template>
  <div class="event-list-page">
    <div class="header-section">
      <h2 class="section-title">{{ t('events.title') }}</h2>
      <p class="section-desc">{{ t('events.desc') }}</p>
    </div>

    <!-- LAYOUT SYSTEM: ADAPTIVE GRID -->
    <div class="event-grid">
      <!-- VISUAL HIERARCHY: GROUPING & COMMON REGIONS -->
      <article class="event-card" v-for="event in events" :key="event.id">
        <div class="event-body">
          <div class="event-meta">
            <!-- LABEL CONTRAST: Recognition over Recall -->
            <span class="event-date">{{ formatDate(event.date) }}</span>
            <span class="event-category">{{ t(`events.categories.${event.cat}`) }}</span>
          </div>

          <h3 class="event-title">{{ event.title }}</h3>
          <p class="event-loc"><MapPin :size="16" class="inline-icon" /> {{ event.loc }}</p>
          <p class="event-desc">
            {{ event.desc[locale] }}
          </p>

          <div class="card-footer">
            <router-link :to="`/browse/events/${event.id}`" class="btn-link">
              {{ t('events.viewDetails') }} &rarr;
            </router-link>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.header-section {
  margin-bottom: var(--space-8);
}

.section-title {
  font-size: 2.2rem;
  color: var(--text-main);
  margin-bottom: var(--space-2);
}

.section-desc {
  color: var(--text-muted);
  font-size: 1.1rem;
}

/* ADAPTIVE GRID: otomatis menjadi 3, 2, atau 1 kolom mengikuti lebar layar tanpa media query.
   min(320px, 100%) mencegah kartu meluber di layar yang lebih sempit dari 320px. */
.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr));
  gap: var(--space-6);
}

/* COMMON REGIONS: border menyatukan isi kartu dan memisahkannya dari kartu lain */
.event-card {
  background: white;
  border-radius: var(--space-4);
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.06);
}

/* PROXIMITY: jarak antar elemen di dalam kartu lebih rapat daripada jarak antar kartu */
.event-body {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.event-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
}

.event-date {
  background: var(--primary-soft);
  color: var(--primary);
  padding: var(--space-1) var(--space-2);
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
}

.event-category {
  color: var(--text-muted);
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.event-title {
  color: var(--text-main);
  margin-bottom: var(--space-2);
  font-size: 1.4rem;
}

.event-loc {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.inline-icon {
  color: var(--primary);
  flex-shrink: 0;
}

.event-desc {
  color: var(--text-muted);
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: var(--space-6);
  flex-grow: 1;
}

.card-footer {
  border-top: 1px solid var(--border-color);
  padding-top: var(--space-4);
}

.btn-link {
  display: inline-block;
  color: var(--text-main);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}

.btn-link:hover {
  color: var(--primary);
}
</style>

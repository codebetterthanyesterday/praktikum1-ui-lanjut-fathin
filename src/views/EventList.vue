<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import EventCard from '@/components/event/EventCard.vue'
import SearchBar from '@/components/event/SearchBar.vue'
import CategoryFilter from '@/components/event/CategoryFilter.vue'
import { useLanguage } from '@/composables/useLanguage'
import { events } from '@/data/events'

const router = useRouter()
const { t } = useLanguage()

const searchQuery = ref('')
const selectedCategory = ref('all')

const categories = computed(() => [
  { value: 'all', label: t('events.all') },
  ...[...new Set(events.map((event) => event.cat))].map((cat) => ({
    value: cat,
    label: t(`events.categories.${cat}`),
  })),
])

const filteredEvents = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return events.filter((event) => {
    const matchSearch =
      event.title.toLowerCase().includes(query) || event.loc.toLowerCase().includes(query)
    const matchCat = selectedCategory.value === 'all' || event.cat === selectedCategory.value
    return matchSearch && matchCat
  })
})

const handleViewDetail = (id) => {
  router.push(`/browse/events/${id}`)
}
</script>

<template>
  <div class="event-list-page">
    <div class="header-section">
      <h2 class="section-title">{{ t('events.title') }}</h2>
      <p class="section-desc">{{ t('events.desc') }}</p>
    </div>

    <div class="filters-section">
      <SearchBar v-model="searchQuery" />
      <CategoryFilter :categories="categories" v-model="selectedCategory" />
    </div>

    <div v-if="filteredEvents.length > 0" class="event-grid">
      <EventCard
        v-for="event in filteredEvents"
        :key="event.id"
        :event="event"
        @view-detail="handleViewDetail"
      />
    </div>

    <div v-else class="empty-state" role="status">
      <p>{{ t('events.empty') }}</p>
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

.filters-section {
  margin-bottom: var(--space-6);
}

/* min() biar kartu ga overflow di hp kecil */
.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr));
  gap: var(--space-6);
}

.empty-state {
  text-align: center;
  padding: var(--space-12);
  color: var(--text-muted);
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  border-radius: var(--space-4);
}
</style>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { CalendarSearch, SearchX, RefreshCw } from 'lucide-vue-next'
import EventCard from '@/components/event/EventCard.vue'
import SearchBar from '@/components/event/SearchBar.vue'
import CategoryFilter from '@/components/event/CategoryFilter.vue'
import AppButton from '@/components/ui/AppButton.vue'
import SkeletonCard from '@/components/ui/SkeletonCard.vue'
import ErrorState from '@/components/ui/ErrorState.vue'
import { useEvents, categories as categoryKeys } from '@/composables/useEvents'
import { useLanguage } from '@/composables/useLanguage'

const router = useRouter()
const { t } = useLanguage()
const { activeEvents, isUserRegistered, loading, loaded, error, fetchEvents } = useEvents()

const showSkeleton = computed(
  () => (loading.value || (!loaded.value && !error.value)) && activeEvents.value.length === 0,
)

onMounted(fetchEvents)

const searchQuery = ref('')
const selectedCategory = ref('all')

const categories = computed(() => [
  { value: 'all', label: t('events.all') },
  ...categoryKeys.map((cat) => ({ value: cat, label: t(`events.categories.${cat}`) })),
])

const filteredEvents = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return activeEvents.value.filter((event) => {
    const matchSearch =
      event.title.toLowerCase().includes(query) || event.loc.toLowerCase().includes(query)
    const matchCat = selectedCategory.value === 'all' || event.cat === selectedCategory.value
    return matchSearch && matchCat
  })
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
}

const handleViewDetail = (id) => {
  router.push(`/browse/events/${id}`)
}
</script>

<template>
  <div class="event-list-page">
    <div class="header-section">
      <div class="header-top">
        <h2 class="section-title">{{ t('events.title') }}</h2>
        <button
          type="button"
          class="btn-refresh"
          :disabled="loading"
          :aria-busy="loading || undefined"
          @click="fetchEvents"
        >
          <RefreshCw :size="16" :class="{ spinning: loading }" />
          <span>{{ t('states.refresh') }}</span>
        </button>
      </div>
      <p class="section-desc">{{ t('events.desc') }}</p>
    </div>

    <div v-if="showSkeleton" class="event-grid" role="status" :aria-label="t('states.loading')">
      <SkeletonCard v-for="n in 6" :key="n" />
    </div>

    <ErrorState
      v-else-if="error"
      :title="t('states.errorTitle')"
      :error="error"
      :retrying="loading"
      @retry="fetchEvents"
    />

    <div v-else-if="activeEvents.length === 0" class="empty-state friendly">
      <CalendarSearch :size="56" :stroke-width="1.5" class="empty-icon" />
      <h3>{{ t('events.emptyTitle') }}</h3>
      <p>{{ t('events.emptyDesc') }}</p>
      <AppButton variant="primary" to="/dashboard">{{ t('events.emptyBtn') }} &rarr;</AppButton>
    </div>

    <template v-else>
      <div class="filters-section">
        <SearchBar v-model="searchQuery" />
        <CategoryFilter :categories="categories" v-model="selectedCategory" />
      </div>

      <div v-if="filteredEvents.length > 0" class="event-grid">
        <EventCard
          v-for="event in filteredEvents"
          :key="event.id"
          :event="event"
          :is-registered="isUserRegistered(event.id)"
          @view-detail="handleViewDetail"
        />
      </div>

      <div v-else class="empty-state" role="status">
        <SearchX :size="40" :stroke-width="1.5" class="empty-icon" />
        <p>{{ t('events.empty') }}</p>
        <AppButton variant="outline" @click="resetFilters">{{ t('events.resetFilter') }}</AppButton>
      </div>
    </template>
  </div>
</template>

<style scoped>
.header-section {
  margin-bottom: var(--space-6);
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-2);
}

.btn-refresh {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
  min-height: 44px;
  padding: 0 var(--space-4);
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 50px;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    color 0.2s,
    border-color 0.2s;
}
.btn-refresh:hover:not(:disabled) {
  color: var(--primary);
  border-color: var(--primary);
}
.btn-refresh:disabled {
  cursor: wait;
  opacity: 0.7;
}
.btn-refresh:focus-visible {
  outline: 3px solid var(--primary-soft);
  outline-offset: 2px;
}

.spinning {
  animation: spin 0.8s infinite linear;
}

.section-title {
  font-size: clamp(1.6rem, 5vw, 2.2rem);
  color: var(--text-main);
}

.section-desc {
  color: var(--text-muted);
  font-size: 1rem;
}

.filters-section {
  margin-bottom: var(--space-6);
}

.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr));
  gap: var(--space-4);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  text-align: center;
  padding: var(--space-8) var(--space-4);
  color: var(--text-muted);
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  border-radius: var(--space-4);
}

.empty-state.friendly {
  background: white;
  border-style: dashed;
  max-width: 600px;
  margin: var(--space-6) auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
}

.empty-state h3 {
  font-size: 1.4rem;
  color: var(--text-main);
}

.empty-state.friendly p {
  line-height: 1.6;
  margin-bottom: var(--space-3);
}

.empty-icon {
  color: var(--primary);
}

@media (min-width: 769px) {
  .header-section {
    margin-bottom: var(--space-8);
  }
  .section-desc {
    font-size: 1.1rem;
  }
  .event-grid {
    gap: var(--space-6);
  }
  .empty-state {
    padding: var(--space-12);
  }
}
</style>

<script setup>
import { MapPin } from 'lucide-vue-next'
import AppCard from '@/components/ui/AppCard.vue'
import { useLanguage } from '@/composables/useLanguage'

defineProps({
  event: {
    type: Object,
    required: true,
  },
})
defineEmits(['view-detail'])

const { locale, t, formatDate } = useLanguage()
</script>

<template>
  <AppCard as="article" class="event-card-wrapper">
    <div class="event-body">
      <div class="event-meta">
        <span class="event-date">{{ formatDate(event.date) }}</span>
        <span class="event-category">{{ t(`events.categories.${event.cat}`) }}</span>
      </div>

      <h3 class="event-title">{{ event.title }}</h3>
      <p class="event-loc"><MapPin :size="16" class="inline-icon" /> {{ event.loc }}</p>
      <p class="event-desc">{{ event.desc[locale] }}</p>

      <div class="card-footer">
        <button type="button" class="btn-link" @click="$emit('view-detail', event.id)">
          {{ t('events.viewDetails') }} &rarr;
        </button>
      </div>
    </div>
  </AppCard>
</template>

<style scoped>
.event-card-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

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
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-main);
  font-weight: 600;
  font-size: 1rem;
  padding: 0;
  transition: color 0.2s;
}

.btn-link:hover {
  color: var(--primary);
}
</style>

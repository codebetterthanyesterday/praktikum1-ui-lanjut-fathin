<script setup>
import { CircleCheck, Trash2, Eye, MapPin, Clock, Users } from 'lucide-vue-next'
import AppCard from '@/components/ui/AppCard.vue'
import { useLanguage } from '@/composables/useLanguage'

defineProps({
  event: {
    type: Object,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
})
defineEmits(['complete', 'delete'])

const { t, formatDateTime } = useLanguage()
</script>

<template>
  <AppCard
    as="article"
    :class="['organizer-event-card', { 'card-completed': isCompleted }]"
    :hoverable="false"
  >
    <div class="card-header">
      <span class="category-badge">{{ t(`events.categories.${event.cat}`) }}</span>
      <span :class="['status-badge', isCompleted ? 'status-completed' : 'status-active']">
        {{ isCompleted ? t('dashboard.statusCompleted') : t('dashboard.statusActive') }}
      </span>
    </div>
    <h3 :class="['event-title', { 'text-strike': isCompleted }]">{{ event.title }}</h3>
    <p class="event-meta">
      <span><Clock :size="15" /> {{ formatDateTime(event.date) }}</span>
      <span><MapPin :size="15" /> {{ event.loc }}</span>
      <span>
        <Users :size="15" />
        {{ t('manage.booked', { n: event.booked ?? 0, total: event.quota }) }}
      </span>
    </p>
    <p class="event-desc">{{ event.desc }}</p>
    <div v-if="isCompleted" class="completed-notice">{{ t('manage.completedNotice') }}</div>

    <div class="card-actions">
      <template v-if="!isCompleted">
        <RouterLink :to="`/browse/events/${event.id}`" class="btn-action btn-detail">
          <Eye :size="16" /> {{ t('manage.viewDetails') }}
        </RouterLink>
        <button type="button" class="btn-action btn-complete" @click="$emit('complete', event)">
          <CircleCheck :size="16" /> {{ t('manage.complete') }}
        </button>
        <button type="button" class="btn-action btn-delete" @click="$emit('delete', event)">
          <Trash2 :size="16" /> {{ t('manage.delete') }}
        </button>
      </template>
      <button v-else type="button" class="btn-action btn-delete" @click="$emit('delete', event)">
        <Trash2 :size="16" /> {{ t('manage.deleteArchive') }}
      </button>
    </div>
  </AppCard>
</template>

<style scoped>
.organizer-event-card {
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.category-badge,
.status-badge {
  padding: 4px 10px;
  border-radius: 50px;
  font-size: 0.8rem;
  white-space: nowrap;
}

.category-badge {
  background: var(--primary-soft);
  color: var(--primary);
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge {
  font-weight: 700;
}
.status-active {
  background: var(--success-soft);
  color: var(--success);
}
.status-completed {
  background: rgba(108, 117, 125, 0.15);
  color: #5c636a;
}

.event-title {
  font-size: 1.2rem;
  color: var(--text-main);
  margin-bottom: var(--space-2);
  overflow-wrap: anywhere;
}

.text-strike {
  text-decoration: line-through;
  color: #6c757d;
}

.card-completed {
  background-color: #fafbfc;
}

.event-meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: var(--space-3);
}
.event-meta span {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}
.event-meta svg {
  color: var(--primary);
  flex-shrink: 0;
}

.event-desc {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: var(--space-4);
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.completed-notice {
  background: #f1f3f5;
  color: #495057;
  padding: var(--space-3);
  border-radius: 6px;
  font-size: 0.85rem;
  margin-bottom: var(--space-4);
}

.card-actions {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-color);
}

.btn-action {
  flex: 1 1 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 44px;
  padding: var(--space-2) var(--space-3);
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background: white;
  color: var(--text-main);
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-action:focus-visible {
  outline: 3px solid var(--primary-soft);
  outline-offset: 2px;
}
.btn-detail:hover {
  color: var(--primary);
  border-color: var(--primary);
}
.btn-complete {
  color: var(--success);
  border-color: rgba(30, 142, 79, 0.35);
}
.btn-complete:hover {
  background: var(--success);
  color: white;
}
.btn-delete {
  color: var(--danger);
  border-color: rgba(230, 57, 70, 0.35);
}
.btn-delete:hover {
  background: var(--danger);
  color: white;
}

@media (min-width: 769px) {
  .organizer-event-card {
    padding: var(--space-6);
  }
}
</style>

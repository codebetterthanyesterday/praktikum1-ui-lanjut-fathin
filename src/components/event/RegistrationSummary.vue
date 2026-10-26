<script setup>
import { Clock, MapPin, Users } from 'lucide-vue-next'
import AppCard from '@/components/ui/AppCard.vue'
import { seatsLeft } from '@/composables/useEvents'
import { useLanguage } from '@/composables/useLanguage'

defineProps({
  event: {
    type: Object,
    required: true,
  },
})
defineEmits(['back'])

const { t, formatDateTime } = useLanguage()
</script>

<template>
  <div class="registration-summary-wrapper">
    <button type="button" class="btn-back" @click="$emit('back')">
      &larr; {{ t('register.back') }}
    </button>

    <AppCard class="summary-card" :hoverable="false">
      <span class="category-pill">{{ t(`events.categories.${event.cat}`) }}</span>
      <h3 class="event-name">{{ event.title }}</h3>

      <div class="summary-details">
        <div class="summary-item">
          <Clock :size="18" class="item-icon" />
          <div>
            <span class="item-label">{{ t('register.summaryDate') }}</span>
            <span class="item-value">{{ formatDateTime(event.date) }}</span>
          </div>
        </div>
        <div class="summary-item">
          <MapPin :size="18" class="item-icon" />
          <div>
            <span class="item-label">{{ t('register.summaryLoc') }}</span>
            <span class="item-value">{{ event.loc }}</span>
          </div>
        </div>
        <div class="summary-item">
          <Users :size="18" class="item-icon" />
          <div>
            <span class="item-label">{{ t('register.summarySeats') }}</span>
            <span class="item-value text-accent">
              {{ t('register.seatsValue', { n: seatsLeft(event) }) }}
            </span>
          </div>
        </div>
      </div>

      <p class="summary-desc">{{ event.desc }}</p>
    </AppCard>
  </div>
</template>

<style scoped>
.btn-back {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  background: none;
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0;
  margin-bottom: var(--space-2);
  transition: color 0.2s;
}
.btn-back:hover {
  color: var(--primary);
}

.summary-card {
  padding: var(--space-4);
}

.category-pill {
  display: inline-block;
  background: var(--primary-soft);
  color: var(--primary);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  border-radius: 50px;
  margin-bottom: var(--space-3);
}

.event-name {
  font-size: 1.25rem;
  color: var(--text-main);
  line-height: 1.3;
  margin-bottom: var(--space-4);
  overflow-wrap: anywhere;
}

.summary-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4) 0;
  border-top: 1px solid var(--border-color);
}

.summary-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.item-icon {
  color: var(--primary);
  flex-shrink: 0;
  margin-top: 2px;
}

.item-label,
.item-value {
  display: block;
}

.item-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.item-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-main);
  overflow-wrap: anywhere;
}

.text-accent {
  color: var(--success);
  font-weight: 700;
}

/* di hp deskripsinya disembunyiin, biar form langsung kelihatan */
.summary-desc {
  display: none;
}

@media (min-width: 901px) {
  .registration-summary-wrapper {
    position: sticky;
    top: calc(var(--navbar-height) + var(--space-6));
  }
  .btn-back {
    min-height: 0;
    margin-bottom: var(--space-4);
  }
  .summary-card {
    padding: var(--space-6);
  }
  .event-name {
    font-size: 1.4rem;
  }
  .summary-details {
    border-bottom: 1px solid var(--border-color);
    margin-bottom: var(--space-4);
  }
  .summary-desc {
    display: -webkit-box;
    -webkit-line-clamp: 8;
    line-clamp: 8;
    -webkit-box-orient: vertical;
    overflow: hidden;
    white-space: pre-line;
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.6;
  }
}
</style>

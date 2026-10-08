<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Calendar, MapPin, Users } from 'lucide-vue-next'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import { useLanguage } from '@/composables/useLanguage'
import { findEvent } from '@/data/events'

const route = useRoute()
const { t, formatDate } = useLanguage()

const event = computed(() => findEvent(route.params.id))

const agenda = [
  { time: '09:00 AM', key: 'item1' },
  { time: '10:00 AM', key: 'item2' },
  { time: '11:30 AM', key: 'item3' },
  { time: '01:00 PM', key: 'item4' },
  { time: '03:00 PM', key: 'item5' },
]
</script>

<template>
  <div class="event-detail-page">
    <button @click="$router.push('/browse/events')" class="btn-back">
      &larr; {{ t('eventDetail.back') }}
    </button>

    <template v-if="event">
      <div class="detail-header">
        <span class="event-tag">{{ t(`events.categories.${event.cat}`) }}</span>
        <h1>{{ event.title }}</h1>
        <div class="meta-info">
          <span class="meta-item">
            <Calendar :size="18" class="meta-icon" /> {{ formatDate(event.date, 'long') }}
          </span>
          <span class="meta-item"><MapPin :size="18" class="meta-icon" /> {{ event.loc }}</span>
          <span class="meta-item">
            <Users :size="18" class="meta-icon" /> {{ t('eventDetail.quota', { n: event.quota }) }}
          </span>
        </div>
      </div>

      <div class="detail-content grid-asymmetric">
        <div class="main-desc">
          <h2>{{ t('eventDetail.aboutTitle') }}</h2>
          <p>{{ t('eventDetail.aboutDesc1') }}</p>
          <p>{{ t('eventDetail.aboutDesc2') }}</p>

          <h2>{{ t('eventDetail.agendaTitle') }}</h2>
          <ul class="agenda-list">
            <li v-for="item in agenda" :key="item.key">
              <strong>{{ item.time }}</strong> - {{ t(`eventDetail.agenda.${item.key}`) }}
            </li>
          </ul>
        </div>

        <aside class="sidebar">
          <AppCard class="ticket-card sticky-pane" :hoverable="false">
            <h3>{{ t('eventDetail.registration') }}</h3>
            <p class="price">{{ t('eventDetail.free') }}</p>
            <p class="ticket-desc">{{ t('eventDetail.ticketDesc') }}</p>
            <AppButton variant="primary" class="btn-register">
              {{ t('eventDetail.registerBtn') }}
            </AppButton>
            <p class="spots">{{ t('eventDetail.spots', { n: event.seatsLeft }) }}</p>
          </AppCard>
        </aside>
      </div>
    </template>

    <div v-else class="detail-header not-found">
      <h1>{{ t('eventDetail.notFoundTitle') }}</h1>
      <p>{{ t('eventDetail.notFoundDesc') }}</p>
    </div>
  </div>
</template>

<style scoped>
.btn-back {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: var(--space-6);
  transition: color 0.2s;
}
.btn-back:hover {
  color: var(--primary);
}

.detail-header {
  background: var(--bg-light);
  border-radius: var(--space-4);
  border: 1px solid var(--border-color);
  padding: var(--space-12) var(--space-8);
  margin-bottom: var(--space-8);
}

.event-tag {
  display: inline-block;
  background: var(--primary-soft);
  color: var(--primary);
  padding: var(--space-1) var(--space-4);
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: var(--space-4);
}

.detail-header h1 {
  color: var(--text-main);
  font-size: 2.8rem;
  margin-bottom: var(--space-4);
  line-height: 1.2;
}

.meta-info {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3) var(--space-6);
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--text-muted);
  font-weight: 500;
  font-size: 1.05rem;
}

.meta-icon {
  color: var(--primary);
  flex-shrink: 0;
}

.not-found p {
  color: var(--text-muted);
}

.grid-asymmetric {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: var(--space-12);
}

.main-desc h2 {
  color: var(--text-main);
  margin-bottom: var(--space-4);
  font-size: 1.8rem;
  border-left: 4px solid var(--primary);
  padding-left: var(--space-2);
}

.main-desc p {
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: var(--space-6);
  font-size: 1.05rem;
}

.agenda-list {
  list-style: none;
  margin-bottom: var(--space-8);
}

.agenda-list li {
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-muted);
  font-size: 1.05rem;
}

.agenda-list strong {
  color: var(--text-main);
}

.ticket-card {
  padding: var(--space-8);
  text-align: center;
}

/* sidebar jangan dikasih align-items: start, nanti sticky-nya ga jalan */
.sticky-pane {
  position: sticky;
  top: calc(var(--navbar-height) + var(--space-6));
}

.ticket-card h3 {
  color: var(--text-main);
  font-size: 1.5rem;
  margin-bottom: var(--space-2);
}

.price {
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: var(--space-2);
}

.ticket-desc {
  color: var(--text-muted);
  margin-bottom: var(--space-6);
}

.btn-register {
  width: 100%;
}

.spots {
  margin-top: var(--space-4);
  color: var(--danger);
  font-weight: 600;
  font-size: 0.95rem;
}

@media (max-width: 900px) {
  .grid-asymmetric {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
  .sticky-pane {
    position: static;
  }
  .detail-header {
    padding: var(--space-8) var(--space-6);
  }
  .detail-header h1 {
    font-size: 2.2rem;
  }
}
</style>

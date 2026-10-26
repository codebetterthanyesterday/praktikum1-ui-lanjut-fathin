<script setup>
import { ref, computed } from 'vue'
import { Clock, MapPin, User, Ticket } from 'lucide-vue-next'
import AppCard from '@/components/ui/AppCard.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppModal from '@/components/ui/AppModal.vue'
import { useEvents } from '@/composables/useEvents'
import { useLanguage } from '@/composables/useLanguage'

const { myRegistrations, getEventById, cancelRegistration } = useEvents()
const { t, formatDateTime } = useLanguage()

// info acara selalu diambil dari data acara terbaru
const tickets = computed(() =>
  myRegistrations.value.map((reg) => ({ ...reg, event: getEventById(reg.eventId) })),
)

const ticketToCancel = ref(null)

const handleConfirmCancel = () => {
  if (ticketToCancel.value) cancelRegistration(ticketToCancel.value.eventId)
  ticketToCancel.value = null
}
</script>

<template>
  <div class="your-events-container">
    <header class="page-header">
      <h2 class="page-title">{{ t('yourEvents.title') }}</h2>
      <p class="page-desc">{{ t('yourEvents.desc') }}</p>
    </header>

    <div v-if="tickets.length === 0" class="empty-state">
      <Ticket :size="48" :stroke-width="1.5" class="empty-icon" />
      <span class="empty-badge">{{ t('yourEvents.emptyBadge') }}</span>
      <h3>{{ t('yourEvents.emptyTitle') }}</h3>
      <p>{{ t('yourEvents.emptyDesc') }}</p>
      <AppButton variant="primary" to="/browse/events">
        {{ t('yourEvents.emptyBtn') }} &rarr;
      </AppButton>
    </div>

    <div v-else class="tickets-grid">
      <AppCard
        v-for="item in tickets"
        :key="item.id"
        as="article"
        :class="['ticket-summary-card', { 'is-concluded': item.event.done }]"
        :hoverable="false"
      >
        <div class="card-top">
          <div class="top-left">
            <span class="category-tag">{{ t(`events.categories.${item.event.cat}`) }}</span>
            <span :class="['lifecycle-tag', item.event.done ? 'tag-concluded' : 'tag-upcoming']">
              {{ item.event.done ? t('yourEvents.concluded') : t('yourEvents.upcoming') }}
            </span>
          </div>
          <span class="booking-tag">#{{ item.bookingCode }}</span>
        </div>

        <h3 class="card-event-title">{{ item.event.title }}</h3>

        <dl class="card-meta">
          <div class="meta-row">
            <dt>
              <Clock :size="15" /><span class="sr-only">{{ t('yourEvents.date') }}</span>
            </dt>
            <dd>{{ formatDateTime(item.event.date) }}</dd>
          </div>
          <div class="meta-row">
            <dt>
              <MapPin :size="15" /><span class="sr-only">{{ t('yourEvents.location') }}</span>
            </dt>
            <dd>{{ item.event.loc }}</dd>
          </div>
          <div class="meta-row">
            <dt>
              <User :size="15" /><span class="sr-only">{{ t('yourEvents.attendee') }}</span>
            </dt>
            <dd>{{ item.fullName }}</dd>
          </div>
        </dl>

        <div class="card-bottom">
          <RouterLink :to="`/browse/your-events/${item.eventId}`" class="btn-view-ticket">
            {{ t('yourEvents.viewTicket') }} &rarr;
          </RouterLink>
          <button
            v-if="!item.event.done"
            type="button"
            class="btn-subtle-cancel"
            @click="ticketToCancel = { eventId: item.eventId, title: item.event.title }"
          >
            {{ t('yourEvents.cancel') }}
          </button>
          <span v-else class="tag-archived-label">{{ t('yourEvents.archived') }}</span>
        </div>
      </AppCard>
    </div>

    <AppModal
      :is-open="Boolean(ticketToCancel)"
      :title="t('yourEvents.cancelTitle')"
      :message="t('yourEvents.cancelMsg', { title: ticketToCancel?.title ?? '' })"
      :badge-text="t('register.discardBadge')"
      variant="danger"
      :cancel-text="t('yourEvents.cancelKeep')"
      :confirm-text="t('yourEvents.cancelYes')"
      @confirm="handleConfirmCancel"
      @close="ticketToCancel = null"
    />
  </div>
</template>

<style scoped>
.your-events-container {
  padding-bottom: var(--space-12);
}

.page-header {
  margin-bottom: var(--space-6);
}

.page-title {
  font-size: clamp(1.6rem, 5vw, 2.2rem);
  color: var(--text-main);
  margin-bottom: var(--space-2);
}

.page-desc {
  color: var(--text-muted);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-8) var(--space-4);
  color: var(--text-muted);
  background: white;
  border-radius: var(--space-4);
  border: 1px dashed var(--border-color);
  max-width: 600px;
  margin: var(--space-6) auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
}

.empty-icon {
  color: var(--primary);
  margin-bottom: var(--space-3);
}

.empty-badge {
  display: inline-block;
  background: var(--bg-light);
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 50px;
  border: 1px solid var(--border-color);
  margin-bottom: var(--space-4);
}

.empty-state h3 {
  font-size: 1.4rem;
  color: var(--text-main);
  margin-bottom: var(--space-2);
}

.empty-state p {
  line-height: 1.6;
  margin-bottom: var(--space-6);
}

.tickets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(340px, 100%), 1fr));
  gap: var(--space-4);
}

.ticket-summary-card {
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.is-concluded {
  background: #fafbfc;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.top-left {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.category-tag,
.lifecycle-tag,
.booking-tag {
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 700;
  white-space: nowrap;
}

.category-tag {
  background: #ede9fe;
  color: #6d28d9;
  font-size: 0.75rem;
  text-transform: uppercase;
}

.lifecycle-tag {
  font-size: 0.7rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.tag-upcoming {
  background: #dbeafe;
  color: #1d4ed8;
}
.tag-concluded {
  background: #f1f5f9;
  color: #64748b;
}

.booking-tag {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.85rem;
  color: var(--text-muted);
  background: var(--bg-light);
}

.card-event-title {
  font-size: 1.2rem;
  color: var(--text-main);
  margin-bottom: var(--space-3);
  line-height: 1.3;
  overflow-wrap: anywhere;
}

.card-meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
  flex-grow: 1;
}

.meta-row {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  font-size: 0.9rem;
  color: var(--text-muted);
}
.meta-row dt {
  color: var(--primary);
  flex-shrink: 0;
  padding-top: 2px;
}
.meta-row dd {
  overflow-wrap: anywhere;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
  padding-top: var(--space-2);
  border-top: 1px solid var(--border-color);
}

.btn-view-ticket,
.btn-subtle-cancel {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-weight: 600;
  text-decoration: none;
}

.btn-view-ticket {
  color: var(--primary);
  font-size: 0.95rem;
}
.btn-view-ticket:hover {
  text-decoration: underline;
}

.btn-subtle-cancel {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0 var(--space-2);
}
.btn-subtle-cancel:hover {
  color: var(--danger);
  text-decoration: underline;
}

.tag-archived-label {
  font-size: 0.8rem;
  color: #94a3b8;
  font-weight: 600;
  text-transform: uppercase;
}

@media (min-width: 769px) {
  .page-header {
    margin-bottom: var(--space-8);
  }
  .page-desc {
    font-size: 1.1rem;
  }
  .empty-state {
    padding: var(--space-12) var(--space-8);
  }
  .tickets-grid {
    gap: var(--space-6);
  }
  .ticket-summary-card {
    padding: var(--space-6);
  }
  .card-event-title {
    font-size: 1.3rem;
  }
  .card-bottom {
    padding-top: var(--space-4);
  }
  .btn-view-ticket,
  .btn-subtle-cancel {
    min-height: 0;
  }
}
</style>

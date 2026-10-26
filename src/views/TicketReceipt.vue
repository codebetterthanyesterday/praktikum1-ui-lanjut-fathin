<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Printer, TicketX } from 'lucide-vue-next'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppModal from '@/components/ui/AppModal.vue'
import { useEvents } from '@/composables/useEvents'
import { useLanguage } from '@/composables/useLanguage'

const route = useRoute()
const router = useRouter()
const { getEventById, getRegistrationByEventId, cancelRegistration } = useEvents()
const { t, formatDate, formatDateTime } = useLanguage()

const event = computed(() => getEventById(route.params.id))
// tiket cuma valid kalau acaranya masih ada di sistem
const ticket = computed(() => (event.value ? getRegistrationByEventId(event.value.id) : null))

// registeredAt itu timestamp UTC, diubah ke tanggal lokal dulu biar ga geser sehari
const registeredDate = computed(() =>
  ticket.value ? new Date(ticket.value.registeredAt).toLocaleDateString('en-CA') : '',
)

const isCancelModalOpen = ref(false)

const handleConfirmCancel = () => {
  cancelRegistration(event.value.id)
  isCancelModalOpen.value = false
  router.push('/browse/your-events')
}

const printTicket = () => window.print()
</script>

<template>
  <div class="ticket-receipt-page">
    <RouterLink to="/browse/your-events" class="btn-back no-print">
      &larr; {{ t('ticket.back') }}
    </RouterLink>

    <article v-if="ticket" class="ticket-receipt-card">
      <header class="receipt-header">
        <div class="header-status">
          <span :class="['status-badge', event.done ? 'badge-concluded' : 'badge-confirmed']">
            {{ event.done ? t('ticket.concluded') : t('ticket.confirmed') }}
          </span>
          <span class="ref-code">#{{ ticket.bookingCode }}</span>
        </div>
        <p class="receipt-meta-date">
          {{ t('ticket.registeredOn', { date: formatDate(registeredDate, 'short') }) }}
        </p>
      </header>

      <section class="receipt-section">
        <h4 class="section-heading">{{ t('ticket.eventDetails') }}</h4>
        <h2 class="event-title">{{ event.title }}</h2>
        <dl class="receipt-grid">
          <div class="grid-item">
            <dt class="item-label">{{ t('ticket.category') }}</dt>
            <dd class="item-value">{{ t(`events.categories.${event.cat}`) }}</dd>
          </div>
          <div class="grid-item">
            <dt class="item-label">{{ t('ticket.dateTime') }}</dt>
            <dd class="item-value">{{ formatDateTime(event.date) }}</dd>
          </div>
          <div class="grid-item">
            <dt class="item-label">{{ t('ticket.venue') }}</dt>
            <dd class="item-value">{{ event.loc }}</dd>
          </div>
        </dl>
      </section>

      <section class="receipt-section">
        <h4 class="section-heading">{{ t('ticket.attendeeInfo') }}</h4>
        <dl class="receipt-grid">
          <div class="grid-item">
            <dt class="item-label">{{ t('ticket.fullName') }}</dt>
            <dd class="item-value">{{ ticket.fullName }}</dd>
          </div>
          <div class="grid-item">
            <dt class="item-label">{{ t('ticket.email') }}</dt>
            <dd class="item-value">{{ ticket.email }}</dd>
          </div>
          <div class="grid-item">
            <dt class="item-label">{{ t('ticket.phone') }}</dt>
            <dd class="item-value">{{ ticket.phone }}</dd>
          </div>
          <div class="grid-item">
            <dt class="item-label">{{ t('ticket.dob') }}</dt>
            <dd class="item-value">{{ formatDate(ticket.dob, 'long') }}</dd>
          </div>
        </dl>
      </section>

      <section class="receipt-section">
        <h4 class="section-heading">{{ t('ticket.reason') }}</h4>
        <p class="reason-text">{{ ticket.reason }}</p>
      </section>

      <p v-if="!event.done" class="verify-note">{{ t('ticket.verify') }}</p>

      <footer class="receipt-footer no-print">
        <div class="footer-main">
          <AppButton variant="primary" class="footer-btn" to="/browse/your-events">
            {{ t('ticket.back') }}
          </AppButton>
          <AppButton variant="outline" class="footer-btn" @click="printTicket">
            <Printer :size="18" class="btn-icon" /> {{ t('ticket.print') }}
          </AppButton>
        </div>
        <button
          v-if="!event.done"
          type="button"
          class="btn-cancel-reg"
          @click="isCancelModalOpen = true"
        >
          {{ t('ticket.cancelBtn') }}
        </button>
        <span v-else class="concluded-notice">{{ t('ticket.concludedNotice') }}</span>
      </footer>
    </article>

    <AppCard v-else class="notice-card" :hoverable="false">
      <TicketX :size="48" :stroke-width="1.5" class="notice-icon" />
      <span class="notice-badge">{{ t('ticket.notFoundBadge') }}</span>
      <h2>{{ t('ticket.notFoundTitle') }}</h2>
      <p>{{ t('ticket.notFoundDesc') }}</p>
      <AppButton variant="primary" to="/browse/your-events">
        {{ t('ticket.notFoundBtn') }}
      </AppButton>
    </AppCard>

    <AppModal
      :is-open="isCancelModalOpen"
      :title="t('yourEvents.cancelTitle')"
      :message="t('yourEvents.cancelMsg', { title: event?.title ?? '' })"
      :badge-text="t('register.discardBadge')"
      variant="danger"
      :cancel-text="t('yourEvents.cancelKeep')"
      :confirm-text="t('yourEvents.cancelYes')"
      @confirm="handleConfirmCancel"
      @close="isCancelModalOpen = false"
    />
  </div>
</template>

<style scoped>
.ticket-receipt-page {
  max-width: 760px;
  margin: 0 auto;
  padding-bottom: var(--space-12);
}

.btn-back {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-muted);
  text-decoration: none;
  margin-bottom: var(--space-2);
  transition: color 0.2s;
}
.btn-back:hover {
  color: var(--primary);
}

.ticket-receipt-card {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: var(--space-4);
  padding: var(--space-5) var(--space-4);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.receipt-header {
  padding-bottom: var(--space-5);
  border-bottom: 2px dashed var(--border-color);
  margin-bottom: var(--space-5);
}

.header-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.status-badge {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 4px;
}
.badge-confirmed {
  background: #dcfce7;
  color: #15803d;
}
.badge-concluded {
  background: #f1f5f9;
  color: #64748b;
}

.ref-code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--primary);
}

.receipt-meta-date {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.receipt-section {
  margin-bottom: var(--space-5);
  padding-bottom: var(--space-5);
  border-bottom: 1px solid var(--border-color);
}

.section-heading {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: var(--space-3);
}

.event-title {
  font-size: 1.4rem;
  color: var(--text-main);
  margin-bottom: var(--space-4);
  overflow-wrap: anywhere;
}

.receipt-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
  gap: var(--space-4);
}

.grid-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.item-label {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.item-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-main);
  overflow-wrap: anywhere;
}

.reason-text {
  background: var(--bg-light);
  border-radius: 8px;
  padding: var(--space-4);
  color: var(--text-main);
  font-size: 0.95rem;
  line-height: 1.6;
  white-space: pre-line;
  overflow-wrap: anywhere;
}

.verify-note {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: var(--space-4);
}

.receipt-footer {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--space-3);
}

.footer-main {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer-btn {
  font-size: 0.95rem;
  padding: var(--space-3) var(--space-5);
}

.btn-icon {
  vertical-align: -3px;
}

.btn-cancel-reg {
  min-height: 44px;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
}
.btn-cancel-reg:hover {
  color: var(--danger);
}

.concluded-notice {
  font-size: 0.85rem;
  color: #64748b;
  font-style: italic;
  text-align: center;
}

.notice-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-8) var(--space-4);
  max-width: 500px;
  margin: var(--space-6) auto;
}
.notice-icon {
  color: var(--primary);
  margin-bottom: var(--space-3);
}
.notice-badge {
  display: inline-block;
  background: var(--bg-light);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 50px;
  margin-bottom: var(--space-3);
}
.notice-card h2 {
  font-size: 1.5rem;
  color: var(--text-main);
  margin-bottom: var(--space-2);
}
.notice-card p {
  color: var(--text-muted);
  margin-bottom: var(--space-6);
  font-size: 0.95rem;
}

@media (min-width: 769px) {
  .btn-back {
    min-height: 0;
    margin-bottom: var(--space-6);
  }
  .ticket-receipt-card {
    padding: var(--space-8);
  }
  .receipt-header,
  .receipt-section {
    padding-bottom: var(--space-6);
    margin-bottom: var(--space-6);
  }
  .event-title {
    font-size: 1.8rem;
  }
  .receipt-footer {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding-top: var(--space-2);
  }
  .footer-main {
    flex-direction: row;
  }
  .footer-btn {
    padding: var(--space-2) var(--space-5);
  }
  .btn-cancel-reg {
    min-height: 0;
  }
  .notice-card {
    padding: var(--space-12) var(--space-8);
  }
}

@media print {
  .ticket-receipt-card {
    box-shadow: none;
    border-color: #999;
  }
}
</style>

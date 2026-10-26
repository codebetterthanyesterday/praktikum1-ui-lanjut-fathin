<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Calendar, MapPin, Users, CalendarX2, CircleCheck } from 'lucide-vue-next'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import { useEvents, seatsLeft } from '@/composables/useEvents'
import { useLanguage } from '@/composables/useLanguage'

const route = useRoute()
const router = useRouter()
const { t, formatDateTime } = useLanguage()
const { getEventById, isUserRegistered } = useEvents()

const event = computed(() => getEventById(route.params.id))
const isRegistered = computed(() => (event.value ? isUserRegistered(event.value.id) : false))
const seats = computed(() => (event.value ? seatsLeft(event.value) : 0))

// urutan prioritas: selesai > sudah daftar > kuota habis > bisa daftar
const status = computed(() => {
  if (!event.value) return null
  if (event.value.done) return 'ended'
  if (isRegistered.value) return 'registered'
  if (seats.value <= 0) return 'soldOut'
  return 'open'
})

const statusTag = {
  ended: { cls: 'status-ended', key: 'eventDetail.statusEnded' },
  registered: { cls: 'status-registered', key: 'eventDetail.statusRegistered' },
  soldOut: { cls: 'status-soldout', key: 'eventDetail.statusSoldOut' },
  open: { cls: 'status-live', key: 'eventDetail.statusLive' },
}

const ticketDesc = {
  ended: 'eventDetail.ticketDescEnded',
  registered: 'eventDetail.ticketDescRegistered',
  soldOut: 'eventDetail.ticketDescSoldOut',
  open: 'eventDetail.ticketDesc',
}

const handleRegisterClick = () => {
  router.push(`/browse/events/${event.value.id}/register`)
}
</script>

<template>
  <div :class="['event-detail-page', { 'has-bar': event }]">
    <button @click="router.push('/browse/events')" class="btn-back">
      &larr; {{ t('eventDetail.back') }}
    </button>

    <template v-if="event">
      <div class="detail-header">
        <div class="header-tags">
          <span class="event-tag">{{ t(`events.categories.${event.cat}`) }}</span>
          <span :class="['status-tag', statusTag[status].cls]">{{ t(statusTag[status].key) }}</span>
        </div>
        <h1>{{ event.title }}</h1>
        <div class="meta-info">
          <span class="meta-item">
            <Calendar :size="18" class="meta-icon" /> {{ formatDateTime(event.date) }}
          </span>
          <span class="meta-item"><MapPin :size="18" class="meta-icon" /> {{ event.loc }}</span>
          <span class="meta-item">
            <Users :size="18" class="meta-icon" />
            {{ t('eventDetail.seatsLeft', { n: seats, total: event.quota }) }}
          </span>
        </div>
      </div>

      <div class="detail-content grid-asymmetric">
        <div class="main-desc">
          <h2>{{ t('eventDetail.aboutTitle') }}</h2>
          <p class="description-text">{{ event.desc }}</p>
        </div>

        <aside class="sidebar">
          <AppCard class="ticket-card sticky-pane" :hoverable="false">
            <h3>{{ t('eventDetail.registration') }}</h3>
            <p class="price">{{ t('eventDetail.free') }}</p>
            <p :class="['ticket-desc', `desc-${status}`]">{{ t(ticketDesc[status]) }}</p>

            <div class="action-buttons">
              <AppButton
                v-if="status === 'ended'"
                variant="secondary"
                class="btn-register btn-disabled"
                disabled
              >
                {{ t('eventDetail.closedBtn') }}
              </AppButton>

              <div v-else-if="status === 'registered'" class="registered-action-group">
                <AppButton variant="secondary" class="btn-register btn-registered" disabled>
                  <CircleCheck :size="18" class="btn-icon" /> {{ t('eventDetail.alreadyBtn') }}
                </AppButton>
                <RouterLink :to="`/browse/your-events/${event.id}`" class="view-receipt-link">
                  {{ t('eventDetail.viewReceipt') }} &rarr;
                </RouterLink>
              </div>

              <AppButton
                v-else-if="status === 'soldOut'"
                variant="secondary"
                class="btn-register btn-disabled"
                disabled
              >
                {{ t('eventDetail.soldOutBtn') }}
              </AppButton>

              <AppButton v-else variant="primary" class="btn-register" @click="handleRegisterClick">
                {{ t('eventDetail.registerBtn') }}
              </AppButton>
            </div>

            <p :class="['spots', `spots-${status}`]" role="status">
              {{
                status === 'open' ? t('eventDetail.spots', { n: seats }) : t(statusTag[status].key)
              }}
            </p>
          </AppCard>
        </aside>
      </div>
    </template>

    <AppCard v-else class="not-found-card" :hoverable="false">
      <CalendarX2 :size="48" :stroke-width="1.5" class="not-found-icon" />
      <h2>{{ t('eventDetail.notFoundTitle') }}</h2>
      <p>{{ t('eventDetail.notFoundDesc') }}</p>
      <AppButton variant="primary" to="/browse/events">{{
        t('eventDetail.notFoundBtn')
      }}</AppButton>
    </AppCard>
  </div>
</template>

<style scoped>
/* ruang kosong di bawah buat bar daftar yang nempel */
.event-detail-page.has-bar {
  padding-bottom: 140px;
}

.btn-back {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: var(--space-2);
  transition: color 0.2s;
}
.btn-back:hover {
  color: var(--primary);
}

.detail-header {
  background: var(--bg-light);
  border-radius: var(--space-4);
  border: 1px solid var(--border-color);
  padding: var(--space-6) var(--space-4);
  margin-bottom: var(--space-8);
}

.header-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.event-tag,
.status-tag {
  display: inline-block;
  background: var(--primary-soft);
  color: var(--primary);
  padding: var(--space-1) var(--space-4);
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
}

.status-live {
  background: var(--success-soft);
  color: var(--success);
}
.status-registered {
  background: #dbeafe;
  color: #1d4ed8;
}
.status-soldout {
  background: #fee2e2;
  color: #b91c1c;
}
.status-ended {
  background: rgba(108, 117, 125, 0.15);
  color: #5c636a;
}

.detail-header h1 {
  color: var(--text-main);
  font-size: clamp(1.75rem, 6vw, 2.8rem);
  margin-bottom: var(--space-4);
  line-height: 1.2;
  overflow-wrap: anywhere;
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
  font-size: 1rem;
}

.meta-icon {
  color: var(--primary);
  flex-shrink: 0;
}

.not-found-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  text-align: center;
  padding: var(--space-8) var(--space-4);
}
.not-found-icon {
  color: var(--primary);
}
.not-found-card p {
  color: var(--text-muted);
  max-width: 460px;
  margin-bottom: var(--space-3);
}

.grid-asymmetric {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-8);
}

.main-desc h2 {
  color: var(--text-main);
  margin-bottom: var(--space-4);
  font-size: clamp(1.4rem, 4.5vw, 1.8rem);
  border-left: 4px solid var(--primary);
  padding-left: var(--space-2);
}

.description-text {
  white-space: pre-line;
  overflow-wrap: anywhere;
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: var(--space-6);
  font-size: 1rem;
}

/* di hp kartu tiket jadi bar di bawah layar, jadi tombol daftar selalu kelihatan */
.sidebar {
  position: fixed;
  left: var(--space-4);
  right: var(--space-4);
  bottom: calc(var(--space-4) + env(safe-area-inset-bottom));
  max-width: 520px;
  margin: 0 auto;
  z-index: 50;
  filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.18));
}

.ticket-card {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: baseline;
  gap: var(--space-2) var(--space-3);
  padding: var(--space-3) var(--space-4);
}

.ticket-card h3,
.ticket-desc {
  display: none;
}

.ticket-card h3 {
  color: var(--text-main);
  font-size: 1.5rem;
  margin-bottom: var(--space-2);
}

.price {
  grid-area: 1 / 1;
  font-size: 1.5rem;
  line-height: 1.2;
  font-weight: 800;
  color: var(--primary);
}

.ticket-desc {
  color: var(--text-muted);
  margin-bottom: var(--space-6);
}

.action-buttons {
  grid-area: 2 / 1 / 3 / -1;
}

.btn-register {
  width: 100%;
}

/* di hp yang muncul cuma link ke tiket, tombol "sudah terdaftar"-nya disembunyiin biar bar ga tinggi */
.registered-action-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.registered-action-group .btn-registered {
  display: none;
}

.view-receipt-link {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  border-radius: 12px;
  border: 1px solid var(--primary);
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
}
.view-receipt-link:hover {
  background: var(--primary-soft);
}

.btn-icon {
  vertical-align: -3px;
}

.btn-disabled,
.btn-registered {
  cursor: not-allowed;
  box-shadow: none;
}
.btn-disabled {
  opacity: 0.65;
}
.btn-registered {
  background: #f1f5f9;
  color: #1e293b;
  border: 1px solid var(--border-color);
}

.spots {
  grid-area: 1 / 2;
  text-align: right;
  color: var(--success);
  font-weight: 600;
  font-size: 0.85rem;
}
.spots-registered {
  color: #1d4ed8;
}
.spots-soldOut {
  color: #b91c1c;
}
.spots-ended {
  color: #6c757d;
}

@media (min-width: 901px) {
  .event-detail-page.has-bar {
    padding-bottom: 0;
  }
  .btn-back {
    display: inline-block;
    min-height: 0;
    margin-bottom: var(--space-6);
  }
  .detail-header {
    padding: var(--space-12) var(--space-8);
  }
  .not-found-card {
    padding: var(--space-12);
  }
  .meta-item,
  .description-text {
    font-size: 1.05rem;
  }
  .grid-asymmetric {
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
    gap: var(--space-12);
  }

  .sidebar {
    position: static;
    max-width: none;
    filter: none;
  }
  .ticket-card {
    display: block;
    padding: var(--space-8);
    text-align: center;
  }
  .ticket-card h3,
  .ticket-desc {
    display: block;
  }
  .desc-registered {
    color: #15803d;
    font-weight: 500;
  }
  .desc-soldOut {
    color: #b91c1c;
    font-weight: 500;
  }
  .registered-action-group .btn-registered {
    display: block;
  }
  .view-receipt-link {
    min-height: 0;
    border: none;
    font-size: 0.9rem;
  }
  .view-receipt-link:hover {
    background: none;
    text-decoration: underline;
  }
  /* sidebar jangan dikasih align-items: start, nanti sticky-nya ga jalan */
  .sticky-pane {
    position: sticky;
    top: calc(var(--navbar-height) + var(--space-6));
  }
  .price {
    font-size: 2.8rem;
    line-height: inherit;
    margin-bottom: var(--space-2);
  }
  .spots {
    margin-top: var(--space-4);
    text-align: center;
    font-size: 0.95rem;
  }
  .spots:not(.spots-open) {
    display: none;
  }
}
</style>

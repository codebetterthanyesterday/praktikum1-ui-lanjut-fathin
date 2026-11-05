<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppModal from '@/components/ui/AppModal.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import ErrorState from '@/components/ui/ErrorState.vue'
import RegistrationSummary from '@/components/event/RegistrationSummary.vue'
import RegistrationForm from '@/components/event/RegistrationForm.vue'
import RegistrationReceipt from '@/components/event/RegistrationReceipt.vue'
import { useEvents, seatsLeft } from '@/composables/useEvents'
import { useLanguage } from '@/composables/useLanguage'

const route = useRoute()
const router = useRouter()
const { getEventById, isUserRegistered, fetchEventById } = useEvents()
const { t } = useLanguage()

const event = computed(() => getEventById(route.params.id))
const isRegistered = computed(() => (event.value ? isUserRegistered(event.value.id) : false))

const pageLoading = ref(false)
const pageError = ref(null)

const loadEvent = async () => {
  pageError.value = null
  if (event.value) return
  pageLoading.value = true
  try {
    await fetchEventById(route.params.id)
  } catch (err) {
    if (err.key !== 'api.notFound') pageError.value = err
  } finally {
    pageLoading.value = false
  }
}

watch(() => route.params.id, loadEvent, { immediate: true })

const holdForm = ref(false)

const isSuccessModalOpen = ref(false)
const confirmedData = ref(null)

const notice = computed(() => {
  const ev = event.value
  const detail = ev ? `/browse/events/${ev.id}` : '/browse/events'
  if (!ev) {
    return {
      key: 'notFound',
      actions: [{ label: t('eventDetail.notFoundBtn'), to: '/browse/events', primary: true }],
    }
  }
  if (isRegistered.value && !holdForm.value) {
    return {
      key: 'already',
      actions: [
        {
          label: `${t('eventDetail.viewReceipt')} →`,
          to: `/browse/your-events/${ev.id}`,
          primary: true,
        },
        { label: t('register.back'), to: detail },
      ],
    }
  }
  if (ev.done) {
    return {
      key: 'closed',
      actions: [{ label: t('register.browseActive'), to: '/browse/events', primary: true }],
    }
  }
  if (seatsLeft(ev) <= 0) {
    return { key: 'soldOut', actions: [{ label: t('register.back'), to: detail, primary: true }] }
  }
  return null
})

const handleBackToDetail = () => router.push(`/browse/events/${event.value?.id ?? ''}`)

const handleRegistrationSuccess = (record) => {
  confirmedData.value = record
  isSuccessModalOpen.value = true
}

const closeSuccessModal = () => {
  isSuccessModalOpen.value = false
  holdForm.value = false
}

const handleGoToCatalog = () => {
  isSuccessModalOpen.value = false
  router.push('/browse/events')
}

const handleGoToYourEvents = () => {
  isSuccessModalOpen.value = false
  router.push('/browse/your-events')
}
</script>

<template>
  <div class="registration-page">
    <div v-if="pageLoading && !event" class="registration-grid" role="status">
      <div class="skeleton-card skeleton-shimmer"></div>
      <div class="skeleton-card skeleton-shimmer skeleton-tall"></div>
      <p class="sr-only">{{ t('states.loading') }}</p>
    </div>

    <ErrorState
      v-else-if="pageError"
      :title="t('states.errorTitle')"
      :error="pageError"
      :retrying="pageLoading"
      @retry="loadEvent"
    />

    <AppCard v-else-if="notice" class="notice-card" :hoverable="false">
      <span class="notice-badge">{{ t(`register.${notice.key}Badge`) }}</span>
      <h2>{{ t(`register.${notice.key}Title`) }}</h2>
      <p>{{ t(`register.${notice.key}Desc`) }}</p>
      <div class="notice-actions">
        <AppButton
          v-for="action in notice.actions"
          :key="action.to"
          :variant="action.primary ? 'primary' : 'secondary'"
          :to="action.to"
        >
          {{ action.label }}
        </AppButton>
      </div>
    </AppCard>

    <div v-else class="registration-grid">
      <aside class="event-summary-column">
        <RegistrationSummary :event="event" @back="handleBackToDetail" />
      </aside>
      <section class="form-column">
        <RegistrationForm
          :event="event"
          @submitting="holdForm = $event"
          @success="handleRegistrationSuccess"
          @cancel="handleBackToDetail"
        />
      </section>
    </div>

    <AppModal
      :is-open="isSuccessModalOpen"
      :title="t('register.successTitle')"
      :badge-text="t('register.successBadge')"
      variant="success"
      @close="closeSuccessModal"
    >
      <RegistrationReceipt v-if="confirmedData && event" :ticket="confirmedData" :event="event" />

      <template #footer>
        <AppButton variant="secondary" class="modal-btn" @click="handleGoToCatalog">
          {{ t('register.toCatalog') }}
        </AppButton>
        <AppButton variant="primary" class="modal-btn" data-autofocus @click="handleGoToYourEvents">
          {{ t('register.toYourEvents') }} &rarr;
        </AppButton>
      </template>
    </AppModal>
  </div>
</template>

<style scoped>
.skeleton-tall {
  min-height: 480px;
}

.registration-page {
  padding-bottom: var(--space-12);
}

.registration-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-4);
}

.notice-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-8) var(--space-4);
  max-width: 540px;
  margin: var(--space-6) auto;
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

.notice-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  width: 100%;
}

.modal-btn {
  font-size: 0.95rem;
  padding: var(--space-3) var(--space-6);
}

@media (min-width: 481px) {
  .notice-actions {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    width: auto;
  }
  .modal-btn {
    padding: var(--space-2) var(--space-5);
  }
}

@media (min-width: 769px) {
  .notice-card {
    padding: var(--space-12) var(--space-8);
  }
}

@media (min-width: 901px) {
  .registration-grid {
    grid-template-columns: 360px minmax(0, 1fr);
    gap: var(--space-8);
  }
}
</style>

<script setup>
import { ref, reactive, computed, onUnmounted } from 'vue'
import {
  Plus,
  CalendarDays,
  CircleCheck,
  Trash2,
  Eye,
  MapPin,
  Clock,
  Inbox,
  Archive,
  TriangleAlert,
  PartyPopper,
} from 'lucide-vue-next'
import AppModal from '@/components/ui/AppModal.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useEvents, categories } from '@/composables/useEvents'
import { useLanguage } from '@/composables/useLanguage'

const { activeEvents, completedEvents, createEvent, completeEvent, deleteEvent } = useEvents()
const { t, formatDateTime } = useLanguage()

// 'active' | 'create' | 'completed'
const currentTab = ref('active')

const tabs = computed(() => [
  {
    id: 'active',
    icon: CalendarDays,
    label: t('manage.tabActive', { n: activeEvents.value.length }),
  },
  { id: 'create', icon: Plus, label: t('manage.tabCreate') },
  {
    id: 'completed',
    icon: Archive,
    label: t('manage.tabCompleted', { n: completedEvents.value.length }),
  },
])

const emptyForm = () => ({
  title: '',
  cat: 'workshop',
  date: '',
  loc: '',
  quota: 100,
  desc: '',
})

// reactive() harus diisi ulang pakai Object.assign, jangan form = {...} nanti reaktivitasnya hilang
const form = reactive(emptyForm())
const submitted = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
let successTimer = null

const isEmpty = (field) => submitted.value && !String(form[field]).trim()
const quotaInvalid = computed(() => submitted.value && !(Number(form.quota) >= 1))

const resetForm = () => {
  Object.assign(form, emptyForm())
  submitted.value = false
  errorMessage.value = ''
}

const handleCancelForm = () => {
  resetForm()
  currentTab.value = 'active'
}

const handleSubmitEvent = () => {
  submitted.value = true
  successMessage.value = ''

  const required = ['title', 'date', 'loc', 'desc']
  if (required.some((field) => !form[field].trim())) {
    errorMessage.value = t('manage.errorRequired')
    return
  }
  if (!(Number(form.quota) >= 1)) {
    errorMessage.value = t('manage.errorQuota')
    return
  }

  createEvent({ ...form })
  resetForm()
  successMessage.value = t('manage.success')

  clearTimeout(successTimer)
  successTimer = setTimeout(() => {
    successMessage.value = ''
    currentTab.value = 'active'
  }, 1000)
}

onUnmounted(() => clearTimeout(successTimer))

// satu modal dipakai bareng buat complete & delete
const isModalOpen = ref(false)
const modalAction = ref('complete')
const selectedEvent = ref(null)

const openModal = (action, event) => {
  modalAction.value = action
  selectedEvent.value = event
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedEvent.value = null
}

const handleConfirmModal = () => {
  if (selectedEvent.value) {
    if (modalAction.value === 'complete') completeEvent(selectedEvent.value.id)
    else deleteEvent(selectedEvent.value.id)
  }
  closeModal()
}

const modalText = computed(() => {
  const title = selectedEvent.value?.title ?? ''
  return modalAction.value === 'complete'
    ? {
        title: t('manage.modalCompleteTitle'),
        message: t('manage.modalCompleteMsg', { title }),
        confirm: t('manage.modalCompleteBtn'),
      }
    : {
        title: t('manage.modalDeleteTitle'),
        message: t('manage.modalDeleteMsg', { title }),
        confirm: t('manage.modalDeleteBtn'),
      }
})
</script>

<template>
  <div class="event-management-page">
    <div class="page-header">
      <div>
        <h2>{{ t('manage.heading') }}</h2>
        <p class="subtitle">{{ t('manage.subtitle') }}</p>
      </div>
      <AppButton variant="primary" class="btn-header" @click="currentTab = 'create'">
        <Plus :size="18" class="btn-icon" /> {{ t('manage.createNew') }}
      </AppButton>
    </div>

    <div class="tabs-container" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        role="tab"
        :aria-selected="currentTab === tab.id"
        :class="['tab-btn', { active: currentTab === tab.id }]"
        @click="currentTab = tab.id"
      >
        <component :is="tab.icon" :size="18" />
        {{ tab.label }}
      </button>
    </div>

    <section v-if="currentTab === 'active'" class="tab-pane" role="tabpanel">
      <div v-if="activeEvents.length > 0" class="events-grid">
        <AppCard
          v-for="item in activeEvents"
          :key="item.id"
          as="article"
          class="organizer-event-card"
          :hoverable="false"
        >
          <div class="card-header">
            <span class="category-badge">{{ t(`events.categories.${item.cat}`) }}</span>
            <span class="status-badge status-active">{{ t('dashboard.statusActive') }}</span>
          </div>
          <h3 class="event-title">{{ item.title }}</h3>
          <p class="event-meta">
            <span><Clock :size="15" /> {{ formatDateTime(item.date) }}</span>
            <span><MapPin :size="15" /> {{ item.loc }}</span>
          </p>
          <p class="event-desc">{{ item.desc }}</p>
          <div class="card-actions">
            <RouterLink :to="`/browse/events/${item.id}`" class="btn-action btn-detail">
              <Eye :size="16" /> {{ t('manage.viewDetails') }}
            </RouterLink>
            <button
              type="button"
              class="btn-action btn-complete"
              @click="openModal('complete', item)"
            >
              <CircleCheck :size="16" /> {{ t('manage.complete') }}
            </button>
            <button type="button" class="btn-action btn-delete" @click="openModal('delete', item)">
              <Trash2 :size="16" /> {{ t('manage.delete') }}
            </button>
          </div>
        </AppCard>
      </div>

      <div v-else class="empty-state">
        <Inbox :size="48" :stroke-width="1.5" class="empty-icon" />
        <h3>{{ t('manage.emptyActiveTitle') }}</h3>
        <p>{{ t('manage.emptyActiveDesc') }}</p>
        <AppButton variant="primary" @click="currentTab = 'create'">
          {{ t('manage.emptyActiveBtn') }}
        </AppButton>
      </div>
    </section>

    <section v-if="currentTab === 'create'" class="tab-pane" role="tabpanel">
      <AppCard class="form-card" :hoverable="false">
        <h3>{{ t('manage.formTitle') }}</h3>
        <p class="form-subtitle">{{ t('manage.formSubtitle') }}</p>

        <div v-if="errorMessage" class="alert-box alert-error" role="alert">
          <TriangleAlert :size="18" /> {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="alert-box alert-success" role="status">
          <PartyPopper :size="18" /> {{ successMessage }}
        </div>

        <form class="event-form" novalidate @submit.prevent="handleSubmitEvent">
          <div class="form-group">
            <label for="ev-title">{{ t('manage.fieldTitle') }} *</label>
            <input
              id="ev-title"
              v-model="form.title"
              type="text"
              :placeholder="t('manage.fieldTitlePh')"
              :class="['form-input', { invalid: isEmpty('title') }]"
              :aria-invalid="isEmpty('title')"
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="ev-cat">{{ t('manage.fieldCategory') }} *</label>
              <select id="ev-cat" v-model="form.cat" class="form-input">
                <option v-for="cat in categories" :key="cat" :value="cat">
                  {{ t(`events.categories.${cat}`) }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="ev-date">{{ t('manage.fieldDate') }} *</label>
              <input
                id="ev-date"
                v-model="form.date"
                type="datetime-local"
                :class="['form-input', { invalid: isEmpty('date') }]"
                :aria-invalid="isEmpty('date')"
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="ev-loc">{{ t('manage.fieldLoc') }} *</label>
              <input
                id="ev-loc"
                v-model="form.loc"
                type="text"
                :placeholder="t('manage.fieldLocPh')"
                :class="['form-input', { invalid: isEmpty('loc') }]"
                :aria-invalid="isEmpty('loc')"
              />
            </div>
            <div class="form-group">
              <label for="ev-quota">{{ t('manage.fieldQuota') }}</label>
              <input
                id="ev-quota"
                v-model.number="form.quota"
                type="number"
                min="1"
                inputmode="numeric"
                :class="['form-input', { invalid: quotaInvalid }]"
                :aria-invalid="quotaInvalid"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="ev-desc">{{ t('manage.fieldDesc') }} *</label>
            <textarea
              id="ev-desc"
              v-model="form.desc"
              rows="4"
              :placeholder="t('manage.fieldDescPh')"
              :class="['form-input', { invalid: isEmpty('desc') }]"
              :aria-invalid="isEmpty('desc')"
            ></textarea>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-secondary-action" @click="handleCancelForm">
              {{ t('manage.cancel') }}
            </button>
            <AppButton variant="primary" type="submit">{{ t('manage.publish') }}</AppButton>
          </div>
        </form>
      </AppCard>
    </section>

    <section v-if="currentTab === 'completed'" class="tab-pane" role="tabpanel">
      <div v-if="completedEvents.length > 0" class="events-grid">
        <AppCard
          v-for="item in completedEvents"
          :key="item.id"
          as="article"
          class="organizer-event-card card-completed"
          :hoverable="false"
        >
          <div class="card-header">
            <span class="category-badge">{{ t(`events.categories.${item.cat}`) }}</span>
            <span class="status-badge status-completed">{{ t('dashboard.statusCompleted') }}</span>
          </div>
          <h3 class="event-title text-strike">{{ item.title }}</h3>
          <p class="event-meta">
            <span><Clock :size="15" /> {{ formatDateTime(item.date) }}</span>
            <span><MapPin :size="15" /> {{ item.loc }}</span>
          </p>
          <p class="event-desc">{{ item.desc }}</p>
          <div class="completed-notice">{{ t('manage.completedNotice') }}</div>
          <div class="card-actions">
            <button type="button" class="btn-action btn-delete" @click="openModal('delete', item)">
              <Trash2 :size="16" /> {{ t('manage.deleteArchive') }}
            </button>
          </div>
        </AppCard>
      </div>

      <div v-else class="empty-state">
        <Archive :size="48" :stroke-width="1.5" class="empty-icon" />
        <h3>{{ t('manage.emptyCompletedTitle') }}</h3>
        <p>{{ t('manage.emptyCompletedDesc') }}</p>
      </div>
    </section>

    <AppModal
      :is-open="isModalOpen"
      :title="modalText.title"
      :message="modalText.message"
      :confirm-text="modalText.confirm"
      :cancel-text="t('manage.cancel')"
      @confirm="handleConfirmModal"
      @close="closeModal"
    />
  </div>
</template>

<style scoped>
.event-management-page {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.page-header h2 {
  font-size: clamp(1.4rem, 5vw, 2rem);
  color: var(--text-main);
  margin-bottom: var(--space-1);
}

.subtitle {
  color: var(--text-muted);
}

.btn-header,
.btn-icon {
  vertical-align: middle;
}

/* di hp tab-nya bisa digeser ke samping */
.tabs-container {
  display: flex;
  gap: var(--space-2);
  overflow-x: auto;
  scrollbar-width: none;
  border-bottom: 2px solid var(--border-color);
  margin: 0 calc(-1 * var(--space-4)) var(--space-6);
  padding: 0 var(--space-4) var(--space-2);
}
.tabs-container::-webkit-scrollbar {
  display: none;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  flex-shrink: 0;
  white-space: nowrap;
  min-height: 44px;
  background: none;
  border: none;
  padding: var(--space-2) var(--space-4);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
}
.tab-btn:hover {
  background-color: rgba(102, 68, 255, 0.05);
  color: var(--primary);
}
.tab-btn.active {
  background-color: var(--primary);
  color: white;
}
.tab-btn:focus-visible {
  outline: 3px solid var(--primary-soft);
  outline-offset: 2px;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr));
  gap: var(--space-4);
}

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

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-8) var(--space-4);
  background: white;
  border: 1px dashed var(--border-color);
  border-radius: var(--space-4);
}
.empty-icon {
  color: var(--primary);
  margin-bottom: var(--space-3);
}
.empty-state h3 {
  font-size: 1.25rem;
  margin-bottom: var(--space-2);
}
.empty-state p {
  color: var(--text-muted);
  max-width: 420px;
  margin-bottom: var(--space-6);
}

.form-card {
  padding: var(--space-4);
  max-width: 800px;
  margin: 0 auto;
}
.form-card h3 {
  font-size: 1.3rem;
  margin-bottom: var(--space-1);
}
.form-subtitle {
  color: var(--text-muted);
  margin-bottom: var(--space-6);
}

.alert-box {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: var(--space-6);
}
.alert-box svg {
  flex-shrink: 0;
}
.alert-error {
  background: #ffe3e3;
  color: #c92a2a;
  border: 1px solid #ffa8a8;
}
.alert-success {
  background: #d3f9d8;
  color: #2b8a3e;
  border: 1px solid #b2f2bb;
}

.event-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.form-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-4);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.form-group label {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-main);
}

/* font 16px biar iOS ga auto-zoom pas input difokus */
.form-input {
  width: 100%;
  min-height: 44px;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  color: var(--text-main);
  background: white;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}
.form-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-soft);
}
.form-input.invalid {
  border-color: var(--danger);
  background: #fff8f8;
}
textarea.form-input {
  resize: vertical;
}

.form-actions {
  display: flex;
  flex-direction: column-reverse;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.btn-secondary-action {
  min-height: 44px;
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  padding: var(--space-3) var(--space-6);
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  color: var(--text-muted);
}
.btn-secondary-action:hover {
  background: #e9ecef;
  color: var(--text-main);
}

@media (min-width: 769px) {
  .page-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-8);
  }
  .tabs-container {
    flex-wrap: wrap;
    overflow: visible;
    margin: 0 0 var(--space-8);
    padding: 0 0 var(--space-2);
  }
  .events-grid {
    gap: var(--space-6);
  }
  .organizer-event-card {
    padding: var(--space-6);
  }
  .empty-state {
    padding: var(--space-12);
  }
  .form-card {
    padding: var(--space-8);
  }
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
  .form-actions {
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>

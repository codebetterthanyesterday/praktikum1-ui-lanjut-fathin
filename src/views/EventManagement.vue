<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { Plus, CalendarDays, Inbox, Archive } from 'lucide-vue-next'
import AppModal from '@/components/ui/AppModal.vue'
import AppButton from '@/components/ui/AppButton.vue'
import OrganizerEventCard from '@/components/event/OrganizerEventCard.vue'
import EventCreateForm from '@/components/event/EventCreateForm.vue'
import { useEvents } from '@/composables/useEvents'
import { useLanguage } from '@/composables/useLanguage'

const { activeEvents, completedEvents, createEvent, completeEvent, deleteEvent } = useEvents()
const { t } = useLanguage()

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

let switchTimer = null

// pesan sukses tampil sebentar di form, habis itu balik ke tab aktif
const handleCreateEvent = (eventData) => {
  createEvent(eventData)
  clearTimeout(switchTimer)
  switchTimer = setTimeout(() => {
    currentTab.value = 'active'
  }, 1000)
}

onUnmounted(() => clearTimeout(switchTimer))

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
        variant: 'primary',
      }
    : {
        title: t('manage.modalDeleteTitle'),
        message: t('manage.modalDeleteMsg', { title }),
        confirm: t('manage.modalDeleteBtn'),
        variant: 'danger',
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
        <OrganizerEventCard
          v-for="item in activeEvents"
          :key="item.id"
          :event="item"
          @complete="openModal('complete', $event)"
          @delete="openModal('delete', $event)"
        />
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
      <EventCreateForm @submit="handleCreateEvent" @cancel="currentTab = 'active'" />
    </section>

    <section v-if="currentTab === 'completed'" class="tab-pane" role="tabpanel">
      <div v-if="completedEvents.length > 0" class="events-grid">
        <OrganizerEventCard
          v-for="item in completedEvents"
          :key="item.id"
          :event="item"
          is-completed
          @delete="openModal('delete', $event)"
        />
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
      :variant="modalText.variant"
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
  .empty-state {
    padding: var(--space-12);
  }
}
</style>

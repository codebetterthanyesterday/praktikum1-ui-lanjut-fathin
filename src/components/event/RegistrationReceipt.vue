<script setup>
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

const props = defineProps({
  ticket: {
    type: Object,
    required: true,
  },
  event: {
    type: Object,
    required: true,
  },
})

const { t, formatDateTime } = useLanguage()

// nama & judul acara dibikin tebal tanpa v-html (isinya dari input user)
const greeting = computed(() =>
  t('register.greeting', { name: '\u0000name\u0000', event: '\u0000event\u0000' })
    .split('\u0000')
    .map((part) =>
      part === 'name'
        ? { bold: true, text: props.ticket.fullName }
        : part === 'event'
          ? { bold: true, text: props.event.title }
          : { bold: false, text: part },
    ),
)
</script>

<template>
  <div class="receipt-preview">
    <p class="receipt-greeting">
      <template v-for="(part, i) in greeting" :key="i">
        <strong v-if="part.bold">{{ part.text }}</strong>
        <template v-else>{{ part.text }}</template>
      </template>
    </p>

    <dl class="receipt-box">
      <div class="receipt-row">
        <dt class="receipt-label">{{ t('register.bookingRef') }}</dt>
        <dd class="receipt-value ref-code">{{ ticket.bookingCode }}</dd>
      </div>
      <div class="receipt-row">
        <dt class="receipt-label">{{ t('register.attendeeEmail') }}</dt>
        <dd class="receipt-value">{{ ticket.email }}</dd>
      </div>
      <div class="receipt-row">
        <dt class="receipt-label">{{ t('register.schedule') }}</dt>
        <dd class="receipt-value">{{ formatDateTime(event.date) }}</dd>
      </div>
      <div class="receipt-row">
        <dt class="receipt-label">{{ t('register.venue') }}</dt>
        <dd class="receipt-value">{{ event.loc }}</dd>
      </div>
    </dl>
  </div>
</template>

<style scoped>
.receipt-greeting {
  font-size: 0.95rem;
  color: var(--text-main);
  line-height: 1.6;
  margin-bottom: var(--space-4);
  overflow-wrap: anywhere;
}

.receipt-box {
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.receipt-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
  font-size: 0.9rem;
}

.receipt-label {
  color: var(--text-muted);
  flex-shrink: 0;
}

.receipt-value {
  font-weight: 600;
  color: var(--text-main);
  text-align: right;
  overflow-wrap: anywhere;
}

.ref-code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 1.05rem;
  color: var(--primary);
  background: rgba(102, 68, 255, 0.08);
  padding: 2px 8px;
  border-radius: 4px;
}
</style>

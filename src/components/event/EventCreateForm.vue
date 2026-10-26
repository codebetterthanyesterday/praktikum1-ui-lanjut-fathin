<script setup>
import { ref, reactive, computed } from 'vue'
import { TriangleAlert, PartyPopper } from 'lucide-vue-next'
import AppCard from '@/components/ui/AppCard.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { categories } from '@/composables/useEvents'
import { useLanguage } from '@/composables/useLanguage'

const emit = defineEmits(['submit', 'cancel'])

const { t } = useLanguage()

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

const isEmpty = (field) => submitted.value && !String(form[field]).trim()
const quotaInvalid = computed(() => submitted.value && !(Number(form.quota) >= 1))

const resetForm = () => {
  Object.assign(form, emptyForm())
  submitted.value = false
  errorMessage.value = ''
}

const handleCancel = () => {
  resetForm()
  emit('cancel')
}

const handleSubmitEvent = () => {
  submitted.value = true
  successMessage.value = ''

  const required = ['title', 'date', 'loc', 'desc']
  if (required.some((field) => !form[field].trim())) {
    errorMessage.value = 'manage.errorRequired'
    return
  }
  if (!(Number(form.quota) >= 1)) {
    errorMessage.value = 'manage.errorQuota'
    return
  }

  emit('submit', { ...form })
  resetForm()
  successMessage.value = 'manage.success'
}
</script>

<template>
  <AppCard class="form-card" :hoverable="false">
    <h3>{{ t('manage.formTitle') }}</h3>
    <p class="form-subtitle">{{ t('manage.formSubtitle') }}</p>

    <div v-if="errorMessage" class="alert-box alert-error" role="alert">
      <TriangleAlert :size="18" /> {{ t(errorMessage) }}
    </div>
    <div v-if="successMessage" class="alert-box alert-success" role="status">
      <PartyPopper :size="18" /> {{ t(successMessage) }}
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
        <button type="button" class="btn-secondary-action" @click="handleCancel">
          {{ t('manage.cancel') }}
        </button>
        <AppButton variant="primary" type="submit">{{ t('manage.publish') }}</AppButton>
      </div>
    </form>
  </AppCard>
</template>

<style scoped>
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
  gap: 22px;
}

.form-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 22px var(--space-5);
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
  margin-top: var(--space-3);
  padding-top: var(--space-5);
  border-top: 1px solid var(--border-color);
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
  .form-card {
    padding: var(--space-8);
  }
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
  .form-actions {
    flex-direction: row;
    justify-content: flex-end;
    gap: var(--space-4);
  }
}
</style>

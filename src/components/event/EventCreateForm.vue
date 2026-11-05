<script setup>
import { reactive, nextTick } from 'vue'
import { TriangleAlert } from 'lucide-vue-next'
import AppCard from '@/components/ui/AppCard.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { categories } from '@/composables/useEvents'
import { useLanguage } from '@/composables/useLanguage'

defineProps({
  submitting: {
    type: Boolean,
    default: false,
  },
  serverError: {
    type: Object,
    default: null,
  },
})
const emit = defineEmits(['submit', 'cancel'])

const { t } = useLanguage()

const fields = ['title', 'date', 'loc', 'quota', 'desc']

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
const errors = reactive({ title: '', date: '', loc: '', quota: '', desc: '', banner: '' })

const rules = {
  title: (v) => (!v ? 'errTitle' : v.length < 3 ? 'errTitleShort' : ''),
  date: (v) => (!v ? 'errDate' : ''),
  loc: (v) => (!v ? 'errLoc' : ''),
  quota: (v) => (!(Number(v) >= 1) ? 'errQuota' : ''),
  desc: (v) => (!v ? 'errDesc' : v.length < 10 ? 'errDescShort' : ''),
}

const validateField = (field) => {
  const key = rules[field](String(form[field] ?? '').trim())
  errors[field] = key ? `manage.${key}` : ''
  return !key
}

const revalidate = (field) => {
  if (errors[field]) validateField(field)
  if (errors.banner && fields.every((f) => !errors[f])) errors.banner = ''
}

const resetForm = () => {
  Object.assign(form, emptyForm())
  fields.forEach((f) => (errors[f] = ''))
  errors.banner = ''
}

const handleCancel = () => {
  resetForm()
  emit('cancel')
}

const handleSubmitEvent = async () => {
  const results = fields.map(validateField)
  if (results.includes(false)) {
    errors.banner = 'manage.errorFields'
    await nextTick()
    document.getElementById(`ev-${fields[results.indexOf(false)]}`)?.focus()
    return
  }
  errors.banner = ''
  emit('submit', { ...form })
}

defineExpose({ resetForm })
</script>

<template>
  <AppCard class="form-card" :hoverable="false">
    <h3>{{ t('manage.formTitle') }}</h3>
    <p class="form-subtitle">{{ t('manage.formSubtitle') }}</p>

    <div v-if="errors.banner" class="alert-box alert-error" role="alert">
      <TriangleAlert :size="18" /> {{ t(errors.banner) }}
    </div>
    <div v-else-if="serverError" class="alert-box alert-error" role="alert">
      <TriangleAlert :size="18" /> {{ t(serverError.key, serverError.params) }}
    </div>

    <form class="event-form" novalidate @submit.prevent="handleSubmitEvent">
      <fieldset :disabled="submitting" class="form-fields">
        <div class="form-group">
          <label for="ev-title">{{ t('manage.fieldTitle') }} *</label>
          <input
            id="ev-title"
            v-model="form.title"
            type="text"
            :placeholder="t('manage.fieldTitlePh')"
            :class="['form-input', { invalid: errors.title }]"
            :aria-invalid="Boolean(errors.title)"
            @input="revalidate('title')"
          />
          <span v-if="errors.title" class="field-error">{{ t(errors.title) }}</span>
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
              :class="['form-input', { invalid: errors.date }]"
              :aria-invalid="Boolean(errors.date)"
              @input="revalidate('date')"
              @change="revalidate('date')"
            />
            <span v-if="errors.date" class="field-error">{{ t(errors.date) }}</span>
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
              :class="['form-input', { invalid: errors.loc }]"
              :aria-invalid="Boolean(errors.loc)"
              @input="revalidate('loc')"
            />
            <span v-if="errors.loc" class="field-error">{{ t(errors.loc) }}</span>
          </div>
          <div class="form-group">
            <label for="ev-quota">{{ t('manage.fieldQuota') }} *</label>
            <input
              id="ev-quota"
              v-model.number="form.quota"
              type="number"
              min="1"
              inputmode="numeric"
              :class="['form-input', { invalid: errors.quota }]"
              :aria-invalid="Boolean(errors.quota)"
              @input="revalidate('quota')"
            />
            <span v-if="errors.quota" class="field-error">{{ t(errors.quota) }}</span>
          </div>
        </div>

        <div class="form-group">
          <label for="ev-desc">{{ t('manage.fieldDesc') }} *</label>
          <textarea
            id="ev-desc"
            v-model="form.desc"
            rows="4"
            :placeholder="t('manage.fieldDescPh')"
            :class="['form-input', { invalid: errors.desc }]"
            :aria-invalid="Boolean(errors.desc)"
            @input="revalidate('desc')"
          ></textarea>
          <span v-if="errors.desc" class="field-error">{{ t(errors.desc) }}</span>
        </div>
      </fieldset>

      <div class="form-actions">
        <button
          type="button"
          class="btn-secondary-action"
          :disabled="submitting"
          @click="handleCancel"
        >
          {{ t('manage.cancel') }}
        </button>
        <AppButton variant="primary" type="submit" :loading="submitting">
          {{ t('manage.publish') }}
        </AppButton>
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

.form-fields {
  border: none;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.field-error {
  font-size: 0.85rem;
  color: #dc2626;
  font-weight: 500;
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

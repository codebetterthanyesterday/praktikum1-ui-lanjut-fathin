<script setup>
import { ref, reactive, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { TriangleAlert } from 'lucide-vue-next'
import AppCard from '@/components/ui/AppCard.vue'
import AppModal from '@/components/ui/AppModal.vue'
import { useEvents } from '@/composables/useEvents'
import { useLanguage } from '@/composables/useLanguage'

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['success', 'cancel'])

const router = useRouter()
const { registerAttendee } = useEvents()
const { t } = useLanguage()

const fields = ['fullName', 'email', 'phone', 'dob', 'reason']

const form = reactive({ fullName: '', email: '', phone: '', dob: '', reason: '' })
// isinya key terjemahan, biar pesan error ikut ganti bahasa
const errors = reactive({ fullName: '', email: '', phone: '', dob: '', reason: '' })
const errorMessage = ref('')
const submitted = ref(false)

const today = new Date().toLocaleDateString('en-CA')

const isFormDirty = computed(() => fields.some((field) => String(form[field]).trim()))

const rules = {
  fullName: (v) => (!v ? 'errFullName' : v.length < 2 ? 'errFullNameShort' : ''),
  email: (v) => (!v ? 'errEmail' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'errEmailFormat' : ''),
  phone: (v) => {
    if (!v) return 'errPhone'
    const digits = v.replace(/\D/g, '').length
    return !/^[0-9+\-\s()]+$/.test(v) || digits < 9 || digits > 15 ? 'errPhoneFormat' : ''
  },
  dob: (v) => {
    if (!v) return 'errDob'
    if (v > today) return 'errDobFuture'
    return v < '1900-01-01' ? 'errDobOld' : ''
  },
  reason: (v) => (!v ? 'errReason' : v.length < 10 ? 'errReasonShort' : ''),
}

const validateField = (field) => {
  const key = rules[field](String(form[field]).trim())
  errors[field] = key ? `register.${key}` : ''
  return !key
}

// kalau kolomnya sudah pernah error, langsung dicek ulang tiap diketik
const revalidate = (field) => {
  if (errors[field]) validateField(field)
  if (errorMessage.value && fields.every((f) => !errors[f])) errorMessage.value = ''
}

const handleSubmit = async () => {
  const results = fields.map(validateField)
  if (results.includes(false)) {
    errorMessage.value = 'register.errorBanner'
    await nextTick()
    document.getElementById(`reg-${fields[results.indexOf(false)]}`)?.focus()
    return
  }

  const record = registerAttendee(props.event.id, form)
  if (!record) {
    errorMessage.value = 'register.errorFailed'
    return
  }
  errorMessage.value = ''
  submitted.value = true
  emit('success', record)
}

// jaga-jaga biar ketikan user ga hilang kalau ga sengaja keluar
const isDiscardModalOpen = ref(false)
let allowLeave = false
let pendingPath = null

const handleCancelClick = () => {
  if (isFormDirty.value) isDiscardModalOpen.value = true
  else emit('cancel')
}

const handleConfirmDiscard = () => {
  isDiscardModalOpen.value = false
  allowLeave = true
  if (pendingPath) router.push(pendingPath)
  else emit('cancel')
}

const handleKeepEditing = () => {
  isDiscardModalOpen.value = false
  pendingPath = null
}

onBeforeRouteLeave((to) => {
  if (allowLeave || submitted.value || !isFormDirty.value) return true
  pendingPath = to.fullPath
  isDiscardModalOpen.value = true
  return false
})

const onBeforeUnload = (e) => {
  if (isFormDirty.value && !submitted.value) e.preventDefault()
}
onMounted(() => window.addEventListener('beforeunload', onBeforeUnload))
onUnmounted(() => window.removeEventListener('beforeunload', onBeforeUnload))
</script>

<template>
  <div class="registration-form-wrapper">
    <AppCard class="form-card" :hoverable="false">
      <header class="form-header">
        <h2>{{ t('register.formTitle') }}</h2>
        <p>{{ t('register.formSubtitle') }}</p>
      </header>

      <div v-if="errorMessage" class="error-banner" role="alert">
        <TriangleAlert :size="18" /> {{ t(errorMessage) }}
      </div>

      <form class="attendee-form" novalidate @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="reg-fullName">
            {{ t('register.fullName') }}
            <span class="required" :title="t('register.required')">*</span>
          </label>
          <input
            id="reg-fullName"
            v-model="form.fullName"
            type="text"
            autocomplete="name"
            :placeholder="t('register.fullNamePh')"
            :class="['form-input', { 'input-error': errors.fullName }]"
            :aria-invalid="Boolean(errors.fullName)"
            :aria-describedby="errors.fullName ? 'err-fullName' : undefined"
            @input="revalidate('fullName')"
            @blur="form.fullName && validateField('fullName')"
          />
          <span v-if="errors.fullName" id="err-fullName" class="field-error">
            {{ t(errors.fullName) }}
          </span>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="reg-email">
              {{ t('register.email') }}
              <span class="required" :title="t('register.required')">*</span>
            </label>
            <input
              id="reg-email"
              v-model="form.email"
              type="email"
              inputmode="email"
              autocomplete="email"
              :placeholder="t('register.emailPh')"
              :class="['form-input', { 'input-error': errors.email }]"
              :aria-invalid="Boolean(errors.email)"
              :aria-describedby="errors.email ? 'err-email' : undefined"
              @input="revalidate('email')"
              @blur="form.email && validateField('email')"
            />
            <span v-if="errors.email" id="err-email" class="field-error">
              {{ t(errors.email) }}
            </span>
          </div>

          <div class="form-group">
            <label for="reg-phone">
              {{ t('register.phone') }}
              <span class="required" :title="t('register.required')">*</span>
            </label>
            <input
              id="reg-phone"
              v-model="form.phone"
              type="tel"
              inputmode="tel"
              autocomplete="tel"
              :placeholder="t('register.phonePh')"
              :class="['form-input', { 'input-error': errors.phone }]"
              :aria-invalid="Boolean(errors.phone)"
              :aria-describedby="errors.phone ? 'err-phone' : undefined"
              @input="revalidate('phone')"
              @blur="form.phone && validateField('phone')"
            />
            <span v-if="errors.phone" id="err-phone" class="field-error">
              {{ t(errors.phone) }}
            </span>
          </div>
        </div>

        <div class="form-group">
          <label for="reg-dob">
            {{ t('register.dob') }}
            <span class="required" :title="t('register.required')">*</span>
          </label>
          <input
            id="reg-dob"
            v-model="form.dob"
            type="date"
            autocomplete="bday"
            min="1900-01-01"
            :max="today"
            :class="['form-input', { 'input-error': errors.dob }]"
            :aria-invalid="Boolean(errors.dob)"
            :aria-describedby="errors.dob ? 'err-dob' : undefined"
            @input="revalidate('dob')"
            @change="revalidate('dob')"
            @blur="form.dob && validateField('dob')"
          />
          <span v-if="errors.dob" id="err-dob" class="field-error">{{ t(errors.dob) }}</span>
        </div>

        <div class="form-group">
          <label for="reg-reason">
            {{ t('register.reason') }}
            <span class="required" :title="t('register.required')">*</span>
          </label>
          <textarea
            id="reg-reason"
            v-model="form.reason"
            rows="4"
            :placeholder="t('register.reasonPh')"
            :class="['form-input', 'form-textarea', { 'input-error': errors.reason }]"
            :aria-invalid="Boolean(errors.reason)"
            :aria-describedby="errors.reason ? 'err-reason' : 'hint-reason'"
            @input="revalidate('reason')"
            @blur="form.reason && validateField('reason')"
          ></textarea>
          <span v-if="errors.reason" id="err-reason" class="field-error">
            {{ t(errors.reason) }}
          </span>
          <span v-else-if="form.reason.trim().length < 10" id="hint-reason" class="field-hint">
            {{ t('register.reasonCount', { n: form.reason.trim().length }) }}
          </span>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-cancel-form" @click="handleCancelClick">
            {{ t('register.cancel') }}
          </button>
          <button type="submit" class="btn-submit-form">{{ t('register.submit') }}</button>
        </div>
      </form>
    </AppCard>

    <AppModal
      :is-open="isDiscardModalOpen"
      :title="t('register.discardTitle')"
      :message="t('register.discardMsg')"
      :badge-text="t('register.discardBadge')"
      variant="danger"
      :cancel-text="t('register.discardKeep')"
      :confirm-text="t('register.discardYes')"
      @confirm="handleConfirmDiscard"
      @close="handleKeepEditing"
    />
  </div>
</template>

<style scoped>
.form-card {
  padding: var(--space-4);
}

.form-header {
  margin-bottom: var(--space-6);
}
.form-header h2 {
  font-size: 1.4rem;
  color: var(--text-main);
  margin-bottom: var(--space-1);
}
.form-header p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.error-banner {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: #fee2e2;
  color: #b91c1c;
  padding: var(--space-3) var(--space-4);
  border-radius: 8px;
  border: 1px solid #fecaca;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: var(--space-6);
}
.error-banner svg {
  flex-shrink: 0;
}

.attendee-form {
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
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-main);
}

.required {
  color: var(--danger);
}

/* font 16px biar iOS ga auto-zoom pas input difokus */
.form-input {
  width: 100%;
  min-height: 44px;
  padding: 11px 14px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  color: var(--text-main);
  background: #fafafa;
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    background-color 0.2s;
}
.form-input:focus {
  outline: none;
  border-color: var(--primary);
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 68, 255, 0.15);
}

.form-textarea {
  resize: vertical;
  line-height: 1.5;
}

.input-error {
  border-color: #ef4444;
  background-color: #fef2f2;
}
.input-error:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}

.field-error,
.field-hint {
  font-size: 0.85rem;
  line-height: 1.4;
}
.field-error {
  color: #dc2626;
  font-weight: 500;
}
.field-hint {
  color: var(--text-muted);
}

.form-actions {
  display: flex;
  flex-direction: column-reverse;
  gap: var(--space-3);
  margin-top: 10px;
  padding-top: var(--space-5);
  border-top: 1px solid var(--border-color);
}

.btn-cancel-form,
.btn-submit-form {
  min-height: 48px;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s,
    transform 0.1s;
}

.btn-cancel-form {
  background: var(--bg-light);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
}
.btn-cancel-form:hover {
  background: #e2e8f0;
  color: var(--text-main);
}

.btn-submit-form {
  background: var(--primary);
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(102, 68, 255, 0.25);
}
.btn-submit-form:hover {
  background: var(--primary-hover);
}
.btn-submit-form:active {
  transform: scale(0.98);
}

.btn-cancel-form:focus-visible,
.btn-submit-form:focus-visible {
  outline: 3px solid var(--primary-soft);
  outline-offset: 2px;
}

@media (min-width: 769px) {
  .form-card {
    padding: var(--space-8);
  }
  .form-header h2 {
    font-size: 1.6rem;
  }
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
  .form-actions {
    flex-direction: row;
    justify-content: flex-end;
    gap: var(--space-4);
  }
  .btn-cancel-form,
  .btn-submit-form {
    min-height: 42px;
    font-size: 0.95rem;
  }
}
</style>

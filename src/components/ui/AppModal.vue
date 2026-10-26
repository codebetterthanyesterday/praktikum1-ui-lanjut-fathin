<script setup>
import { ref, computed, watch, nextTick, onUnmounted, useId } from 'vue'
import { TriangleAlert, CircleCheck, Info } from 'lucide-vue-next'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Action Confirmation',
  },
  message: {
    type: String,
    default: '',
  },
  confirmText: {
    type: String,
    default: 'Yes, Proceed',
  },
  cancelText: {
    type: String,
    default: 'Cancel',
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  variant: {
    type: String,
    default: 'danger',
    validator: (value) => ['danger', 'primary', 'success'].includes(value),
  },
  badgeText: {
    type: String,
    default: '',
  },
  badgeVariant: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['confirm', 'close'])

const icons = { danger: TriangleAlert, primary: Info, success: CircleCheck }
const icon = computed(() => icons[props.variant])

// id unik, soalnya bisa ada lebih dari satu modal di satu halaman
const uid = useId()
const titleId = `${uid}-title`
const messageId = `${uid}-message`

const card = ref(null)
let lastFocused = null

const onKeydown = (e) => {
  if (e.key === 'Escape') emit('close')
}

// fokus ke tombol yang paling aman dulu (Cancel) biar ga kepencet confirm
const focusFirst = () => {
  const el =
    card.value?.querySelector('[data-autofocus]') ||
    card.value?.querySelector('.btn-cancel') ||
    card.value?.querySelector('.modal-footer button, .modal-footer a') ||
    card.value
  el?.focus()
}

watch(
  () => props.isOpen,
  async (open) => {
    if (open) {
      lastFocused = document.activeElement
      document.addEventListener('keydown', onKeydown)
      document.body.style.overflow = 'hidden'
      await nextTick()
      focusFirst()
    } else {
      document.removeEventListener('keydown', onKeydown)
      document.body.style.overflow = ''
      if (lastFocused?.isConnected) lastFocused.focus()
    }
  },
)

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
        <div
          ref="card"
          :class="['modal-card', `modal-${variant}`]"
          :role="variant === 'danger' ? 'alertdialog' : 'dialog'"
          aria-modal="true"
          :aria-labelledby="titleId"
          :aria-describedby="message ? messageId : undefined"
          tabindex="-1"
        >
          <span v-if="badgeText" :class="['modal-badge', `badge-${badgeVariant || variant}`]">
            {{ badgeText }}
          </span>
          <div class="modal-header">
            <component :is="icon" :size="26" class="modal-icon" />
            <h3 :id="titleId" class="modal-title">{{ title }}</h3>
          </div>

          <div class="modal-body">
            <p v-if="message" :id="messageId" class="modal-message">{{ message }}</p>
            <slot />
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button v-if="showCancel" type="button" class="btn-cancel" @click="$emit('close')">
                {{ cancelText }}
              </button>
              <button
                type="button"
                :class="['btn-confirm', `btn-${variant}`]"
                @click="$emit('confirm')"
              >
                {{ confirmText }}
              </button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 9999;
  padding: var(--space-4);
  padding-bottom: calc(var(--space-4) + env(safe-area-inset-bottom));
}

.modal-card {
  background: white;
  width: 100%;
  max-width: 460px;
  border-radius: var(--space-4);
  padding: var(--space-6);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--border-color);
  max-height: calc(100dvh - var(--space-8));
  overflow-y: auto;
  animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-card:focus {
  outline: none;
}

.modal-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  border-radius: 4px;
  margin-bottom: var(--space-3);
}
.badge-danger {
  background: #fee2e2;
  color: #b91c1c;
  border: 1px solid #fecaca;
}
.badge-primary {
  background: #ede9fe;
  color: #6d28d9;
  border: 1px solid #ddd6fe;
}
.badge-success {
  background: #dcfce7;
  color: #15803d;
  border: 1px solid #86efac;
}

@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.modal-icon {
  flex-shrink: 0;
}
.modal-danger .modal-icon {
  color: #f59f00;
}
.modal-primary .modal-icon {
  color: var(--primary);
}
.modal-success .modal-icon {
  color: #16a34a;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main);
}

.modal-body {
  margin-bottom: var(--space-6);
}

.modal-message {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.modal-footer {
  display: flex;
  flex-direction: column-reverse;
  gap: var(--space-2);
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-color);
}

.btn-cancel,
.btn-confirm {
  min-height: 44px;
  padding: var(--space-2) var(--space-6);
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s,
    transform 0.15s;
}

.btn-cancel {
  background: var(--bg-light);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
}
.btn-cancel:hover {
  background: #e2e8f0;
  color: var(--text-main);
}

.btn-confirm {
  color: white;
  border: none;
}
.btn-confirm.btn-danger {
  background: var(--danger);
}
.btn-confirm.btn-danger:hover {
  background: #d62828;
}
.btn-confirm.btn-primary {
  background: var(--primary);
}
.btn-confirm.btn-primary:hover {
  background: var(--primary-hover);
}
.btn-confirm.btn-success {
  background: #16a34a;
}
.btn-confirm.btn-success:hover {
  background: #15803d;
}
.btn-confirm:active {
  transform: scale(0.98);
}

.btn-cancel:focus-visible,
.btn-confirm:focus-visible {
  outline: 3px solid var(--primary-soft);
  outline-offset: 2px;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (min-width: 481px) {
  .modal-overlay {
    align-items: center;
  }
  .modal-footer {
    flex-direction: row;
    justify-content: flex-end;
    gap: var(--space-3);
  }
  .btn-cancel,
  .btn-confirm {
    min-height: 40px;
    padding: var(--space-2) var(--space-4);
  }
}
</style>

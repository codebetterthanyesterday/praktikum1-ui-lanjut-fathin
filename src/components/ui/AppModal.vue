<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue'
import { TriangleAlert } from 'lucide-vue-next'

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
    default: 'Are you sure you want to proceed with this action?',
  },
  confirmText: {
    type: String,
    default: 'Yes, Proceed',
  },
  cancelText: {
    type: String,
    default: 'Cancel',
  },
})
const emit = defineEmits(['confirm', 'close'])

const cancelBtn = ref(null)
let lastFocused = null

const onKeydown = (e) => {
  if (e.key === 'Escape') emit('close')
}

// fokus ke tombol Cancel dulu biar ga kepencet confirm
watch(
  () => props.isOpen,
  async (open) => {
    if (open) {
      lastFocused = document.activeElement
      document.addEventListener('keydown', onKeydown)
      document.body.style.overflow = 'hidden'
      await nextTick()
      cancelBtn.value?.focus()
    } else {
      document.removeEventListener('keydown', onKeydown)
      document.body.style.overflow = ''
      lastFocused?.focus?.()
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
          class="modal-card"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-message"
        >
          <div class="modal-header">
            <TriangleAlert :size="26" class="modal-icon" />
            <h3 id="modal-title" class="modal-title">{{ title }}</h3>
          </div>

          <div class="modal-body">
            <p id="modal-message" class="modal-message">{{ message }}</p>
            <slot />
          </div>

          <div class="modal-footer">
            <button ref="cancelBtn" type="button" class="btn-cancel" @click="$emit('close')">
              {{ cancelText }}
            </button>
            <button type="button" class="btn-confirm" @click="$emit('confirm')">
              {{ confirmText }}
            </button>
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
  animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
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
  color: #f59f00;
  flex-shrink: 0;
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
  background: var(--danger);
  color: white;
  border: none;
}
.btn-confirm:hover {
  background: #d62828;
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

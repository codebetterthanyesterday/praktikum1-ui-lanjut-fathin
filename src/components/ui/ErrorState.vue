<script setup>
import { WifiOff } from 'lucide-vue-next'
import AppButton from '@/components/ui/AppButton.vue'
import { useLanguage } from '@/composables/useLanguage'

defineProps({
  title: {
    type: String,
    required: true,
  },
  error: {
    type: Object,
    default: null,
  },
  retrying: {
    type: Boolean,
    default: false,
  },
})
defineEmits(['retry'])

const { t } = useLanguage()
</script>

<template>
  <div class="error-state" role="alert">
    <WifiOff :size="40" :stroke-width="1.5" class="error-icon" />
    <span class="error-badge">{{ t('states.errorBadge') }}</span>
    <h3>{{ title }}</h3>
    <p>{{ error ? t(error.key, error.params) : t('api.network') }}</p>
    <AppButton variant="primary" :loading="retrying" @click="$emit('retry')">
      {{ t('states.retry') }}
    </AppButton>
  </div>
</template>

<style scoped>
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.error-icon {
  color: #dc2626;
  margin-bottom: var(--space-3);
}

h3 {
  font-size: 1.3rem;
  color: var(--text-main);
  margin-bottom: var(--space-2);
}

p {
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: var(--space-6);
  max-width: 460px;
  overflow-wrap: anywhere;
}
</style>

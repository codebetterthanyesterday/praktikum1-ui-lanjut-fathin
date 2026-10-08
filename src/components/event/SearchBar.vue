<script setup>
import { useLanguage } from '@/composables/useLanguage'

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})
defineEmits(['update:modelValue'])

const { t } = useLanguage()
</script>

<template>
  <div class="search-bar">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="t('events.searchPlaceholder')"
      :aria-label="t('events.searchPlaceholder')"
      class="search-input"
    />
  </div>
</template>

<style scoped>
.search-bar {
  width: 100%;
  max-width: 500px;
  margin-bottom: var(--space-4);
}

.search-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  color: var(--text-main);
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.search-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-soft);
}
</style>

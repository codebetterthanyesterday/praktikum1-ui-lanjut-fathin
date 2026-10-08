<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline'].includes(value),
  },
  to: {
    type: [String, Object],
    default: null,
  },
  type: {
    type: String,
    default: 'button',
  },
})
defineEmits(['click'])
</script>

<template>
  <component
    :is="to ? RouterLink : 'button'"
    :to="to || undefined"
    :type="to ? undefined : type"
    :class="['app-button', `btn-${variant}`]"
    @click="$emit('click', $event)"
  >
    <slot />
  </component>
</template>

<style scoped>
.app-button {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.5; /* biar tinggi <a> sama <button> sama */
  text-decoration: none;
  padding: var(--space-3) var(--space-8);
  border-radius: 12px;
  border: none;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  transition:
    transform 0.2s,
    background-color 0.2s;
}

.app-button:hover {
  transform: translateY(-2px);
}

.app-button:focus-visible {
  outline: 3px solid var(--primary-soft);
  outline-offset: 2px;
}

.btn-primary {
  background-color: var(--primary);
  color: white;
  box-shadow: 0 8px 20px rgba(102, 68, 255, 0.3);
}
.btn-primary:hover {
  background-color: var(--primary-hover);
}

.btn-secondary {
  background-color: #f0f0f0;
  color: var(--text-main);
}
.btn-secondary:hover {
  background-color: #e0e0e0;
}

.btn-outline {
  background-color: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
}
.btn-outline:hover {
  background-color: var(--primary-soft);
}
</style>

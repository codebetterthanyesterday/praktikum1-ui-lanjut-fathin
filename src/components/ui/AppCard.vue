<script setup>
defineProps({
  as: {
    type: String,
    default: 'div',
  },
  hoverable: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <component :is="as" :class="['app-card', { 'is-hoverable': hoverable }]">
    <slot />
  </component>
</template>

<style scoped>
.app-card {
  background: white;
  border-radius: var(--space-4);
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  overflow: hidden;
}

@media (hover: hover) {
  .app-card.is-hoverable:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.06);
  }
}
</style>

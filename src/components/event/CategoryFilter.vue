<script setup>
defineProps({
  categories: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    default: 'all',
  },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="category-filter">
    <button
      v-for="cat in categories"
      :key="cat.value"
      type="button"
      :class="['filter-btn', { active: modelValue === cat.value }]"
      :aria-pressed="modelValue === cat.value"
      @click="$emit('update:modelValue', cat.value)"
    >
      {{ cat.label }}
    </button>
  </div>
</template>

<style scoped>
/* di hp digeser ke samping, ga turun baris */
.category-filter {
  display: flex;
  gap: var(--space-2);
  overflow-x: auto;
  scrollbar-width: none;
  margin: -4px calc(-1 * var(--space-4)) calc(var(--space-6) - 4px);
  padding: 4px var(--space-4);
}
.category-filter::-webkit-scrollbar {
  display: none;
}

.filter-btn {
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  padding: var(--space-2) var(--space-4);
  border-radius: 50px;
  min-height: 44px;
  flex-shrink: 0;
  white-space: nowrap;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-muted);
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.filter-btn:focus-visible {
  outline: 3px solid var(--primary-soft);
  outline-offset: 2px;
}

.filter-btn.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

@media (min-width: 769px) {
  .category-filter {
    flex-wrap: wrap;
    overflow: visible;
    margin: 0 0 var(--space-6);
    padding: 0;
  }
  .filter-btn {
    min-height: 0;
  }
}
</style>

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
.category-filter {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  margin-bottom: var(--space-6);
}

.filter-btn {
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  padding: var(--space-2) var(--space-4);
  border-radius: 50px;
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
</style>

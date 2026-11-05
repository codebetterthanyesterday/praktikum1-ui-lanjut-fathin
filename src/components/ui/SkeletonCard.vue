<template>
  <div class="skeleton-card" aria-hidden="true">
    <div class="skeleton-row">
      <span class="skeleton-line skeleton-shimmer chip"></span>
      <span class="skeleton-line skeleton-shimmer chip short"></span>
    </div>
    <span class="skeleton-line skeleton-shimmer title"></span>
    <span class="skeleton-line skeleton-shimmer loc"></span>
    <span class="skeleton-line skeleton-shimmer desc"></span>
    <span class="skeleton-line skeleton-shimmer desc"></span>
    <span class="skeleton-line skeleton-shimmer desc half"></span>
  </div>
</template>

<style scoped>
.skeleton-row {
  display: flex;
  justify-content: space-between;
}

.skeleton-line {
  display: block;
  height: 14px;
  border-radius: 6px;
}

.chip {
  width: 38%;
  height: 22px;
}
.chip.short {
  width: 22%;
}
.title {
  width: 75%;
  height: 22px;
}
.loc {
  width: 55%;
}
.desc {
  width: 100%;
}
.desc.half {
  width: 60%;
}
</style>

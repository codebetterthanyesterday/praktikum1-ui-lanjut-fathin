<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLanguage } from '@/composables/useLanguage'

const route = useRoute()
const { t } = useLanguage()

const breadcrumbKeys = {
  'Home': 'nav.home',
  'About': 'nav.about',
  'Browse': 'nav.browse',
  'Event List': 'nav.eventList',
  'Event Detail': 'nav.eventDetail',
  'Category': 'nav.category',
  'Contact': 'nav.contact'
}

const translateBreadcrumb = (crumb) => {
  const key = breadcrumbKeys[crumb]
  if (key) {
    let trans = t(key)
    if (crumb === 'Event Detail') {
      trans = trans.replace(' (Sample)', '').replace(' (Contoh)', '')
    }
    return trans
  }
  return crumb
}

const breadcrumbs = computed(() => {
  const matched = route.matched
  let crumbs = matched
    .map((m) => {
      let path = m.path
      if (path.includes(':')) {
        path = route.path
      }
      return {
        name: m.name,
        path: path,
        meta: m.meta,
      }
    })
    .filter((m) => m.meta && m.meta.breadcrumb)

  if (route.name === 'event-detail') {
    crumbs.splice(crumbs.length - 1, 0, {
      path: '/browse/events',
      meta: { breadcrumb: 'Event List' },
    })
  }

  if (crumbs.length === 0 || crumbs[0].meta.breadcrumb !== 'Home') {
    crumbs.unshift({
      path: '/',
      meta: { breadcrumb: 'Home' },
    })
  }

  return crumbs
})
</script>

<template>
  <nav class="breadcrumb" v-if="breadcrumbs.length > 0">
    <ul>
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <span v-if="index > 0" class="separator">/</span>
        <router-link v-if="index < breadcrumbs.length - 1" :to="crumb.path">
          {{ translateBreadcrumb(crumb.meta.breadcrumb) }}
        </router-link>
        <span v-else class="active-crumb">{{ translateBreadcrumb(crumb.meta.breadcrumb) }}</span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.breadcrumb {
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}
.breadcrumb ul {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  align-items: center;
  gap: 0.5rem;
}
.breadcrumb a {
  text-decoration: none;
  color: var(--primary, #6644ff);
  font-weight: 500;
}
.breadcrumb a:hover {
  text-decoration: underline;
}
.separator {
  color: #888;
  margin: 0 0.5rem;
}
.active-crumb {
  color: #333;
  font-weight: 600;
}
@media (prefers-color-scheme: dark) {
  .active-crumb {
    color: #ccc;
  }
}
</style>

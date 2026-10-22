<script setup>
import { computed } from 'vue'
import { ArrowRight, CalendarPlus } from 'lucide-vue-next'
import AppCard from '@/components/ui/AppCard.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useEvents } from '@/composables/useEvents'
import { useLanguage } from '@/composables/useLanguage'

const { events, totalEvents, activeEvents, completedEvents } = useEvents()
const { t, formatDateTime } = useLanguage()

const metrics = computed(() => [
  { label: t('dashboard.totalEvents'), value: totalEvents.value, hint: t('dashboard.totalHint') },
  {
    label: t('dashboard.activeEvents'),
    value: activeEvents.value.length,
    hint: t('dashboard.activeHint'),
    tone: 'text-success',
  },
  {
    label: t('dashboard.completedEvents'),
    value: completedEvents.value.length,
    hint: t('dashboard.completedHint'),
    tone: 'text-dim',
  },
])
</script>

<template>
  <div class="dashboard-overview">
    <div class="dashboard-header">
      <div>
        <h2>{{ t('dashboard.heading') }}</h2>
        <p class="subtitle">{{ t('dashboard.subtitle') }}</p>
      </div>
      <AppButton variant="primary" to="/dashboard/events">
        {{ t('dashboard.manageBtn') }} &rarr;
      </AppButton>
    </div>

    <div class="metrics-grid">
      <AppCard v-for="metric in metrics" :key="metric.label" class="metric-card" :hoverable="false">
        <h3>{{ metric.label }}</h3>
        <p :class="['metric-value', metric.tone]">{{ metric.value }}</p>
        <span class="metric-hint">{{ metric.hint }}</span>
      </AppCard>
    </div>

    <div class="data-table-container">
      <div class="table-header">
        <div>
          <h3>{{ t('dashboard.tableTitle') }}</h3>
          <p class="table-subtitle">{{ t('dashboard.tableSubtitle') }}</p>
        </div>
        <RouterLink to="/dashboard/events" class="btn-manage-link">
          {{ t('dashboard.openManagement') }} <ArrowRight :size="16" />
        </RouterLink>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>{{ t('dashboard.colTitle') }}</th>
            <th>{{ t('dashboard.colCategory') }}</th>
            <th>{{ t('dashboard.colDateLoc') }}</th>
            <th>{{ t('dashboard.colQuota') }}</th>
            <th>{{ t('dashboard.colStatus') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="events.length === 0" class="empty-row">
            <td colspan="5" class="empty-table-cell">
              <div class="empty-table-content">
                <CalendarPlus :size="40" :stroke-width="1.5" class="empty-icon" />
                <p>{{ t('dashboard.tableEmpty') }}</p>
                <AppButton variant="primary" to="/dashboard/events">
                  {{ t('dashboard.createFirst') }}
                </AppButton>
              </div>
            </td>
          </tr>
          <tr v-for="item in events" :key="item.id">
            <td class="cell-title">{{ item.title }}</td>
            <td class="cell-cat">
              <span class="category-badge">{{ t(`events.categories.${item.cat}`) }}</span>
            </td>
            <td class="cell-meta">{{ formatDateTime(item.date) }} &bull; {{ item.loc }}</td>
            <td class="cell-quota">{{ t('dashboard.pax', { n: item.quota }) }}</td>
            <td class="cell-status">
              <span :class="['status-badge', item.done ? 'status-completed' : 'status-active']">
                {{ item.done ? t('dashboard.statusCompleted') : t('dashboard.statusActive') }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.dashboard-overview {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.dashboard-header h2 {
  font-size: clamp(1.4rem, 5vw, 2rem);
  color: var(--text-main);
  margin-bottom: var(--space-1);
}

.subtitle {
  color: var(--text-muted);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.metric-card {
  padding: var(--space-3);
}

.metric-card h3 {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: var(--space-2);
}

.metric-value {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--primary);
  line-height: 1;
}

.metric-hint {
  display: none;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.text-success {
  color: var(--success);
}
.text-dim {
  color: #8a8d93;
}

.data-table-container {
  background: white;
  padding: var(--space-4);
  border-radius: var(--space-4);
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
}

.table-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.table-header h3 {
  font-size: 1.15rem;
  margin-bottom: var(--space-1);
}

.table-subtitle {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.btn-manage-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  min-height: 44px;
  color: var(--primary);
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
}
.btn-manage-link:hover {
  text-decoration: underline;
}

/* di hp tiap baris ditumpuk jadi kartu kecil, ga perlu geser ke samping */
.data-table,
.data-table tbody {
  display: block;
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  display: none;
}

.data-table tbody tr {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas:
    'title status'
    'meta meta'
    'cat quota';
  gap: var(--space-1) var(--space-3);
  align-items: center;
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--border-color);
}
.data-table tbody tr:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.data-table td {
  display: block;
  font-size: 0.875rem;
  color: var(--text-muted);
}

.data-table .cell-title {
  grid-area: title;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-main);
  overflow-wrap: anywhere;
}
.data-table .cell-status {
  grid-area: status;
  justify-self: end;
}
.data-table .cell-meta {
  grid-area: meta;
}
.data-table .cell-cat {
  grid-area: cat;
}
.data-table .cell-quota {
  grid-area: quota;
  justify-self: end;
}

.data-table .empty-row {
  display: block;
}

.category-badge,
.status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 50px;
  font-size: 0.8rem;
  white-space: nowrap;
}

.category-badge {
  background: var(--primary-soft);
  color: var(--primary);
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge {
  font-weight: 700;
}
.status-active {
  background: var(--success-soft);
  color: var(--success);
}
.status-completed {
  background: rgba(108, 117, 125, 0.15);
  color: #5c636a;
}

.empty-table-cell {
  text-align: center;
  padding: var(--space-8) var(--space-4);
  background: var(--bg-light);
  border-radius: var(--space-3);
}

.empty-table-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}
.empty-icon {
  color: var(--primary);
}
.empty-table-content p {
  color: var(--text-muted);
  margin-bottom: var(--space-2);
}

@media (min-width: 769px) {
  .dashboard-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-8);
  }

  .metrics-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: var(--space-6);
    margin-bottom: var(--space-8);
  }
  .metric-card {
    padding: var(--space-6);
  }
  .metric-card h3 {
    font-size: 0.95rem;
  }
  .metric-value {
    font-size: 2.6rem;
    margin-bottom: var(--space-2);
  }
  .metric-hint {
    display: inline;
  }

  .data-table-container {
    padding: var(--space-6);
  }
  .table-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-6);
  }
  .table-header h3 {
    font-size: 1.3rem;
  }

  .data-table {
    display: table;
  }
  .data-table thead {
    display: table-header-group;
  }
  .data-table tbody {
    display: table-row-group;
  }
  .data-table tbody tr,
  .data-table .empty-row {
    display: table-row;
  }
  .data-table th,
  .data-table td {
    display: table-cell;
    padding: var(--space-3) var(--space-4);
    text-align: left;
    vertical-align: middle;
    border-bottom: 1px solid var(--border-color);
  }
  .data-table th {
    background: var(--bg-light);
    color: var(--text-muted);
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .data-table td {
    font-size: 0.95rem;
    color: var(--text-main);
  }
  .data-table .cell-title {
    font-size: 0.95rem;
  }
  .data-table tbody tr:last-child td {
    border-bottom: none;
  }
  .data-table .empty-table-cell {
    text-align: center;
    padding: var(--space-12) var(--space-4);
  }
}
</style>

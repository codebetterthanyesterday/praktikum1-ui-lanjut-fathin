<script setup>
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { events } from '@/data/events'

const { t, formatDate } = useLanguage()

const metrics = computed(() => [
  { label: t('dashboard.ticketsSold'), value: '1,245' },
  { label: t('dashboard.pageViews'), value: '8,302' },
  { label: t('dashboard.revenue'), value: '$12,450' },
])

// data dummy
const registrations = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `John Doe ${i + 1}`,
  event: events[i % events.length].title,
  date: `2026-10-${String(11 + i).padStart(2, '0')}`,
}))
</script>

<template>
  <div class="dashboard-overview">
    <h2>{{ t('dashboard.welcome') }}</h2>

    <div class="metrics-grid">
      <div class="metric-card" v-for="metric in metrics" :key="metric.label">
        <h3>{{ metric.label }}</h3>
        <p class="metric-value">{{ metric.value }}</p>
      </div>
    </div>

    <div class="data-table-container">
      <h3>{{ t('dashboard.recent') }}</h3>
      <div class="table-scroll">
        <table class="data-table">
          <thead>
            <tr>
              <th>{{ t('dashboard.colName') }}</th>
              <th>{{ t('dashboard.colEvent') }}</th>
              <th>{{ t('dashboard.colDate') }}</th>
              <th>{{ t('dashboard.colStatus') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in registrations" :key="row.id">
              <td class="cell-name">{{ row.name }}</td>
              <td class="cell-event">{{ row.event }}</td>
              <td class="cell-date">{{ formatDate(row.date) }}</td>
              <td class="cell-status">
                <span class="status-badge">{{ t('dashboard.confirmed') }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-overview h2 {
  margin-bottom: var(--space-4);
  font-size: 1.25rem;
  color: var(--text-main);
}

.metrics-grid {
  display: grid;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.metric-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  background: white;
  padding: var(--space-4);
  border-radius: var(--space-3);
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.metric-card h3 {
  font-size: 0.95rem;
  color: var(--text-muted);
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
}

.data-table-container {
  background: white;
  padding: var(--space-4);
  border-radius: var(--space-3);
  border: 1px solid var(--border-color);
}

.data-table-container h3 {
  margin-bottom: var(--space-2);
  font-size: 1.1rem;
}

.table-scroll {
  overflow-x: auto;
}

/* di hp tiap baris tabel ditumpuk jadi 2 baris, ga perlu geser ke samping */
.data-table {
  display: block;
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  display: none;
}

.data-table tbody {
  display: block;
}

.data-table tbody tr {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 2px var(--space-3);
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
  color: var(--text-muted);
  font-size: 0.875rem;
}

.data-table .cell-name {
  grid-area: 1 / 1;
  color: var(--text-main);
  font-size: 1rem;
  font-weight: 600;
}

.data-table .cell-status {
  grid-area: 1 / 2;
  justify-self: end;
}

.data-table .cell-event {
  grid-area: 2 / 1;
}

.data-table .cell-date {
  grid-area: 2 / 2;
  justify-self: end;
}

.status-badge {
  background: var(--success-soft);
  color: var(--success);
  padding: var(--space-1) var(--space-2);
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

@media (min-width: 769px) {
  .dashboard-overview h2 {
    margin-bottom: var(--space-6);
    font-size: 1.5rem;
  }

  .metrics-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-6);
    margin-bottom: var(--space-8);
  }
  .metric-card {
    display: block;
    padding: var(--space-6);
  }
  .metric-card h3 {
    font-size: 1rem;
    margin-bottom: var(--space-2);
  }
  .metric-value {
    font-size: 2.2rem;
  }

  .data-table-container {
    padding: var(--space-6);
  }
  .data-table-container h3 {
    margin-bottom: var(--space-4);
    font-size: 1.2rem;
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
  .data-table tbody tr {
    display: table-row;
    border-bottom: none;
  }
  .data-table th,
  .data-table td {
    display: table-cell;
    padding: var(--space-3) var(--space-4);
    text-align: left;
    border-bottom: 1px solid var(--border-color);
    white-space: nowrap;
  }
  .data-table th {
    background: var(--bg-gray);
    color: var(--text-muted);
    font-weight: 600;
    font-size: 0.9rem;
  }
  .data-table td,
  .data-table .cell-name {
    color: var(--text-main);
    font-size: 0.95rem;
    font-weight: 400;
  }
  .data-table tbody tr:last-child td {
    border-bottom: none;
  }
}
</style>

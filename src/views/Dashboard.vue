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

// Data contoh: cukup banyak baris agar pane benar-benar bisa digulir secara mandiri
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

    <!-- GROUPING & PROXIMITY:
         Data metrik dikelompokkan ke dalam kartu agar mudah dibaca sekilas. -->
    <div class="metrics-grid">
      <div class="metric-card" v-for="metric in metrics" :key="metric.label">
        <h3>{{ metric.label }}</h3>
        <p class="metric-value">{{ metric.value }}</p>
      </div>
    </div>

    <!-- DATA DENSITY & F-PATTERN:
         Tabel memaksimalkan kepadatan informasi agar mata dapat
         melakukan scanning baris demi baris (F-Pattern). -->
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
              <td>{{ row.name }}</td>
              <td>{{ row.event }}</td>
              <td>{{ formatDate(row.date) }}</td>
              <td>
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
  margin-bottom: var(--space-6);
  color: var(--text-main);
}

/* GRID untuk menyusun metrik secara proporsional */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.metric-card {
  background: white;
  padding: var(--space-6);
  border-radius: var(--space-3);
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

/* SCALE: label kecil & redup, angka besar & berwarna -> angka terbaca lebih dulu */
.metric-card h3 {
  font-size: 1rem;
  color: var(--text-muted);
  margin-bottom: var(--space-2);
}

.metric-value {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--primary);
}

/* TABLE STYLES - Mengutamakan kerapian baris untuk Data Density */
.data-table-container {
  background: white;
  padding: var(--space-6);
  border-radius: var(--space-3);
  border: 1px solid var(--border-color);
}

.data-table-container h3 {
  margin-bottom: var(--space-4);
  font-size: 1.2rem;
}

/* Di layar sempit tabel digulir horizontal di sini, bukan membuat seluruh halaman melebar */
.table-scroll {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
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

.data-table td {
  color: var(--text-main);
  font-size: 0.95rem;
}

.data-table tbody tr:last-child td {
  border-bottom: none;
}

.status-badge {
  background: var(--success-soft);
  color: var(--success);
  padding: var(--space-1) var(--space-2);
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}
</style>

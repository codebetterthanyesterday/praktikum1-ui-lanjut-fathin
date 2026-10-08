<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
</script>

<template>
  <!-- RAIL & PANE SYSTEM
       Kerangka khusus untuk kebutuhan produktivitas/pengelolaan aplikasi. -->
  <div class="dashboard-layout">
    <!-- RAIL: Navigasi samping yang posisinya terkunci -->
    <aside class="dashboard-rail">
      <div class="rail-brand">
        <RouterLink to="/">{{ t('dashboard.brand') }}</RouterLink>
      </div>
      <nav class="rail-nav">
        <RouterLink to="/dashboard" class="rail-link" exact-active-class="active">
          {{ t('dashboard.overview') }}
        </RouterLink>
        <a href="#" class="rail-link" @click.prevent>{{ t('dashboard.myEvents') }}</a>
        <a href="#" class="rail-link" @click.prevent>{{ t('dashboard.attendees') }}</a>
        <a href="#" class="rail-link" @click.prevent>{{ t('dashboard.checkin') }}</a>
      </nav>
      <div class="rail-footer">
        <RouterLink to="/" class="rail-link">&larr; {{ t('dashboard.back') }}</RouterLink>
      </div>
    </aside>

    <!-- PANE: Area utama dinamis tempat konten berubah dan bisa digulir secara mandiri -->
    <main class="dashboard-pane">
      <header class="pane-header">
        <h1>{{ t('dashboard.title') }}</h1>
        <div class="user-profile">{{ t('dashboard.admin') }}</div>
      </header>
      <div class="pane-content">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
/*
  Full-screen app layout (khas dashboard).
  Tinggi dibatasi setinggi viewport agar rail tidak ikut tergulir saat pane di-scroll.
  100dvh mengoreksi 100vh pada browser mobile yang address bar-nya bisa menyusut.
*/
.dashboard-layout {
  display: flex;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  background-color: var(--bg-gray);
}

/* RAIL STYLES */
.dashboard-rail {
  width: 260px;
  flex-shrink: 0;
  background-color: var(--nav-bg); /* Kontras gelap membedakan area nav dan konten */
  color: white;
  display: flex;
  flex-direction: column;
}

.rail-brand {
  padding: var(--space-6);
  font-size: 1.2rem;
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.rail-brand a {
  color: white;
  text-decoration: none;
}

.rail-nav {
  flex: 1;
  padding: var(--space-6) 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

/* Border kiri transparan disiapkan sejak awal agar teks tidak bergeser saat hover/aktif */
.rail-link {
  padding: var(--space-3) var(--space-6);
  color: #a0a0b0;
  text-decoration: none;
  font-weight: 500;
  border-left: 4px solid transparent;
  transition:
    background-color 0.2s,
    color 0.2s,
    border-color 0.2s;
}
.rail-link:hover,
.rail-link.active {
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  border-left-color: var(--primary);
}

.rail-footer {
  display: flex;
  flex-direction: column;
  padding: var(--space-4) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* PANE STYLES */
.dashboard-pane {
  flex: 1;
  min-width: 0; /* izinkan pane menyusut; tabel lebar digulir di dalam kontainernya sendiri */
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Scroll khusus untuk area ini saja */
}

.pane-header {
  position: sticky;
  top: 0;
  z-index: 1;
  background: white;
  padding: var(--space-4) var(--space-8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}
.pane-header h1 {
  font-size: 1.5rem;
}

.user-profile {
  color: var(--primary);
  font-weight: 600;
}

.pane-content {
  padding: var(--space-8);
}

/* Layar sempit: rail menjadi bilah atas yang tetap terkunci, pane tetap satu-satunya area gulir */
@media (max-width: 768px) {
  .dashboard-layout {
    flex-direction: column;
  }
  .dashboard-rail {
    width: 100%;
    flex-direction: row;
    align-items: center;
  }
  .rail-brand {
    padding: var(--space-3) var(--space-4);
    font-size: 1rem;
    border-bottom: none;
    white-space: nowrap;
  }
  .rail-nav {
    flex-direction: row;
    padding: 0;
    overflow-x: auto;
    overflow-y: hidden;
  }
  .rail-link {
    padding: var(--space-3) var(--space-3);
    white-space: nowrap;
    border-left: none;
    border-bottom: 3px solid transparent;
  }
  .rail-link:hover,
  .rail-link.active {
    border-bottom-color: var(--primary);
  }
  .rail-footer {
    display: none;
  }
  .pane-header {
    padding: var(--space-3) var(--space-4);
  }
  .pane-content {
    padding: var(--space-4);
  }
}
</style>

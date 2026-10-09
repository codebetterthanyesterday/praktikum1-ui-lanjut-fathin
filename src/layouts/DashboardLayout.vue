<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { LayoutDashboard, CalendarDays, Users, QrCode, ArrowLeft } from 'lucide-vue-next'
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
</script>

<template>
  <div class="dashboard-layout">
    <aside class="dashboard-rail">
      <div class="rail-brand">
        <RouterLink to="/">{{ t('dashboard.brand') }}</RouterLink>
      </div>
      <nav class="rail-nav">
        <RouterLink to="/dashboard" class="rail-link" exact-active-class="active">
          <LayoutDashboard :size="20" class="rail-icon" />
          <span>{{ t('dashboard.overview') }}</span>
        </RouterLink>
        <a href="#" class="rail-link" @click.prevent>
          <CalendarDays :size="20" class="rail-icon" />
          <span>{{ t('dashboard.myEvents') }}</span>
        </a>
        <a href="#" class="rail-link" @click.prevent>
          <Users :size="20" class="rail-icon" />
          <span>{{ t('dashboard.attendees') }}</span>
        </a>
        <a href="#" class="rail-link" @click.prevent>
          <QrCode :size="20" class="rail-icon" />
          <span>{{ t('dashboard.checkin') }}</span>
        </a>
      </nav>
      <div class="rail-footer">
        <RouterLink to="/" class="rail-link">&larr; {{ t('dashboard.back') }}</RouterLink>
      </div>
    </aside>

    <main class="dashboard-pane">
      <header class="pane-header">
        <RouterLink to="/" class="back-link" :aria-label="t('dashboard.back')">
          <ArrowLeft :size="22" />
        </RouterLink>
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
/* tinggi dikunci segini biar yang scroll cuma bagian pane.
   di hp rail-nya jadi tab bar di bawah (column-reverse) */
.dashboard-layout {
  display: flex;
  flex-direction: column-reverse;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  background-color: var(--bg-gray);
}

.dashboard-rail {
  flex-shrink: 0;
  background-color: var(--nav-bg);
  color: white;
  padding-bottom: env(safe-area-inset-bottom);
}

.rail-brand,
.rail-footer {
  display: none;
}
.rail-brand a {
  color: white;
  text-decoration: none;
}

.rail-nav {
  display: flex;
}

.rail-link {
  flex: 1;
  min-width: 0;
  min-height: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: var(--space-2) var(--space-1);
  color: #a0a0b0;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
  border-top: 3px solid transparent;
  transition:
    background-color 0.2s,
    color 0.2s,
    border-color 0.2s;
}
.rail-link:hover,
.rail-link.active {
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  border-color: var(--primary);
}

.dashboard-pane {
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.pane-header {
  position: sticky;
  top: 0;
  z-index: 1;
  background: white;
  padding: var(--space-2) var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-1);
  border-bottom: 1px solid var(--border-color);
}
.pane-header h1 {
  flex: 1;
  font-size: 1.25rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-left: calc(-1 * var(--space-3));
  color: var(--text-main);
}

.user-profile {
  color: var(--primary);
  font-weight: 600;
}

.pane-content {
  padding: var(--space-4);
}

@media (min-width: 769px) {
  .dashboard-layout {
    flex-direction: row;
  }

  .dashboard-rail {
    width: 260px;
    display: flex;
    flex-direction: column;
    padding-bottom: 0;
  }
  .rail-brand {
    display: block;
    padding: var(--space-6);
    font-size: 1.2rem;
    font-weight: 700;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .rail-nav {
    flex: 1;
    flex-direction: column;
    padding: var(--space-6) 0;
    overflow-y: auto;
  }
  .rail-link {
    flex: none;
    display: block;
    min-height: 0;
    padding: var(--space-3) var(--space-6);
    font-size: 1rem;
    text-align: left;
    border-top: none;
    border-left: 4px solid transparent;
  }
  .rail-link:hover,
  .rail-link.active {
    border-left-color: var(--primary);
  }
  .rail-icon {
    display: none;
  }
  .rail-footer {
    display: flex;
    flex-direction: column;
    padding: var(--space-4) 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .pane-header {
    padding: var(--space-4) var(--space-8);
  }
  .pane-header h1 {
    font-size: 1.5rem;
  }
  .back-link {
    display: none;
  }
  .pane-content {
    padding: var(--space-8);
  }
}
</style>

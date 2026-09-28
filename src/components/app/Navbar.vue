<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLanguage } from '@/composables/useLanguage'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const route = useRoute()
const { locale, toggleLocale, t } = useLanguage()

const menus = computed(() => [
  { name: t('nav.home'), path: '/' },
  { name: t('nav.about'), path: '/about' },
  {
    name: t('nav.browse'),
    path: '/browse',
    children: [
      {
        name: t('nav.eventList'),
        path: '/browse/events',
        children: [{ name: t('nav.eventDetail'), path: '/browse/events/1' }],
      },
      { name: t('nav.category'), path: '/browse/category' },
    ],
  },
  { name: t('nav.contact'), path: '/contact' },
])

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-container">
      <router-link to="/" class="logo">
        <svg
          width="28"
          height="32"
          viewBox="0 0 24 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="logo-icon"
        >
          <path d="M12 0L22.3923 6V18L12 24L1.6077 18V6L12 0Z" fill="white" />
          <path
            d="M15 9.5 C15 9.5 14 8 12 8 C9.5 8 8 10 8 12.5 C8 15 9.5 17 12 17 C14 17 15 16 15.5 14.5 V 12.5 H 12.5"
            stroke="#1A1643"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span class="logo-text">Gatherly</span>
      </router-link>

      <ul class="nav-menu">
        <li class="nav-item" v-for="menu in menus" :key="menu.name">
          <router-link
            :to="menu.path"
            class="nav-link"
            :class="{
              active:
                route.path === menu.path || (menu.path !== '/' && route.path.startsWith(menu.path)),
            }"
          >
            {{ menu.name }}
            <svg
              v-if="menu.children"
              class="dropdown-indicator"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </router-link>

          <!-- First Level Dropdown -->
          <ul v-if="menu.children" class="dropdown-menu">
            <li v-for="child in menu.children" :key="child.name" class="dropdown-item">
              <router-link :to="child.path" class="dropdown-link">
                {{ child.name }}
                <svg
                  v-if="child.children"
                  class="submenu-indicator"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </router-link>

              <!-- Second Level Dropdown (Submenu) -->
              <ul v-if="child.children" class="submenu">
                <li v-for="subchild in child.children" :key="subchild.name" class="submenu-item">
                  <router-link :to="subchild.path" class="dropdown-link">
                    {{ subchild.name }}
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>

      <div class="nav-right">
        <div class="lang-selector" @click="toggleLocale" title="Switch Language">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path
              d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
            ></path>
          </svg>
          <span class="lang-text">{{ locale }}</span>
        </div>

        <button class="hamburger-btn" @click="toggleMobileMenu">
          <svg
            v-if="!isMobileMenuOpen"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
          <svg
            v-else
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="mobile-menu" :class="{ 'is-open': isMobileMenuOpen }">
      <ul class="mobile-nav-menu">
        <li class="mobile-nav-item" v-for="menu in menus" :key="menu.name">
          <router-link
            :to="menu.path"
            class="mobile-nav-link"
            :class="{
              active:
                route.path === menu.path || (menu.path !== '/' && route.path.startsWith(menu.path)),
            }"
            @click="isMobileMenuOpen = false"
          >
            {{ menu.name }}
          </router-link>

          <ul v-if="menu.children" class="mobile-submenu">
            <li v-for="child in menu.children" :key="child.name" class="mobile-submenu-item">
              <router-link
                :to="child.path"
                class="mobile-nav-link mobile-sublink"
                @click="isMobileMenuOpen = false"
              >
                {{ child.name }}
              </router-link>

              <ul v-if="child.children" class="mobile-sub-submenu">
                <li
                  v-for="subchild in child.children"
                  :key="subchild.name"
                  class="mobile-sub-submenu-item"
                >
                  <router-link
                    :to="subchild.path"
                    class="mobile-nav-link mobile-sub-sublink"
                    @click="isMobileMenuOpen = false"
                  >
                    {{ subchild.name }}
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
/* NAVBAR FULL-WIDTH menyatu dengan bagian atas layar */
.navbar {
  width: 100%;
  background: var(--nav-bg, #1c1948);
  border-bottom: 1px solid var(--nav-border, #333);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 999;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0.85rem 2rem;
}

.navbar.scrolled {
  background: rgba(28, 25, 72, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--text-white, #fff);
  padding-right: 2rem;
  transition: transform 0.3s ease;
}
.logo:hover {
  transform: translateY(-2px);
}
.logo-icon {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.logo:hover .logo-icon {
  transform: rotate(15deg) scale(1.1);
}
.logo-text {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  justify-content: center;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 1rem 0; /* Memberi ruang hover */
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--text-white, #fff);
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.5rem 1.25rem;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.nav-link.active {
  background-color: var(--primary, #6644ff);
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(102, 68, 255, 0.3);
}
.nav-link.active:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 68, 255, 0.5);
}
.nav-link:not(.active):hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.dropdown-indicator {
  transition: transform 0.3s ease;
}
.nav-item:hover .dropdown-indicator {
  transform: rotate(180deg);
}

/* ==================================
   DROPDOWN & SUBMENU STYLES
   Inspired by user reference image
   ================================== */
.dropdown-menu {
  display: none; /* diubah jadi block saat hover */
  position: absolute;
  top: 100%;
  left: 0;

  background-color: #d8d8d8; /* warna abu seperti referensi */
  min-width: 200px;
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

/* Tampilkan dropdown level 1 saat nav-item di-hover */
.nav-item:hover .dropdown-menu {
  display: block;
  animation: fadeIn 0.2s ease-out;
}

.dropdown-item {
  position: relative; /* relative untuk submenu absolut */
}

.dropdown-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  text-decoration: none;
  color: #333; /* text gelap */
  font-size: 0.95rem;
  transition:
    background-color 0.2s,
    color 0.2s;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.dropdown-link:hover {
  background-color: #c4c4c4; /* efek hover lebih gelap sedikit */
  color: #000;
}

/* Hilangkan border bawah pada item terakhir */
.dropdown-item:last-child .dropdown-link {
  border-bottom: none;
}

/* Submenu (Level 2) */
.submenu {
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
  background-color: #d8d8d8;
  min-width: 220px;
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

/* Tampilkan submenu level 2 saat dropdown-item di-hover */
.dropdown-item:hover .submenu {
  display: block;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Submenu pada parent (jika left:100% terlalu mentok layar)
   Kita bisa membiarkannya default left 100%.
*/

/* ==================================
   RIGHT SECTION
   ================================== */
.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.lang-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-white, #fff);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}
.lang-selector:hover {
  background: rgba(255, 255, 255, 0.1);
}
.lang-selector:hover .chevron {
  transform: translateY(2px);
}
.chevron {
  transition: transform 0.3s ease;
  margin-top: 2px;
}

.hamburger-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  color: var(--text-white, #fff);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hamburger-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.05);
}

@media (max-width: 900px) {
  .nav-menu {
    gap: 1rem;
  }
}
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  .nav-right {
    gap: 0.75rem;
  }
  .lang-selector {
    padding: 0.25rem 0.5rem;
  }
  .hamburger-btn {
    display: flex;
  }
}
@media (min-width: 769px) {
  .hamburger-btn {
    display: none;
  }
  .mobile-menu {
    display: none !important;
  }
}

/* Mobile Menu Styles */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: calc(100vh - 70px);
  background: rgba(15, 12, 41, 0.98);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  padding: 0;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.mobile-menu.is-open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  padding: 2.5rem 2rem 5rem;
}

.mobile-nav-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

/* Staggered Animation Setup */
.mobile-nav-item {
  opacity: 0;
  transform: translateY(15px);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.mobile-menu.is-open .mobile-nav-item {
  opacity: 1;
  transform: translateY(0);
}

/* Delay for each item to create a cascading effect */
.mobile-menu.is-open .mobile-nav-item:nth-child(1) {
  transition-delay: 0.1s;
}
.mobile-menu.is-open .mobile-nav-item:nth-child(2) {
  transition-delay: 0.15s;
}
.mobile-menu.is-open .mobile-nav-item:nth-child(3) {
  transition-delay: 0.2s;
}
.mobile-menu.is-open .mobile-nav-item:nth-child(4) {
  transition-delay: 0.25s;
}
.mobile-menu.is-open .mobile-nav-item:nth-child(5) {
  transition-delay: 0.3s;
}
.mobile-menu.is-open .mobile-nav-item:nth-child(6) {
  transition-delay: 0.35s;
}

.mobile-nav-link {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}

.mobile-nav-link:hover,
.mobile-nav-link.active {
  color: #fff;
  transform: translateX(12px);
}

/* Highlight accent for active link */
.mobile-nav-link.active::before {
  content: '';
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary, #6644ff);
  margin-right: 12px;
  box-shadow: 0 0 10px var(--primary, #6644ff);
}

.mobile-submenu {
  list-style: none;
  padding-left: 2rem;
  margin-top: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border-left: 2px solid rgba(255, 255, 255, 0.08);
}

.mobile-sublink {
  font-size: 1.35rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
}

.mobile-sublink:hover,
.mobile-sublink.active {
  color: #fff;
  transform: translateX(8px);
}

.mobile-sub-submenu {
  list-style: none;
  padding-left: 1.5rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
}

.mobile-sub-sublink {
  font-size: 1.15rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.4);
}

.mobile-sub-sublink:hover,
.mobile-sub-sublink.active {
  color: #fff;
  transform: translateX(6px);
}
</style>

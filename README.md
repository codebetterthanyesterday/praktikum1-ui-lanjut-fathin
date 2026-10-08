# Gatherly

![Vue.js](https://img.shields.io/badge/vue-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

Gatherly is a modern, premium web application designed to connect people through curated events and communities. Built with **Vue 3** and **Vite**, this project features dynamic routing, end-to-end bilingual support, and a highly responsive glassmorphism UI.

---

## 🌟 Key Features

- **Premium UI/UX**: Custom glassmorphism design (`backdrop-filter: blur()`), elegant typography, and buttery-smooth cascading CSS animations.
- **Dependency-Free i18n**: Fully integrated English (EN) and Indonesian (ID) localization using a custom, lightweight Vue composable (`useLanguage.js`) without heavy third-party packages.
- **Fully Responsive**: A seamless mobile experience with a custom animated hamburger menu and mobile-optimized layouts.
- **Dynamic Routing**: Built-in Vue Router configuration supporting nested routes, dynamic active states, and custom animated Breadcrumb navigation.
- **Modern Iconography**: Beautiful and consistent SVG icons provided by `lucide-vue-next`.

## 📐 Layout System & Visual Hierarchy (Modul 2)

| Concept | Where | How |
| --- | --- | --- |
| Spatial system (base-8) & color tokens | `src/assets/main.css` | `--space-*` and color variables used by every Modul 2 component |
| The Fold & Z-Pattern | `views/Home.vue` | `min-height: 65vh` hero keeps the primary CTA above the fold; navbar → headline → CTA → feature grid |
| Adaptive grid & common regions | `views/EventList.vue` | `repeat(auto-fill, minmax(320px, 1fr))`, bordered cards group date, title and description |
| Asymmetrical layout, F-Pattern & focal point | `views/EventDetail.vue` | `2fr 1fr` grid, headings + agenda list on the left, sticky ticket card with the highest-contrast button on the right |
| Rail & Pane (data density) | `layouts/DashboardLayout.vue`, `views/Dashboard.vue` | Locked `100vh` shell, static rail, independently scrolling pane with a dense table |

## 📂 Project Structure

```text
src/
├── assets/          # Global styles (main.css): spacing scale, color tokens, 12-column grid
├── components/
│   └── app/         # Core application components (Navbar.vue, Breadcrumb.vue)
├── composables/     # Vue composables (useLanguage.js for i18n & date formatting)
├── data/            # Shared mock data (events.js)
├── layouts/
│   ├── App.vue              # Public layout (Navbar + Breadcrumb + page)
│   └── DashboardLayout.vue  # Rail & Pane layout for the organizer workspace
├── router/          # Vue Router configuration (index.js)
└── views/           # Page components
    ├── Home.vue         # Landing page (The Fold + Z-Pattern)
    ├── About.vue        # Mission & Vision
    ├── Browse.vue       # Main nested routing wrapper
    ├── Category.vue     # Event categories grid
    ├── EventList.vue    # Event catalog (adaptive grid + common regions)
    ├── EventDetail.vue  # Conversion page (asymmetrical 2:1 + F-Pattern + sticky CTA)
    ├── Dashboard.vue    # Organizer overview (metric cards + dense data table)
    └── Contact.vue      # Contact form and details
```

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate into the directory:

   ```sh
   cd praktikum1-ui-lanjut-fathin
   ```

2. Install the project dependencies:
   ```sh
   npm install
   ```

### Development Server

Compile and hot-reload for development:

```sh
npm run dev
```

Navigate to `http://localhost:5173/` to view the application in your browser.

### Production Build

Compile and minify the application for production deployment:

```sh
npm run build
```

This will generate an optimized build inside the `dist/` directory.

## 🎨 Design Decisions

- **State Management**: Instead of using Pinia/Vuex for simple UI states, global states like language selection are handled gracefully via reactive references defined outside of composable exports, guaranteeing singleton-like behavior globally.
- **Styling**: Vanilla scoped CSS and global CSS variables are utilized instead of utility-first frameworks (like Tailwind) to ensure maximum customizability and a bespoke look.

---

_Developed as part of UI Lanjut Practicum._

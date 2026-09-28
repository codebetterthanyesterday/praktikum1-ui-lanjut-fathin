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

## 📂 Project Structure

```text
src/
├── assets/          # Global styles (main.css) and static assets
├── components/
│   └── app/         # Core application components (Navbar.vue, Breadcrumb.vue)
├── composables/     # Vue composables (useLanguage.js for i18n)
├── layouts/         # Layout wrappers (App.vue)
├── router/          # Vue Router configuration (index.js)
└── views/           # Page components
    ├── Home.vue         # Landing page
    ├── About.vue        # Mission & Vision
    ├── Browse.vue       # Main nested routing wrapper
    ├── Category.vue     # Event categories grid
    ├── EventList.vue    # List of upcoming events
    ├── EventDetail.vue  # Specific event page (with ticketing/agenda)
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

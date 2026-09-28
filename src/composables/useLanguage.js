import { ref } from 'vue'

const locale = ref('EN')

const translations = {
  EN: {
    nav: {
      home: 'Home',
      about: 'About',
      browse: 'Browse',
      eventList: 'Event List',
      eventDetail: 'Event Detail (Sample)',
      category: 'Category',
      contact: 'Contact'
    },
    home: {
      badge: 'Welcome to Gatherly',
      title: 'Connect, Discover, and Experience',
      subtitle: 'Join our vibrant community to explore the best events tailored for you. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      discoverBtn: 'Discover Events',
      learnMoreBtn: 'Learn More',
      curatedTitle: 'Curated Events',
      curatedDesc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      globalTitle: 'Global Reach',
      globalDesc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      communityTitle: 'Community Driven',
      communityDesc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      sitemapTitle: 'Website Structure / Site-Map',
      sitemapDesc: 'A quick overview of how this application is structured via Vue Router.'
    },
    contact: {
      title: 'Contact Us',
      subtitle: "We'd love to hear from you. Please fill out the form below or reach out via our contact info.",
      office: 'Our Office',
      phone: 'Phone',
      email: 'Email',
      nameLabel: 'Name',
      namePlaceholder: 'John Doe',
      emailLabel: 'Email',
      emailPlaceholder: 'john@example.com',
      messageLabel: 'Message',
      messagePlaceholder: 'How can we help you?',
      sendBtn: 'Send Message'
    },
    events: {
      title: 'Upcoming Events',
      desc: 'Discover the latest gatherings and activities happening near you.',
      category: 'Community',
      gathering: 'Community Gathering',
      location: 'Main Auditorium, City Center',
      eventDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at velit vel magna interdum scelerisque.',
      viewDetails: 'View Details'
    },
    about: {
      title: 'About Gatherly',
      subtitle: 'Building the future of event experiences, one community at a time.',
      missionTitle: 'Our Mission',
      missionDesc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      visionTitle: 'Our Vision',
      visionDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.'
    },
    browse: {
      title: 'Browse & Discover',
      subtitle: 'Find the events and categories that matter most to you.'
    },
    category: {
      title: 'Explore by Category',
      events: 'Events',
      categories: {
        music: 'Music & Concerts',
        tech: 'Technology',
        art: 'Art & Design',
        business: 'Business',
        health: 'Health & Wellness',
        food: 'Food & Drink'
      }
    },
    eventDetail: {
      back: 'Back to Events',
      tag: 'Community Event',
      title: 'Community Gathering',
      attendees: 'Attendees',
      aboutTitle: 'About This Event',
      aboutDesc1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.',
      aboutDesc2: 'Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci.',
      agendaTitle: 'Agenda',
      agenda: {
        item1: 'Registration & Welcome Coffee',
        item2: 'Opening Keynote Speech',
        item3: 'Networking Session',
        item4: 'Closing Remarks'
      },
      registration: 'Registration',
      free: 'Free',
      ticketDesc: 'Secure your spot today before it runs out.',
      registerBtn: 'Register Now',
      spots: 'Only 45 spots left!'
    }
  },
  ID: {
    nav: {
      home: 'Beranda',
      about: 'Tentang',
      browse: 'Jelajahi',
      eventList: 'Daftar Acara',
      eventDetail: 'Detail Acara (Contoh)',
      category: 'Kategori',
      contact: 'Kontak'
    },
    home: {
      badge: 'Selamat datang di Gatherly',
      title: 'Hubungkan, Temukan, dan Nikmati',
      subtitle: 'Bergabunglah dengan komunitas kami yang dinamis untuk menjelajahi acara terbaik yang disesuaikan untuk Anda. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      discoverBtn: 'Temukan Acara',
      learnMoreBtn: 'Pelajari Lebih Lanjut',
      curatedTitle: 'Acara Terkurasi',
      curatedDesc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      globalTitle: 'Jangkauan Global',
      globalDesc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      communityTitle: 'Berbasis Komunitas',
      communityDesc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      sitemapTitle: 'Struktur Situs web / Peta Situs',
      sitemapDesc: 'Gambaran singkat tentang bagaimana aplikasi ini disusun melalui Vue Router.'
    },
    contact: {
      title: 'Hubungi Kami',
      subtitle: 'Kami ingin mendengar dari Anda. Silakan isi formulir di bawah ini atau hubungi info kontak kami.',
      office: 'Kantor Kami',
      phone: 'Telepon',
      email: 'Surel',
      nameLabel: 'Nama',
      namePlaceholder: 'John Doe',
      emailLabel: 'Surel',
      emailPlaceholder: 'john@contoh.com',
      messageLabel: 'Pesan',
      messagePlaceholder: 'Apa yang bisa kami bantu?',
      sendBtn: 'Kirim Pesan'
    },
    events: {
      title: 'Acara Mendatang',
      desc: 'Temukan pertemuan dan kegiatan terbaru yang terjadi di dekat Anda.',
      category: 'Komunitas',
      gathering: 'Pertemuan Komunitas',
      location: 'Auditorium Utama, Pusat Kota',
      eventDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at velit vel magna interdum scelerisque.',
      viewDetails: 'Lihat Detail'
    },
    about: {
      title: 'Tentang Gatherly',
      subtitle: 'Membangun masa depan pengalaman acara, satu komunitas pada satu waktu.',
      missionTitle: 'Misi Kami',
      missionDesc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      visionTitle: 'Visi Kami',
      visionDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.'
    },
    browse: {
      title: 'Jelajahi & Temukan',
      subtitle: 'Temukan acara dan kategori yang paling berarti bagi Anda.'
    },
    category: {
      title: 'Jelajahi Berdasarkan Kategori',
      events: 'Acara',
      categories: {
        music: 'Musik & Konser',
        tech: 'Teknologi',
        art: 'Seni & Desain',
        business: 'Bisnis',
        health: 'Kesehatan & Kebugaran',
        food: 'Makanan & Minuman'
      }
    },
    eventDetail: {
      back: 'Kembali ke Acara',
      tag: 'Acara Komunitas',
      title: 'Pertemuan Komunitas',
      attendees: 'Peserta',
      aboutTitle: 'Tentang Acara Ini',
      aboutDesc1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.',
      aboutDesc2: 'Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci.',
      agendaTitle: 'Agenda',
      agenda: {
        item1: 'Pendaftaran & Kopi Selamat Datang',
        item2: 'Pidato Pembukaan',
        item3: 'Sesi Jaringan',
        item4: 'Penutupan'
      },
      registration: 'Pendaftaran',
      free: 'Gratis',
      ticketDesc: 'Amankan tempat Anda hari ini sebelum kehabisan.',
      registerBtn: 'Daftar Sekarang',
      spots: 'Hanya tersisa 45 tempat!'
    }
  }
}

export function useLanguage() {
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[locale.value]
    for (const k of keys) {
      if (value === undefined) return key
      value = value[k]
    }
    return value || key
  }

  const toggleLocale = () => {
    locale.value = locale.value === 'EN' ? 'ID' : 'EN'
  }

  return {
    locale,
    t,
    toggleLocale
  }
}

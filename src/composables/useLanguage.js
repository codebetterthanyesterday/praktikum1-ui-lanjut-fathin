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
      contact: 'Contact',
      dashboard: 'Organizer Dashboard'
    },
    dashboard: {
      brand: 'Gatherly Organizer',
      title: 'Dashboard',
      admin: 'Admin',
      overview: 'Overview',
      myEvents: 'My Events',
      attendees: 'Attendees',
      checkin: 'QR Check-in',
      back: 'Back to Public',
      welcome: 'Welcome back, Organizer',
      ticketsSold: 'Total Tickets Sold',
      pageViews: 'Page Views',
      revenue: 'Revenue',
      recent: 'Recent Registrations',
      colName: 'Attendee Name',
      colEvent: 'Event',
      colDate: 'Registration Date',
      colStatus: 'Status',
      confirmed: 'Confirmed'
    },
    home: {
      title: 'Connect, Discover, and Experience',
      subtitle: 'A community event platform designed to bring ideas together. Discover hundreds of events near you.',
      discoverBtn: 'Discover Events',
      featuresTitle: 'Why Choose Gatherly?',
      featuresDesc: 'Everything you need to host or attend unforgettable events.',
      discoverTitle: 'Discover Easily',
      discoverDesc: 'Find events tailored to your interests using our smart category and location filters.',
      ticketingTitle: 'Seamless Ticketing',
      ticketingDesc: 'Register with one click and get your digital QR ticket instantly on your device.',
      hostTitle: 'Host Like a Pro',
      hostDesc: 'Manage attendees, track revenue, and scan QR codes with our comprehensive dashboard.',
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
      desc: 'Discover workshops, seminars, tech meetups, and competitions near you.',
      viewDetails: 'View Event Details',
      categories: {
        workshop: 'Workshop',
        meetup: 'Meetup',
        competition: 'Competition',
        seminar: 'Seminar',
        conference: 'Conference'
      }
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
      quota: 'Quota: {n} Attendees',
      aboutTitle: 'About This Event',
      aboutDesc1: 'Welcome to the biggest web interface development training event of the year! Gatherly is collaborating with the local developer community to host a comprehensive workshop designed specifically to bring together professionals, enthusiasts, and students.',
      aboutDesc2: 'In this session, we will discuss various current industry challenges, dissect the implementation of Single Page Applications (SPA), and practice hands-on Layout System design prioritizing visual hierarchy. You will gain practical insights that can be directly applied to your future projects or career.',
      agendaTitle: 'Event Agenda',
      agenda: {
        item1: 'Registration & QR Check-in Scanning',
        item2: 'Session 1: Vue Router & Navigation Fundamentals',
        item3: 'Coffee Break & Networking Session',
        item4: 'Session 2: Layout System & Grid Implementation',
        item5: 'Q&A & Closing Remarks'
      },
      registration: 'Attendee Registration',
      free: 'Free',
      ticketDesc: 'Secure your seat now before the quota is full.',
      registerBtn: 'Register Now',
      spots: 'Only {n} seats left!',
      notFoundTitle: 'Event not found',
      notFoundDesc: 'The event you are looking for does not exist or has been removed.'
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
      contact: 'Kontak',
      dashboard: 'Dashboard Organizer'
    },
    dashboard: {
      brand: 'Gatherly Organizer',
      title: 'Dashboard',
      admin: 'Admin',
      overview: 'Ringkasan',
      myEvents: 'Acara Saya',
      attendees: 'Peserta',
      checkin: 'QR Check-in',
      back: 'Kembali ke Publik',
      welcome: 'Selamat datang kembali, Organizer',
      ticketsSold: 'Total Tiket Terjual',
      pageViews: 'Tayangan Halaman',
      revenue: 'Pendapatan',
      recent: 'Pendaftaran Terbaru',
      colName: 'Nama Peserta',
      colEvent: 'Acara',
      colDate: 'Tanggal Daftar',
      colStatus: 'Status',
      confirmed: 'Terkonfirmasi'
    },
    home: {
      title: 'Hubungkan, Temukan, dan Nikmati',
      subtitle: 'Platform acara komunitas yang dirancang untuk mempertemukan ide. Temukan ratusan acara di dekat Anda.',
      discoverBtn: 'Temukan Acara',
      featuresTitle: 'Mengapa Memilih Gatherly?',
      featuresDesc: 'Semua yang Anda butuhkan untuk mengadakan atau menghadiri acara tak terlupakan.',
      discoverTitle: 'Temukan dengan Mudah',
      discoverDesc: 'Temukan acara yang sesuai minat Anda dengan filter kategori dan lokasi yang cerdas.',
      ticketingTitle: 'Tiket Tanpa Ribet',
      ticketingDesc: 'Daftar dengan satu klik dan dapatkan tiket QR digital langsung di perangkat Anda.',
      hostTitle: 'Kelola Seperti Profesional',
      hostDesc: 'Kelola peserta, pantau pendapatan, dan pindai kode QR lewat dashboard yang lengkap.',
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
      desc: 'Temukan workshop, seminar, tech meetup, dan kompetisi di dekat Anda.',
      viewDetails: 'Lihat Detail Acara',
      categories: {
        workshop: 'Workshop',
        meetup: 'Meetup',
        competition: 'Kompetisi',
        seminar: 'Seminar',
        conference: 'Konferensi'
      }
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
      quota: 'Kuota: {n} Peserta',
      aboutTitle: 'Tentang Acara Ini',
      aboutDesc1: 'Selamat datang di acara pelatihan pengembangan antarmuka web terbesar tahun ini! Gatherly berkolaborasi dengan komunitas developer lokal untuk menghadirkan workshop komprehensif yang dirancang khusus untuk mempertemukan profesional, pegiat, dan mahasiswa.',
      aboutDesc2: 'Dalam sesi ini, kita akan membahas berbagai tantangan industri terkini, membedah implementasi Single Page Application (SPA), dan mempraktikkan langsung perancangan Layout System yang mengutamakan hierarki visual. Anda akan memperoleh wawasan praktis yang dapat langsung diterapkan pada proyek atau karier Anda.',
      agendaTitle: 'Agenda Acara',
      agenda: {
        item1: 'Registrasi & Pemindaian QR Check-in',
        item2: 'Sesi 1: Dasar-dasar Vue Router & Navigasi',
        item3: 'Rehat Kopi & Sesi Networking',
        item4: 'Sesi 2: Implementasi Layout System & Grid',
        item5: 'Tanya Jawab & Penutupan'
      },
      registration: 'Pendaftaran Peserta',
      free: 'Gratis',
      ticketDesc: 'Amankan kursi Anda sekarang sebelum kuota penuh.',
      registerBtn: 'Daftar Sekarang',
      spots: 'Hanya tersisa {n} kursi!',
      notFoundTitle: 'Acara tidak ditemukan',
      notFoundDesc: 'Acara yang Anda cari tidak ada atau sudah dihapus.'
    }
  }
}

const dateLocales = { EN: 'en-US', ID: 'id-ID' }

export function useLanguage() {
  // t('eventDetail.spots', { n: 12 }) -> placeholder {n} diganti dengan nilai params
  const t = (key, params = {}) => {
    const keys = key.split('.')
    let value = translations[locale.value]
    for (const k of keys) {
      if (value === undefined) return key
      value = value[k]
    }
    if (typeof value !== 'string') return key
    return value.replace(/\{(\w+)\}/g, (match, name) => params[name] ?? match)
  }

  // Tanggal ISO (YYYY-MM-DD) -> format sesuai bahasa aktif, mis. "Oct 12, 2026"
  const formatDate = (iso, month = 'short') =>
    new Intl.DateTimeFormat(dateLocales[locale.value], {
      day: '2-digit',
      month,
      year: 'numeric',
      timeZone: 'UTC'
    }).format(new Date(iso))

  const toggleLocale = () => {
    locale.value = locale.value === 'EN' ? 'ID' : 'EN'
  }

  return {
    locale,
    t,
    formatDate,
    toggleLocale
  }
}

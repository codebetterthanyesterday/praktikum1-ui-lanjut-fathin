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
      dashboard: 'Organizer Dashboard',
      eventManagement: 'Event Management'
    },
    dashboard: {
      brand: 'Gatherly Organizer',
      title: 'Dashboard',
      admin: 'Admin',
      overview: 'Dashboard',
      management: 'Event Management',
      back: 'Back to Public',
      heading: 'Organizer Analytics & Overview',
      subtitle: 'Monitor real-time statistics and track status across all managed events.',
      manageBtn: 'Manage Events',
      totalEvents: 'Total Events',
      totalHint: 'All recorded events',
      activeEvents: 'Active Events',
      activeHint: 'Live in public catalog',
      completedEvents: 'Completed Events',
      completedHint: 'Archived completed events',
      tableTitle: 'Recent Events Status Overview',
      tableSubtitle: 'Master registry of all events managed across the Gatherly platform.',
      openManagement: 'Open Event Management',
      colTitle: 'Event Title',
      colCategory: 'Category',
      colDateLoc: 'Date & Location',
      colQuota: 'Quota',
      colStatus: 'Status',
      pax: '{n} Pax',
      statusActive: 'Active',
      statusCompleted: 'Completed',
      tableEmpty: 'No events recorded in the system yet.',
      createFirst: 'Create First Event'
    },
    manage: {
      heading: 'Event Management Control',
      subtitle: 'Manage event lifecycle, publish new events, and archive completed ones.',
      createNew: 'Create New Event',
      tabActive: 'Active Events ({n})',
      tabCreate: 'Create Event',
      tabCompleted: 'Completed Events ({n})',
      viewDetails: 'View Details',
      complete: 'Complete Event',
      delete: 'Delete',
      deleteArchive: 'Delete from Archive',
      completedNotice: 'This event has ended and is archived from the public catalog.',
      emptyActiveTitle: 'No Active Events',
      emptyActiveDesc: 'All events have ended or none have been created yet. Please create a new event.',
      emptyActiveBtn: 'Create Event Now',
      emptyCompletedTitle: 'No Completed Events',
      emptyCompletedDesc: 'Events marked as completed will be archived here permanently.',
      formTitle: 'Create New Event Form',
      formSubtitle: 'Information entered here will be instantly published to the Gatherly public catalog.',
      fieldTitle: 'Event Title',
      fieldTitlePh: 'e.g. Modern UI/UX Masterclass',
      fieldCategory: 'Event Category',
      fieldDate: 'Date & Time',
      fieldLoc: 'Event Location',
      fieldLocPh: 'e.g. Innovation Center, Jakarta',
      fieldQuota: 'Attendee Quota',
      fieldDesc: 'Event Description',
      fieldDescPh: 'Describe the agenda, speakers, and key takeaways...',
      cancel: 'Cancel',
      publish: 'Publish Event Now',
      errorRequired: 'Please fill in all required fields before publishing the event!',
      errorQuota: 'Attendee quota must be at least 1.',
      success: 'Event published successfully and is now live!',
      modalCompleteTitle: 'Complete Event?',
      modalCompleteMsg: "Are you sure you want to mark '{title}' as completed? Once completed, the status is final and the event will be automatically removed from public listings.",
      modalCompleteBtn: 'Yes, Complete',
      modalDeleteTitle: 'Delete Event Permanently?',
      modalDeleteMsg: "Are you sure you want to permanently delete '{title}'? This action cannot be undone and will permanently remove this event from all records.",
      modalDeleteBtn: 'Yes, Delete Permanently'
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
      searchPlaceholder: 'Search events by title or location...',
      all: 'All',
      empty: 'No events found matching your criteria.',
      resetFilter: 'Reset Filters',
      emptyTitle: 'No Events Available Yet',
      emptyDesc: 'There are currently no active events scheduled. Are you an organizer? Publish and manage your first event today through the Dashboard!',
      emptyBtn: 'Go to Organizer Dashboard',
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
      statusLive: 'Open Registration',
      statusEnded: 'Event Finished',
      aboutTitle: 'About This Event',
      registration: 'Attendee Registration',
      free: 'Free',
      ticketDesc: 'Secure your ticket now before quota is filled.',
      ticketDescEnded: 'Registration is closed as this event has ended.',
      registerBtn: 'Register Now',
      registeredBtn: 'Registered',
      registeredNote: 'You are registered! See you at the event.',
      closedBtn: 'Registration Closed',
      spots: '{n} seats available',
      notFoundTitle: '404 - Event Not Found',
      notFoundDesc: 'The event you are looking for is unavailable or has been removed by the organizer.',
      notFoundBtn: 'Back to Event Catalog'
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
      dashboard: 'Dashboard Organizer',
      eventManagement: 'Kelola Acara'
    },
    dashboard: {
      brand: 'Gatherly Organizer',
      title: 'Dashboard',
      admin: 'Admin',
      overview: 'Dashboard',
      management: 'Kelola Acara',
      back: 'Kembali ke Publik',
      heading: 'Analitik & Ringkasan Organizer',
      subtitle: 'Pantau statistik secara langsung dan lacak status semua acara yang Anda kelola.',
      manageBtn: 'Kelola Acara',
      totalEvents: 'Total Acara',
      totalHint: 'Semua acara yang tercatat',
      activeEvents: 'Acara Aktif',
      activeHint: 'Tampil di katalog publik',
      completedEvents: 'Acara Selesai',
      completedHint: 'Acara selesai yang diarsipkan',
      tableTitle: 'Ringkasan Status Acara Terbaru',
      tableSubtitle: 'Daftar induk semua acara yang dikelola di platform Gatherly.',
      openManagement: 'Buka Kelola Acara',
      colTitle: 'Judul Acara',
      colCategory: 'Kategori',
      colDateLoc: 'Tanggal & Lokasi',
      colQuota: 'Kuota',
      colStatus: 'Status',
      pax: '{n} Orang',
      statusActive: 'Aktif',
      statusCompleted: 'Selesai',
      tableEmpty: 'Belum ada acara yang tercatat di sistem.',
      createFirst: 'Buat Acara Pertama'
    },
    manage: {
      heading: 'Pusat Kelola Acara',
      subtitle: 'Kelola siklus hidup acara, terbitkan acara baru, dan arsipkan acara yang sudah selesai.',
      createNew: 'Buat Acara Baru',
      tabActive: 'Acara Aktif ({n})',
      tabCreate: 'Buat Acara',
      tabCompleted: 'Acara Selesai ({n})',
      viewDetails: 'Lihat Detail',
      complete: 'Selesaikan Acara',
      delete: 'Hapus',
      deleteArchive: 'Hapus dari Arsip',
      completedNotice: 'Acara ini sudah berakhir dan diarsipkan dari katalog publik.',
      emptyActiveTitle: 'Belum Ada Acara Aktif',
      emptyActiveDesc: 'Semua acara sudah berakhir atau belum ada yang dibuat. Silakan buat acara baru.',
      emptyActiveBtn: 'Buat Acara Sekarang',
      emptyCompletedTitle: 'Belum Ada Acara Selesai',
      emptyCompletedDesc: 'Acara yang ditandai selesai akan diarsipkan di sini secara permanen.',
      formTitle: 'Formulir Acara Baru',
      formSubtitle: 'Informasi yang diisi di sini akan langsung terbit di katalog publik Gatherly.',
      fieldTitle: 'Judul Acara',
      fieldTitlePh: 'mis. Modern UI/UX Masterclass',
      fieldCategory: 'Kategori Acara',
      fieldDate: 'Tanggal & Waktu',
      fieldLoc: 'Lokasi Acara',
      fieldLocPh: 'mis. Innovation Center, Jakarta',
      fieldQuota: 'Kuota Peserta',
      fieldDesc: 'Deskripsi Acara',
      fieldDescPh: 'Jelaskan agenda, pembicara, dan hal yang akan didapat peserta...',
      cancel: 'Batal',
      publish: 'Terbitkan Acara',
      errorRequired: 'Lengkapi semua kolom wajib sebelum menerbitkan acara!',
      errorQuota: 'Kuota peserta minimal 1.',
      success: 'Acara berhasil diterbitkan dan sudah tampil!',
      modalCompleteTitle: 'Selesaikan Acara?',
      modalCompleteMsg: "Yakin ingin menandai '{title}' sebagai selesai? Status ini permanen dan acara akan otomatis hilang dari katalog publik.",
      modalCompleteBtn: 'Ya, Selesaikan',
      modalDeleteTitle: 'Hapus Acara Permanen?',
      modalDeleteMsg: "Yakin ingin menghapus '{title}' secara permanen? Tindakan ini tidak bisa dibatalkan dan acara akan hilang dari semua catatan.",
      modalDeleteBtn: 'Ya, Hapus Permanen'
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
      searchPlaceholder: 'Cari acara berdasarkan judul atau lokasi...',
      all: 'Semua',
      empty: 'Tidak ada acara yang cocok dengan kriteria Anda.',
      resetFilter: 'Reset Filter',
      emptyTitle: 'Belum Ada Acara',
      emptyDesc: 'Saat ini belum ada acara aktif yang dijadwalkan. Anda penyelenggara? Terbitkan dan kelola acara pertama Anda lewat Dashboard!',
      emptyBtn: 'Buka Dashboard Organizer',
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
      statusLive: 'Pendaftaran Dibuka',
      statusEnded: 'Acara Selesai',
      aboutTitle: 'Tentang Acara Ini',
      registration: 'Pendaftaran Peserta',
      free: 'Gratis',
      ticketDesc: 'Amankan tiket Anda sebelum kuota penuh.',
      ticketDescEnded: 'Pendaftaran ditutup karena acara sudah berakhir.',
      registerBtn: 'Daftar Sekarang',
      registeredBtn: 'Terdaftar',
      registeredNote: 'Anda sudah terdaftar! Sampai jumpa di acara.',
      closedBtn: 'Pendaftaran Ditutup',
      spots: 'Tersedia {n} kursi',
      notFoundTitle: '404 - Acara Tidak Ditemukan',
      notFoundDesc: 'Acara yang Anda cari tidak tersedia atau sudah dihapus oleh penyelenggara.',
      notFoundBtn: 'Kembali ke Katalog Acara'
    }
  }
}

const dateLocales = { EN: 'en-US', ID: 'id-ID' }

export function useLanguage() {
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

  const formatDate = (iso, month = 'short') =>
    new Intl.DateTimeFormat(dateLocales[locale.value], {
      day: '2-digit',
      month,
      year: 'numeric',
      timeZone: 'UTC'
    }).format(new Date(iso))

  // datetime-local "2026-10-15T10:00" -> "Oct 15, 2026 • 10:00 AM"
  const formatDateTime = (value) => {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    const opts = { day: '2-digit', month: 'short', year: 'numeric' }
    const datePart = date.toLocaleDateString(dateLocales[locale.value], opts)
    const timePart = date.toLocaleTimeString(dateLocales[locale.value], {
      hour: '2-digit',
      minute: '2-digit'
    })
    return `${datePart} • ${timePart}`
  }

  const toggleLocale = () => {
    locale.value = locale.value === 'EN' ? 'ID' : 'EN'
  }

  return {
    locale,
    t,
    formatDate,
    formatDateTime,
    toggleLocale
  }
}

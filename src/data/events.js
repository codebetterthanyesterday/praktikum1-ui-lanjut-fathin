export const events = [
  {
    id: 1,
    title: 'Vue.js Mastery Workshop',
    date: '2026-10-12',
    loc: 'Tech Hub, Jakarta',
    cat: 'workshop',
    quota: 150,
    seatsLeft: 12,
    desc: {
      EN: 'Learn advanced Vue 3 concepts, Composition API, and state management to build high-performance web applications interactively.',
      ID: 'Pelajari konsep lanjutan Vue 3, Composition API, dan state management untuk membangun aplikasi web berperforma tinggi secara interaktif.',
    },
  },
  {
    id: 2,
    title: 'National Tech Meetup',
    date: '2026-10-15',
    loc: 'Main Auditorium, City Center',
    cat: 'meetup',
    quota: 500,
    seatsLeft: 45,
    desc: {
      EN: 'A gathering of hundreds of developers and tech enthusiasts to share the latest industry trends and expand professional networks.',
      ID: 'Pertemuan ratusan developer dan pegiat teknologi untuk berbagi tren industri terbaru dan memperluas jaringan profesional.',
    },
  },
  {
    id: 3,
    title: 'Startup Pitch Competition',
    date: '2026-11-02',
    loc: 'Innovation Center',
    cat: 'competition',
    quota: 200,
    seatsLeft: 30,
    desc: {
      EN: 'Watch the best local startup founders pitch their innovative ideas live in front of a panel of renowned investors.',
      ID: 'Saksikan para founder startup lokal terbaik mempresentasikan ide inovatif mereka secara langsung di hadapan panel investor ternama.',
    },
  },
  {
    id: 4,
    title: 'UI/UX Design Sprint',
    date: '2026-11-10',
    loc: 'Creative Studio',
    cat: 'workshop',
    quota: 80,
    seatsLeft: 8,
    desc: {
      EN: 'A hands-on session on designing user interfaces by implementing layout systems and visual hierarchy principles.',
      ID: 'Sesi praktik merancang antarmuka pengguna dengan menerapkan sistem tata letak dan prinsip hierarki visual.',
    },
  },
  {
    id: 5,
    title: 'Digital Marketing Seminar',
    date: '2026-11-20',
    loc: 'Grand Hotel Hall',
    cat: 'seminar',
    quota: 300,
    seatsLeft: 64,
    desc: {
      EN: 'An in-depth seminar dissecting modern digital marketing strategies, from SEO optimization to user conversion tactics.',
      ID: 'Seminar mendalam yang membedah strategi pemasaran digital modern, dari optimasi SEO hingga taktik konversi pengguna.',
    },
  },
  {
    id: 6,
    title: 'Community Leaders Summit',
    date: '2026-12-05',
    loc: 'Gatherly HQ',
    cat: 'conference',
    quota: 120,
    seatsLeft: 20,
    desc: {
      EN: 'An exclusive year-end conference for community leaders to formulate sustainable ecosystem development strategies.',
      ID: 'Konferensi akhir tahun eksklusif bagi para pemimpin komunitas untuk merumuskan strategi pengembangan ekosistem yang berkelanjutan.',
    },
  },
]

export const findEvent = (id) => events.find((event) => event.id === Number(id))

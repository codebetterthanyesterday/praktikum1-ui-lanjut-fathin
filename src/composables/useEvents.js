import { ref, computed, watch } from 'vue'

const EVENTS_KEY = 'gatherly_events'
const REGISTRATIONS_KEY = 'gatherly_user_registrations'

export const categories = ['workshop', 'meetup', 'competition', 'seminar', 'conference']

const load = (key) => {
  try {
    const saved = JSON.parse(localStorage.getItem(key))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

const persist = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage penuh / diblokir, ya sudah
  }
}

// ditaruh di luar useEvents() supaya semua halaman pakai data yang sama
const events = ref(load(EVENTS_KEY))
const userRegistrations = ref(load(REGISTRATIONS_KEY))

// deep: true biar perubahan di dalam item (done, booked) juga ikut kesimpan
watch(events, (value) => persist(EVENTS_KEY, value), { deep: true })
watch(userRegistrations, (value) => persist(REGISTRATIONS_KEY, value), { deep: true })

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === EVENTS_KEY) events.value = load(EVENTS_KEY)
    if (e.key === REGISTRATIONS_KEY) userRegistrations.value = load(REGISTRATIONS_KEY)
  })
}

const findEvent = (id) => events.value.find((e) => e.id === Number(id))

// quota = kapasitas, booked = yang sudah daftar. data dari modul 4 belum punya booked
export const seatsLeft = (event) => Math.max(0, event.quota - (event.booked ?? 0))

const makeBookingCode = () => {
  let code
  do {
    code = 'GTH-' + Math.random().toString(36).slice(2, 8).toUpperCase()
  } while (userRegistrations.value.some((r) => r.bookingCode === code))
  return code
}

export function useEvents() {
  const totalEvents = computed(() => events.value.length)
  const activeEvents = computed(() => events.value.filter((e) => !e.done))
  const completedEvents = computed(() => events.value.filter((e) => e.done))

  // tiket yang acaranya masih ada di sistem
  const myRegistrations = computed(() =>
    userRegistrations.value.filter((r) => events.value.some((e) => e.id === r.eventId)),
  )
  const totalRegistrations = computed(() => myRegistrations.value.length)

  const createEvent = (eventData) => {
    let id = Date.now()
    while (events.value.some((e) => e.id === id)) id++

    const newEvent = {
      id,
      title: eventData.title.trim(),
      date: eventData.date,
      loc: eventData.loc.trim(),
      cat: eventData.cat,
      quota: Number(eventData.quota) || 100,
      booked: 0,
      desc: eventData.desc.trim(),
      done: false,
    }
    events.value.unshift(newEvent)
    return newEvent
  }

  const completeEvent = (id) => {
    const target = findEvent(id)
    if (target) target.done = true
  }

  // hapus acara sekalian tiket-tiketnya, biar ga ada tiket "hantu"
  const deleteEvent = (id) => {
    const numId = Number(id)
    events.value = events.value.filter((e) => e.id !== numId)
    userRegistrations.value = userRegistrations.value.filter((r) => r.eventId !== numId)
  }

  // id dari URL selalu string, jadi diubah ke Number dulu
  const getEventById = (id) => findEvent(id)

  const getRegistrationByEventId = (eventId) =>
    userRegistrations.value.find((r) => r.eventId === Number(eventId))

  const isUserRegistered = (eventId) =>
    Boolean(findEvent(eventId) && getRegistrationByEventId(eventId))

  const registerAttendee = (eventId, participant) => {
    const event = findEvent(eventId)
    if (!event || event.done || seatsLeft(event) <= 0 || isUserRegistered(eventId)) return null

    let id = Date.now()
    while (userRegistrations.value.some((r) => r.id === id)) id++

    const record = {
      id,
      eventId: event.id,
      bookingCode: makeBookingCode(),
      registeredAt: new Date().toISOString(),
      fullName: participant.fullName.trim(),
      email: participant.email.trim(),
      phone: participant.phone.trim(),
      dob: participant.dob,
      reason: participant.reason.trim(),
    }

    event.booked = (event.booked ?? 0) + 1
    userRegistrations.value.unshift(record)
    return record
  }

  const cancelRegistration = (eventId) => {
    const index = userRegistrations.value.findIndex((r) => r.eventId === Number(eventId))
    if (index === -1) return false

    userRegistrations.value.splice(index, 1)
    const event = findEvent(eventId)
    if (event) event.booked = Math.max(0, (event.booked ?? 0) - 1)
    return true
  }

  const clearAllEvents = () => {
    events.value = []
    userRegistrations.value = []
  }

  const clearAllRegistrations = () => {
    userRegistrations.value = []
    events.value.forEach((e) => (e.booked = 0))
  }

  return {
    events,
    totalEvents,
    activeEvents,
    completedEvents,
    userRegistrations,
    myRegistrations,
    totalRegistrations,
    createEvent,
    completeEvent,
    deleteEvent,
    getEventById,
    registerAttendee,
    isUserRegistered,
    getRegistrationByEventId,
    cancelRegistration,
    clearAllEvents,
    clearAllRegistrations,
  }
}

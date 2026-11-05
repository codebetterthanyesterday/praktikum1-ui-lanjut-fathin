import { ref, computed, watch } from 'vue'
import { request, ApiError } from '@/services/http'

const REGISTRATIONS_KEY = 'gatherly_user_registrations'

export const categories = ['workshop', 'meetup', 'competition', 'seminar', 'conference']

try {
  localStorage.removeItem('gatherly_events')
} catch {}

const loadRegistrations = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(REGISTRATIONS_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

const pad = (n) => String(n).padStart(2, '0')
const toLocalInput = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`

// tanggal dari server bisa "2026-11-15T09:00", ISO pakai Z, atau teks "Nov 15, 2026 • 09:00 AM"
const normalizeDate = (value) => {
  const text = String(value ?? '').trim()
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/.test(text)) return text.slice(0, 16)
  const parsed = new Date(text.replace('•', ''))
  return Number.isNaN(parsed.getTime()) ? text : toLocalInput(parsed)
}

const normalizeEvent = (raw) => {
  const cat = String(raw.cat ?? '')
    .trim()
    .toLowerCase()
  return {
    id: String(raw.id),
    title: String(raw.title ?? ''),
    cat: categories.includes(cat) ? cat : 'other',
    date: normalizeDate(raw.date),
    loc: String(raw.loc ?? ''),
    quota: Math.max(0, Number(raw.quota) || 0),
    booked: Math.max(0, Number(raw.booked) || 0),
    desc: String(raw.desc ?? ''),
    done: raw.done === true || raw.done === 'true',
  }
}

export const seatsLeft = (event) => Math.max(0, event.quota - (event.booked ?? 0))

// ditaruh di luar useEvents() supaya semua halaman pakai data yang sama
const events = ref([])
const status = ref('idle')
const error = ref(null)
const userRegistrations = ref(loadRegistrations())

watch(
  userRegistrations,
  (value) => {
    try {
      localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(value))
    } catch {}
  },
  { deep: true },
)

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === REGISTRATIONS_KEY) userRegistrations.value = loadRegistrations()
  })
}

const sameId = (a, b) => String(a) === String(b)
const findEvent = (id) => events.value.find((e) => sameId(e.id, id))

const upsertEvent = (raw) => {
  const event = normalizeEvent(raw)
  const index = events.value.findIndex((e) => e.id === event.id)
  if (index === -1) events.value.push(event)
  else events.value[index] = event
  return event
}

let requestSeq = 0

const fetchEvents = () => {
  const seq = ++requestSeq
  status.value = 'loading'
  error.value = null

  return request('/events')
    .then((data) => {
      if (seq !== requestSeq) return
      events.value = (Array.isArray(data) ? data : []).map(normalizeEvent)
      userRegistrations.value = userRegistrations.value.filter((r) =>
        events.value.some((e) => sameId(e.id, r.eventId)),
      )
      status.value = 'success'
    })
    .catch((err) => {
      if (seq !== requestSeq) return
      error.value = err instanceof ApiError ? err : new ApiError('api.network')
      status.value = 'error'
    })
}

export function useEvents() {
  const loading = computed(() => status.value === 'loading')
  const loaded = computed(() => status.value === 'success')

  const totalEvents = computed(() => events.value.length)
  const activeEvents = computed(() => events.value.filter((e) => !e.done))
  const completedEvents = computed(() => events.value.filter((e) => e.done))

  const myRegistrations = computed(() =>
    userRegistrations.value.filter((r) => events.value.some((e) => sameId(e.id, r.eventId))),
  )

  const getEventById = (id) => findEvent(id)

  const fetchEventById = async (id, { force = false } = {}) => {
    if (!force) {
      const existing = findEvent(id)
      if (existing) return existing
    }
    try {
      return upsertEvent(await request(`/events/${encodeURIComponent(id)}`))
    } catch (err) {
      if (err.key === 'api.notFound') {
        events.value = events.value.filter((e) => !sameId(e.id, id))
        userRegistrations.value = userRegistrations.value.filter((r) => !sameId(r.eventId, id))
      }
      throw err
    }
  }

  const createEvent = async (eventData) => {
    const payload = {
      title: eventData.title.trim(),
      cat: eventData.cat,
      date: eventData.date,
      loc: eventData.loc.trim(),
      quota: Number(eventData.quota) || 100,
      booked: 0,
      desc: eventData.desc.trim(),
      done: false,
    }
    const created = normalizeEvent(await request('/events', { method: 'POST', body: payload }))
    events.value.unshift(created)
    return created
  }

  const updateEvent = async (id, changes) =>
    upsertEvent(
      await request(`/events/${encodeURIComponent(id)}`, { method: 'PUT', body: changes }),
    )

  const completeEvent = (id) => updateEvent(id, { done: true })

  const deleteEvent = async (id) => {
    try {
      await request(`/events/${encodeURIComponent(id)}`, { method: 'DELETE' })
    } catch (err) {
      if (err.key !== 'api.notFound') throw err
    }
    events.value = events.value.filter((e) => !sameId(e.id, id))
    userRegistrations.value = userRegistrations.value.filter((r) => !sameId(r.eventId, id))
  }

  const getRegistrationByEventId = (eventId) =>
    userRegistrations.value.find((r) => sameId(r.eventId, eventId))

  const isUserRegistered = (eventId) =>
    Boolean(findEvent(eventId) && getRegistrationByEventId(eventId))

  const makeBookingCode = () => {
    let code
    do {
      code = 'GTH-' + Math.random().toString(36).slice(2, 8).toUpperCase()
    } while (userRegistrations.value.some((r) => r.bookingCode === code))
    return code
  }

  const registerAttendee = async (eventId, participant) => {
    if (isUserRegistered(eventId)) throw new ApiError('register.errorFailed')

    const event = await fetchEventById(eventId, { force: true })
    if (event.done || seatsLeft(event) <= 0) throw new ApiError('register.errorFailed')

    await updateEvent(event.id, { booked: event.booked + 1 })

    const record = {
      id: Date.now(),
      eventId: event.id,
      bookingCode: makeBookingCode(),
      registeredAt: new Date().toISOString(),
      fullName: participant.fullName.trim(),
      email: participant.email.trim(),
      phone: participant.phone.trim(),
      dob: participant.dob,
      reason: participant.reason.trim(),
    }
    userRegistrations.value.unshift(record)
    return record
  }

  const cancelRegistration = async (eventId) => {
    const index = userRegistrations.value.findIndex((r) => sameId(r.eventId, eventId))
    if (index === -1) return false

    const event = findEvent(eventId)
    if (event) await updateEvent(event.id, { booked: Math.max(0, event.booked - 1) })

    userRegistrations.value.splice(index, 1)
    return true
  }

  return {
    events,
    loading,
    loaded,
    error,
    totalEvents,
    activeEvents,
    completedEvents,
    userRegistrations,
    myRegistrations,
    fetchEvents,
    fetchEventById,
    createEvent,
    completeEvent,
    deleteEvent,
    getEventById,
    registerAttendee,
    isUserRegistered,
    getRegistrationByEventId,
    cancelRegistration,
  }
}

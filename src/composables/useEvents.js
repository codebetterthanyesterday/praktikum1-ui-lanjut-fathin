import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'gatherly_events'

export const categories = ['workshop', 'meetup', 'competition', 'seminar', 'conference']

const loadEvents = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

// ditaruh di luar useEvents() supaya semua halaman pakai data yang sama
const events = ref(loadEvents())

// deep: true biar perubahan item.done juga ikut kesimpan
watch(
  events,
  (newEvents) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newEvents))
    } catch {
      // storage penuh / diblokir, ya sudah
    }
  },
  { deep: true },
)

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) events.value = loadEvents()
  })
}

export function useEvents() {
  const totalEvents = computed(() => events.value.length)
  const activeEvents = computed(() => events.value.filter((e) => !e.done))
  const completedEvents = computed(() => events.value.filter((e) => e.done))

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
      desc: eventData.desc.trim(),
      done: false,
    }
    events.value.unshift(newEvent)
    return newEvent
  }

  const completeEvent = (id) => {
    const target = events.value.find((e) => e.id === Number(id))
    if (target) target.done = true
  }

  const deleteEvent = (id) => {
    const index = events.value.findIndex((e) => e.id === Number(id))
    if (index !== -1) events.value.splice(index, 1)
  }

  // id dari URL selalu string, jadi diubah ke Number dulu
  const getEventById = (id) => events.value.find((e) => e.id === Number(id))

  const clearAllEvents = () => {
    events.value = []
  }

  return {
    events,
    totalEvents,
    activeEvents,
    completedEvents,
    createEvent,
    completeEvent,
    deleteEvent,
    getEventById,
    clearAllEvents,
  }
}

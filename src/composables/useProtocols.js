import { ref, computed, watch, isRef } from 'vue'

const STORAGE_KEY = 'ecofresh-protocols'

function loadAll() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }
  catch { return {} }
}

export function useProtocols(featureIdInput) {
  const getId = () => isRef(featureIdInput) ? featureIdInput.value : featureIdInput

  const state = ref(loadAll()[getId()] || {})

  watch(() => getId(), (newId) => {
    state.value = loadAll()[newId] || {}
  })

  function toggle(stepNum) {
    const id = getId()
    const all = loadAll()
    if (!all[id]) all[id] = {}
    all[id][stepNum] = !all[id][stepNum]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    state.value = { ...all[id] }
  }

  function reset() {
    const id = getId()
    const all = loadAll()
    delete all[id]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    state.value = {}
  }

  const completedCount = computed(() => Object.values(state.value).filter(Boolean).length)

  return { state, toggle, reset, completedCount }
}

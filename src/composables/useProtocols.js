import { ref, computed, isRef } from 'vue'

const STORAGE_KEY = 'ecofresh-protocols'

function loadAll() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') }
  catch { return {} }
}

const allState = ref(loadAll())

export function useProtocols(featureIdInput) {
  const getId = () => isRef(featureIdInput) ? featureIdInput.value : featureIdInput

  const state = computed(() => allState.value[getId()] || {})

  function toggle(stepNum) {
    const id = getId()
    const all = { ...allState.value }
    if (!all[id]) all[id] = {}
    all[id] = { ...all[id], [stepNum]: !all[id][stepNum] }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    allState.value = all
  }

  function reset() {
    const id = getId()
    const all = { ...allState.value }
    delete all[id]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    allState.value = all
  }

  const completedCount = computed(() => Object.values(state.value).filter(Boolean).length)

  return { state, toggle, reset, completedCount }
}

import { ref, computed, isRef, watch } from 'vue'
import { doc, onSnapshot, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase.js'

export const stateMap = ref({})
const listeners = {}

function ensureListener(id) {
  if (!id || listeners[id]) return
  listeners[id] = onSnapshot(doc(db, 'protocols', id), (snap) => {
    stateMap.value = { ...stateMap.value, [id]: snap.exists() ? snap.data() : {} }
  })
}

export function useProtocols(featureIdInput) {
  const getId = () => isRef(featureIdInput) ? featureIdInput.value : featureIdInput

  ensureListener(getId())

  if (isRef(featureIdInput)) {
    watch(featureIdInput, (newId) => ensureListener(newId))
  }

  const state = computed(() => stateMap.value[getId()] || {})

  async function toggle(stepNum) {
    const id = getId()
    const current = stateMap.value[id] || {}
    await setDoc(doc(db, 'protocols', id), { ...current, [stepNum]: !current[stepNum] })
  }

  async function reset() {
    await deleteDoc(doc(db, 'protocols', getId()))
  }

  const completedCount = computed(() => Object.values(state.value).filter(Boolean).length)

  return { state, toggle, reset, completedCount }
}

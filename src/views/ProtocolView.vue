<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { features } from '../data/index.js'
import { useProtocols } from '../composables/useProtocols.js'
import ProtocolTable from '../components/ProtocolTable.vue'
import ErrorTable from '../components/ErrorTable.vue'

const route = useRoute()

const featureId = computed(() => `${route.params.section}-${route.params.feature}`)
const feature = computed(() => features[featureId.value])
const totalSteps = computed(() => feature.value?.steps?.length || 0)

const { completedCount, reset } = useProtocols(featureId)

const progressPct = computed(() => {
  if (!totalSteps.value) return 0
  return Math.round((completedCount.value / totalSteps.value) * 100)
})
</script>

<template>
  <div v-if="feature">
    <div class="view-header">
      <h1>{{ feature.title }} <span class="module-badge">{{ feature.module }}</span></h1>
      <p class="description">{{ feature.description }}</p>
    </div>

    <template v-if="totalSteps > 0">
      <div class="progress-bar-wrap">
        <div class="progress-bar-track">
          <div class="progress-bar-fill" :style="{ width: progressPct + '%' }"></div>
        </div>
        <span class="progress-label">{{ completedCount }} / {{ totalSteps }} pasos completados</span>
        <button class="reset-btn" @click="reset">Reiniciar</button>
      </div>

      <p class="section-title">Pasos del Protocolo</p>
      <ProtocolTable :steps="feature.steps" :interactive="true" :featureId="featureId" />
    </template>

    <template v-if="feature.errors && feature.errors.length">
      <p class="section-title">Errores Relacionados</p>
      <ErrorTable :errors="feature.errors" />
    </template>

    <template v-if="feature.notes && feature.notes.length">
      <p class="section-title">Notas</p>
      <ul class="notes-list">
        <li v-for="(note, i) in feature.notes" :key="i">{{ note }}</li>
      </ul>
    </template>


  </div>

  <div v-else class="not-found">
    <h2>Feature no encontrada</h2>
    <p>ID: <code>{{ featureId }}</code></p>
  </div>
</template>

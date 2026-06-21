<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { features } from '../data/index.js'
import ProtocolTable from '../components/ProtocolTable.vue'
import ErrorTable from '../components/ErrorTable.vue'
import FlowDiagram from '../components/FlowDiagram.vue'

const route = useRoute()

const featureId = computed(() => `${route.params.section}-${route.params.feature}`)
const feature = computed(() => features[featureId.value])
</script>

<template>
  <div v-if="feature">
    <div class="view-header">
      <h1>{{ feature.title }} <span class="module-badge">{{ feature.module }}</span></h1>
      <p class="description">{{ feature.description }}</p>
    </div>

    <template v-if="feature.steps && feature.steps.length">
      <p class="section-title">Flujo de Operacion</p>
      <ProtocolTable :steps="feature.steps" :interactive="false" :featureId="featureId" />
    </template>

    <template v-if="feature.errors && feature.errors.length">
      <p class="section-title">{{ feature.steps && feature.steps.length ? 'Errores' : 'Catalogo de Errores' }}</p>
      <ErrorTable :errors="feature.errors" />
    </template>

    <template v-if="feature.notes && feature.notes.length">
      <p class="section-title">Notas</p>
      <ul class="notes-list">
        <li v-for="(note, i) in feature.notes" :key="i">{{ note }}</li>
      </ul>
    </template>

    <template v-if="feature.diagram">
      <p class="section-title">Diagrama</p>
      <FlowDiagram
        v-if="typeof feature.diagram === 'object'"
        :key="featureId"
        :nodes="feature.diagram.nodes"
        :edges="feature.diagram.edges"
        :height="feature.diagram.height || 320"
      />
      <pre v-else class="diagram-block">{{ feature.diagram }}</pre>
    </template>
  </div>

  <div v-else class="not-found">
    <h2>Feature no encontrada</h2>
    <p>ID: <code>{{ featureId }}</code></p>
  </div>
</template>

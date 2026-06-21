<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const views = {
  general:  defineAsyncComponent(() => import('./arch/ArchGeneral.vue')),
  backend:  defineAsyncComponent(() => import('./arch/ArchBackend.vue')),
  frontend: defineAsyncComponent(() => import('./arch/ArchFrontend.vue')),
  mqtt:     defineAsyncComponent(() => import('./arch/ArchMqtt.vue')),
  iot2050:  defineAsyncComponent(() => import('./arch/ArchIot2050.vue')),
  hardware: defineAsyncComponent(() => import('./arch/ArchHardware.vue')),
}

const current = computed(() => views[route.params.feature] || null)
</script>

<template>
  <div>
    <Suspense>
      <component :is="current" v-if="current" />
      <template #fallback>
        <div style="padding:2rem; color:#64748b">Cargando diagrama...</div>
      </template>
    </Suspense>
    <div class="not-found" v-if="!current">
      <h2>Vista no encontrada</h2>
    </div>
  </div>
</template>

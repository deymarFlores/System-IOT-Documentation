<script setup>
import { toRef } from 'vue'
import { useProtocols } from '../composables/useProtocols.js'

const props = defineProps({
  steps: { type: Array, required: true },
  interactive: { type: Boolean, default: false },
  featureId: { type: [String, Object], default: '' },
})

const { state, toggle } = useProtocols(toRef(props, 'featureId'))

function lines(text) {
  if (!text || text === '--') return [text || '--']
  return String(text).split('\n')
}

function methodClass(method) {
  if (!method) return ''
  return `method-${method.toLowerCase()}`
}

function areaClass(area) {
  return `area-${(area || '').toLowerCase()}`
}
</script>

<template>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th style="width:32px">#</th>
          <th style="width:72px">Metodo</th>
          <th style="min-width:180px">Endpoint</th>
          <th style="min-width:160px">Descripcion</th>
          <th style="min-width:180px">Payload enviado</th>
          <th style="min-width:200px">Respuesta recibida</th>
          <th style="width:90px">Area</th>
          <th v-if="interactive" style="width:40px">&#10003;</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="step in steps"
          :key="step.num"
          :class="{ 'step-done': interactive && state[step.num] }"
        >
          <td>{{ step.num }}</td>
          <td>
            <span v-if="step.method" class="badge" :class="methodClass(step.method)">{{ step.method }}</span>
            <span v-else class="badge" style="background:#475569">WS</span>
          </td>
          <td>
            <code class="cell-code" style="font-size:0.72rem; word-break:break-all">{{ step.endpoint }}</code>
          </td>
          <td style="font-size:0.8rem">{{ step.description }}</td>
          <td>
            <span v-if="!step.payload || step.payload === '--'" style="color:#94a3b8; font-size:0.8rem">--</span>
            <span v-else class="cell-code">
              <span v-for="(line, i) in lines(step.payload)" :key="i" class="cell-code-line">{{ line }}</span>
            </span>
          </td>
          <td>
            <span class="cell-code">
              <span v-for="(line, i) in lines(step.response)" :key="i" class="cell-code-line">{{ line }}</span>
            </span>
          </td>
          <td>
            <span class="badge" :class="areaClass(step.area)">{{ step.area }}</span>
          </td>
          <td v-if="interactive" style="text-align:center">
            <input type="checkbox" :checked="!!state[step.num]" @change="toggle(step.num)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

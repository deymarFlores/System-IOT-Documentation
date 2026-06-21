<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'
import FlowNode from '../../components/FlowNode.vue'

const nodeTypes = { box: FlowNode }

// helper para labels
const edgeLabel = (color) => ({
  labelStyle: {
    fill: color,
    fontSize: 10,
    fontWeight: 600
  },
  labelBgStyle: {
    fill: '#0f172a',
    fillOpacity: 0.9
  },
  labelBgPadding: [4, 6],
  labelBgBorderRadius: 3
})

const nodes = ref([
  // ================= INTERNET LAYER =================
  {
    id: 'internet',
    type: 'box',
    position: { x: 0, y: 220 },
    data: {
      klass: 'Externo',
      label: 'Internet',
      sub: 'Clientes HTTPS',
      color: '#334155',
      colorDark: '#1e293b'
    }
  },
  {
    id: 'nginx',
    type: 'box',
    position: { x: 260, y: 220 },
    data: {
      klass: 'Proxy Inverso',
      label: 'Nginx',
      sub: 'SSL · enrutamiento',
      color: '#0f172a',
      colorDark: '#020617'
    }
  },

  // ================= BACKEND CORE =================
  {
    id: 'api',
    type: 'box',
    position: { x: 520, y: 220 },
    data: {
      klass: 'Backend',
      label: 'FastAPI',
      sub: 'REST + WS',
      color: '#7c3aed',
      colorDark: '#4c1d95'
    }
  },
  {
    id: 'mongo',
    type: 'box',
    position: { x: 520, y: 40 },
    data: {
      klass: 'Base de Datos',
      label: 'MongoDB',
      sub: 'ecofresh_db',
      color: '#16a34a',
      colorDark: '#14532d'
    }
  },
  {
    id: 'emqx',
    type: 'box',
    position: { x: 520, y: 420 },
    data: {
      klass: 'Broker MQTT',
      label: 'EMQX',
      sub: '1883 · 8083 · 18083',
      color: '#0891b2',
      colorDark: '#0e4c6e'
    }
  },

  {
    id: 'iot',
    type: 'box',
    position: { x: 260, y: 520 },
    data: {
      klass: 'Disp. de Campo',
      label: 'IOT2050',
      sub: 'Cliente MQTT',
      color: '#22c55e',
      colorDark: '#14532d'
    }
  },
  {
    id: 'plc',
    type: 'box',
    position: { x: 0, y: 420 },
    data: {
      klass: 'PLC',
      label: 'S7-1200',
      sub: 'Control industrial',
      color: '#dc2626',
      colorDark: '#7f1d1d'
    }
  },

  // =================  PADDING NODE (SOLUCIÓN REAL) =================
  {
    id: 'padding-bottom',
    type: 'box',
    position: { x: 0, y: 600 },
    style: {
      width: 1,
      height: 1,
      opacity: 0
    },
    selectable: false,
    draggable: false,
    data: {}
  }
])

const edges = ref([
  {
    id: 'e1',
    source: 'internet',
    sourceHandle: 'right-source',
    target: 'nginx',
    targetHandle: 'left-target',
    label: 'HTTPS',
    type: 'smoothstep',
    style: { stroke: '#60a5fa', strokeWidth: 2 },
    ...edgeLabel('#93c5fd')
  },
  {
    id: 'e2',
    source: 'nginx',
    sourceHandle: 'right-source',
    target: 'api',
    targetHandle: 'left-target',
    label: 'proxy_pass',
    type: 'smoothstep',
    style: { stroke: '#93c5fd', strokeWidth: 2 },
    ...edgeLabel('#c4b5fd')
  },
  {
    id: 'e3',
    source: 'api',
    sourceHandle: 'top-source',
    target: 'mongo',
    targetHandle: 'bottom-target',
    label: 'consultas',
    type: 'smoothstep',
    style: { stroke: '#22c55e', strokeWidth: 2 },
    ...edgeLabel('#86efac')
  },
  {
    id: 'e4',
    source: 'api',
    sourceHandle: 'bottom-source',
    target: 'emqx',
    targetHandle: 'top-target',
    label: 'cliente MQTT',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#06b6d4', strokeWidth: 2 },
    ...edgeLabel('#67e8f9')
  },
  {
    id: 'e5',
    source: 'emqx',
    sourceHandle: 'left-source',
    target: 'iot',
    targetHandle: 'right-target',
    label: 'telemetría / control',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#22c55e', strokeWidth: 2 },
    ...edgeLabel('#86efac')
  },
  {
    id: 'e6',
    source: 'iot',
    sourceHandle: 'top-source',
    target: 'plc',
    targetHandle: 'right-target',
    label: 'control industrial',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#ef4444', strokeWidth: 2 },
    ...edgeLabel('#fca5a5')
  },
  {
    id: 'e7',
    source: 'plc',
    sourceHandle: 'right-source',
    target: 'iot',
    targetHandle: 'left-target',
    label: 'puente S7-COMM',
    type: 'smoothstep',
    style: { stroke: '#f87171', strokeWidth: 1.5, strokeDasharray: '5,3' },
    ...edgeLabel('#fca5a5')
  },
  {
    id: 'e8',
    source: 'iot',
    sourceHandle: 'bottom-source',
    target: 'emqx',
    targetHandle: 'bottom-target',
    label: 'publicar datos',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#22c55e', strokeWidth: 2 },
    ...edgeLabel('#86efac')
  },
  {
    id: 'e9',
    source: 'emqx',
    sourceHandle: 'right-source',
    target: 'api',
    targetHandle: 'bottom-target',
    label: 'flujo de eventos',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#a78bfa', strokeWidth: 2 },
    ...edgeLabel('#c4b5fd')
  }
])
</script>

<template>
  <div class="flow-wrap">
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      :node-types="nodeTypes"
      fit-view-on-init
      :fit-view-options="{ padding: 0.25 }"
      class="dark-flow"
      :min-zoom="0.3"
      :max-zoom="2.1"
      :default-viewport="{ zoom: 0.7 }"
    />
  </div>
</template>

<style scoped>
.flow-wrap {
  height: 600px;
  border: 1px solid #1e293b;
  border-radius: 10px;
  overflow: hidden;
  background: #0d1117;
}

.dark-flow {
  background: #0d1117;
}
</style>
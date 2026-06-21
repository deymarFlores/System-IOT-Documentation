<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'
import FlowNode from '../../components/FlowNode.vue'

const nodeTypes = { box: FlowNode }

const nodes = ref([
  {
    id: 'browser',
    type: 'box',
    position: { x: 0, y: 200 },
    data: {
      klass: 'Cliente',
      label: 'Browser',
      sub: 'Vue 3 SPA · HTTPS',
      color: '#1e40af',
      colorDark: '#1e3a8a'
    }
  },

  {
    id: 'nginx',
    type: 'box',
    position: { x: 260, y: 200 },
    data: {
      klass: 'Proxy Inverso',
      label: 'Nginx',
      sub: 'SSL · :443 · ecofresh-nginx',
      color: '#334155',
      colorDark: '#1e293b'
    }
  },

  {
    id: 'frontend',
    type: 'box',
    position: { x: 520, y: 60 },
    data: {
      klass: 'Frontend',
      label: 'Vue.js 3 SPA',
      sub: 'Vite · Pinia · Router',
      color: '#1d4ed8',
      colorDark: '#1e3a8a'
    }
  },

  {
    id: 'api',
    type: 'box',
    position: { x: 520, y: 340 },
    data: {
      klass: 'Backend',
      label: 'FastAPI',
      sub: 'Python · ecofresh-api',
      color: '#7c3aed',
      colorDark: '#4c1d95'
    }
  },

  {
    id: 'mongodb',
    type: 'box',
    position: { x: 800, y: 200 },
    data: {
      klass: 'Base de Datos',
      label: 'MongoDB',
      sub: 'v4.4 · ecofresh_db',
      color: '#b45309',
      colorDark: '#78350f'
    }
  },

  {
    id: 'emqx',
    type: 'box',
    position: { x: 800, y: 440 },
    data: {
      klass: 'Broker MQTT',
      label: 'EMQX',
      sub: 'v4.2.3 · :1883 / :8083',
      color: '#0891b2',
      colorDark: '#0e4c6e'
    }
  },

  {
    id: 'iot',
    type: 'box',
    position: { x: 1060, y: 440 },
    data: {
      klass: 'Pasarela IoT',
      label: 'IOT2050',
      sub: 'Linux · Paho MQTT',
      color: '#16a34a',
      colorDark: '#14532d'
    }
  },

  {
    id: 'plc',
    type: 'box',
    position: { x: 1320, y: 440 },
    data: {
      klass: 'PLC',
      label: 'S7-1200',
      sub: 'Siemens · PROFINET',
      color: '#dc2626',
      colorDark: '#7f1d1d'
    }
  }
])

const edges = ref([
  {
    id: 'e1',
    source: 'browser',
    sourceHandle: 'right-source',
    target: 'nginx',
    targetHandle: 'left-target',
    label: 'HTTPS :443',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#3b82f6', strokeWidth: 2 },
    labelStyle: { fill: '#93c5fd', fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [4, 6],
    labelBgBorderRadius: 3
  },

  {
    id: 'e2',
    source: 'nginx',
    sourceHandle: 'top-source',
    target: 'frontend',
    targetHandle: 'left-target',
    label: 'servir SPA',
    type: 'smoothstep',
    style: { stroke: '#64748b', strokeWidth: 1.5 },
    labelStyle: { fill: '#94a3b8', fontSize: 10 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [4, 6],
    labelBgBorderRadius: 3
  },

  {
    id: 'e3',
    source: 'nginx',
    sourceHandle: 'bottom-source',
    target: 'api',
    targetHandle: 'left-target',
    label: 'proxy REST / WS',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#8b5cf6', strokeWidth: 2 },
    labelStyle: { fill: '#c4b5fd', fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [4, 6],
    labelBgBorderRadius: 3
  },

  {
    id: 'e4',
    source: 'api',
    sourceHandle: 'top-source',
    target: 'mongodb',
    targetHandle: 'left-target',
    label: 'Motor async',
    type: 'smoothstep',
    style: { stroke: '#d97706', strokeWidth: 2 },
    labelStyle: { fill: '#fcd34d', fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [4, 6],
    labelBgBorderRadius: 3
  },

  {
    id: 'e5',
    source: 'api',
    sourceHandle: 'right-source',
    target: 'emqx',
    targetHandle: 'top-target',
    label: 'MQTT publicar',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#0891b2', strokeWidth: 2 },
    labelStyle: { fill: '#67e8f9', fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [4, 6],
    labelBgBorderRadius: 3
  },

  {
    id: 'e6',
    source: 'emqx',
    sourceHandle: 'left-source',
    target: 'api',
    targetHandle: 'bottom-target',
    label: 'flujo eventos',
    animated: true,
    type: 'smoothstep',
    style: { stroke: '#0891b2', strokeWidth: 1.5, strokeDasharray: '5,3' },
    labelStyle: { fill: '#67e8f9', fontSize: 10 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [4, 6],
    labelBgBorderRadius: 3
  },

  {
    id: 'e7',
    source: 'emqx',
    sourceHandle: 'right-source',
    target: 'mongodb',
    targetHandle: 'right-target',
    label: 'auth MQTT',
    type: 'smoothstep',
    style: { stroke: '#d97706', strokeWidth: 1.5, strokeDasharray: '4,3' },
    labelStyle: { fill: '#fcd34d', fontSize: 10 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [4, 6],
    labelBgBorderRadius: 3
  },

  {
    id: 'e8',
    source: 'emqx',
    sourceHandle: 'bottom-source',
    target: 'iot',
    targetHandle: 'left-target',
    label: 'MQTT ↕',
    animated: false,
    type: 'smoothstep',
    style: { stroke: '#22c55e', strokeWidth: 2 },
    labelStyle: { fill: '#86efac', fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [4, 6],
    labelBgBorderRadius: 3
  },

  {
    id: 'e9',
    source: 'iot',
    sourceHandle: 'right-source',
    target: 'plc',
    targetHandle: 'left-target',
    label: 'S7-COMM',
    animated: false,
    type: 'smoothstep',
    style: { stroke: '#f97316', strokeWidth: 2 },
    labelStyle: { fill: '#fed7aa', fontSize: 10, fontWeight: 600 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [4, 6],
    labelBgBorderRadius: 3
  },

  {
    id: 'e10',
    source: 'plc',
    sourceHandle: 'top-source',
    target: 'iot',
    targetHandle: 'top-target',
    label: 'TSEND / datos',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 1.5},
    labelStyle: { fill: '#fed7aa', fontSize: 10 },
    labelBgStyle: { fill: '#0f172a', fillOpacity: 0.9 },
    labelBgPadding: [4, 6],
    labelBgBorderRadius: 3
  }
])
</script>

<template>
  <div class="arch-view">
    <div class="view-header">
      <h1>Arquitectura General</h1>
      <p class="description">Diagrama del sistema — capas, contenedores Docker y flujo de datos</p>
    </div>

    <div class="flow-wrap">
      <VueFlow
        :nodes="nodes"
        :edges="edges"
        :node-types="nodeTypes"
        fit-view-on-init
        :fit-view-options="{ padding: 0.2 }"
        class="dark-flow"
        :min-zoom="0.2"
        :max-zoom="2.5"
        :default-viewport="{ zoom: 0.65 }"
      />
    </div>

    <div class="section-title" style="margin-top:1.75rem">Contenedores Docker</div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Contenedor</th>
            <th>Imagen</th>
            <th>Puerto(s)</th>
            <th>Funcion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code class="cell-code" style="display:inline-block;max-width:none">ecofresh-nginx</code></td>
            <td>nginx:latest</td>
            <td>:80 / :443</td>
            <td>SSL termination, serve Vue SPA, proxy REST/WS a FastAPI</td>
          </tr>
          <tr>
            <td><code class="cell-code" style="display:inline-block;max-width:none">ecofresh-api</code></td>
            <td>build ./Api</td>
            <td>:8000 (interno)</td>
            <td>FastAPI backend · base URL: /IotSystem/v1.0.1/</td>
          </tr>
          <tr>
            <td><code class="cell-code" style="display:inline-block;max-width:none">ecofresh-mongodb</code></td>
            <td>mongo:4.4</td>
            <td>:27017</td>
            <td>Base de datos principal + autenticacion MQTT (mqtt_user)</td>
          </tr>
          <tr>
            <td><code class="cell-code" style="display:inline-block;max-width:none">ecofresh-emqx</code></td>
            <td>emqx/emqx:4.2.3</td>
            <td>:1883 / :8883 TLS / :8083 WS</td>
            <td>Broker MQTT — autentica contra MongoDB (auth_mongo plugin)</td>
          </tr>
          <tr>
            <td><code class="cell-code" style="display:inline-block;max-width:none">ecofresh-mqtt-init</code></td>
            <td>python:3.9-slim</td>
            <td>—</td>
            <td>Inicializa usuarios MQTT en MongoDB al arrancar</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section-title" style="margin-top:1.5rem">Red y Dominio</div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Recurso</th><th>Valor</th></tr></thead>
        <tbody>
          <tr><td>Dominio</td><td><code class="cell-code" style="display:inline-block;max-width:none">monitoreohidro.com</code></td></tr>
          <tr><td>API base path</td><td><code class="cell-code" style="display:inline-block;max-width:none">/IotSystem/v1.0.1/</code></td></tr>
          <tr><td>WebSocket</td><td><code class="cell-code" style="display:inline-block;max-width:none">wss://monitoreohidro.com/IotSystem/v1.0.1/ws</code></td></tr>
          <tr><td>Red Docker</td><td><code class="cell-code" style="display:inline-block;max-width:none">ecofresh-network</code> (bridge)</td></tr>
          <tr><td>Version sistema</td><td>v1.0.1</td></tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<style scoped>
.flow-wrap {
  height: 560px;
  border: 1px solid #1e293b;
  border-radius: 10px;
  overflow: hidden;
  background: #0d1117;
  box-shadow: 0 4px 24px rgba(0,0,0,0.4);
}
.dark-flow { background: #0d1117; }
</style>

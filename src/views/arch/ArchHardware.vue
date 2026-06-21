<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'
import FlowNode from '../../components/FlowNode.vue'

const nodeTypes = { box: FlowNode }

const nodes = ref([
  {
    id: 'sensors',
    type: 'box',
    position: { x: 0, y: 80 },
    data: {
      klass: 'Campo',
      label: 'Sensores',
      sub: 'PT100 · NTC · 4-20mA',
      color: '#854d0e',
      colorDark: '#431407'
    }
  },

  {
    id: 'plc_ai',
    type: 'box',
    position: { x: 250, y: 80 },
    data: {
      klass: 'PLC E/S',
      label: 'Entradas AI/DI',
      sub: 'Módulos analógicos',
      color: '#7c3aed',
      colorDark: '#4c1d95'
    }
  },

  {
    id: 'plc_cpu',
    type: 'box',
    position: { x: 520, y: 180 },
    data: {
      klass: 'CPU',
      label: 'PLC S7-1200',
      sub: 'Siemens · TIA Portal',
      color: '#dc2626',
      colorDark: '#7f1d1d'
    }
  },

  {
    id: 'plc_ao',
    type: 'box',
    position: { x: 250, y: 320 },
    data: {
      klass: 'PLC E/S',
      label: 'Salidas AO/DO',
      sub: 'Módulos de salida',
      color: '#7c3aed',
      colorDark: '#4c1d95'
    }
  },

  {
    id: 'actuators',
    type: 'box',
    position: { x: 0, y: 320 },
    data: {
      klass: 'Campo',
      label: 'Actuadores',
      sub: 'Compresores · Válvulas',
      color: '#991b1b',
      colorDark: '#450a0a'
    }
  },

  {
    id: 'network',
    type: 'box',
    position: { x: 780, y: 60 },
    data: {
      klass: 'Red',
      label: 'Red Industrial',
      sub: 'PROFINET / Ethernet',
      color: '#334155',
      colorDark: '#1e293b'
    }
  },

  {
    id: 'iot2050',
    type: 'box',
    position: { x: 1020, y: 180 },
    data: {
      klass: 'Embebido',
      label: 'IOT2050',
      sub: 'Linux · Snap7',
      color: '#166534',
      colorDark: '#052e16'
    }
  },

  {
    id: 'emqx',
    type: 'box',
    position: { x: 1280, y: 180 },
    data: {
      klass: 'Broker',
      label: 'EMQX Broker',
      sub: 'TCP :1883',
      color: '#0891b2',
      colorDark: '#0e4c6e'
    }
  }
])

const edges = ref([
  {
    id: 'e1',
    source: 'sensors',
    sourceHandle: 'right-source',
    target: 'plc_ai',
    targetHandle: 'left-target',
    animated: true,
    label: 'Señales eléctricas',
    type: 'smoothstep',

    style: {
      stroke: '#d97706',
      strokeWidth: 2
    },

    labelStyle: {
      fill: '#fcd34d',
      fontSize: 10
    },

    labelBgStyle: {
      fill: '#0f172a',
      fillOpacity: 0.85
    },

    labelBgPadding: [3, 5],
    labelBgBorderRadius: 3
  },

  {
    id: 'e2',
    source: 'plc_ai',
    sourceHandle: 'right-source',
    target: 'plc_cpu',
    targetHandle: 'left-target',

    label: 'Valores analógicos',
    type: 'smoothstep',

    style: {
      stroke: '#8b5cf6',
      strokeWidth: 2
    },

    labelStyle: {
      fill: '#c4b5fd',
      fontSize: 10
    },

    labelBgStyle: {
      fill: '#0f172a',
      fillOpacity: 0.85
    },

    labelBgPadding: [3, 5],
    labelBgBorderRadius: 3
  },

  {
    id: 'e3',
    source: 'plc_cpu',
    sourceHandle: 'left-source',
    target: 'plc_ao',
    targetHandle: 'right-target',

    label: 'Lógica de control',
    type: 'smoothstep',

    style: {
      stroke: '#8b5cf6',
      strokeWidth: 2
    },

    labelStyle: {
      fill: '#c4b5fd',
      fontSize: 10
    },

    labelBgStyle: {
      fill: '#0f172a',
      fillOpacity: 0.85
    },

    labelBgPadding: [3, 5],
    labelBgBorderRadius: 3
  },

  {
    id: 'e4',
    source: 'plc_ao',
    sourceHandle: 'left-source',
    target: 'actuators',
    targetHandle: 'right-target',
    animated: true,
    label: 'Activación',
    type: 'smoothstep',

    style: {
      stroke: '#dc2626',
      strokeWidth: 2
    },

    labelStyle: {
      fill: '#fca5a5',
      fontSize: 10
    },

    labelBgStyle: {
      fill: '#0f172a',
      fillOpacity: 0.85
    },

    labelBgPadding: [3, 5],
    labelBgBorderRadius: 3
  },

  {
    id: 'e5',
    source: 'plc_cpu',
    sourceHandle: 'right-source',
    target: 'network',
    targetHandle: 'left-target',

    label: 'PROFINET',
    type: 'smoothstep',

    style: {
      stroke: '#475569',
      strokeWidth: 2
    },

    labelStyle: {
      fill: '#94a3b8',
      fontSize: 10
    },

    labelBgStyle: {
      fill: '#0f172a',
      fillOpacity: 0.85
    },

    labelBgPadding: [3, 5],
    labelBgBorderRadius: 3
  },

  {
    id: 'e6',
    source: 'network',
    sourceHandle: 'right-source',
    target: 'iot2050',
    targetHandle: 'left-target',

    label: 'Ethernet',
    type: 'smoothstep',

    style: {
      stroke: '#475569',
      strokeWidth: 2
    },

    labelStyle: {
      fill: '#94a3b8',
      fontSize: 10
    },

    labelBgStyle: {
      fill: '#0f172a',
      fillOpacity: 0.85
    },

    labelBgPadding: [3, 5],
    labelBgBorderRadius: 3
  },

  {
    id: 'e7',
    source: 'iot2050',
    sourceHandle: 'left-source',
    target: 'plc_cpu',
    targetHandle: 'bottom-target',

    label: 'S7-COMM Leer/Escribir',
    type: 'smoothstep',
    animated: false,
    style: {
      stroke: '#22c55e',
      strokeWidth: 2,
    },

    labelStyle: {
      fill: '#86efac',
      fontSize: 10
    },

    labelBgStyle: {
      fill: '#0f172a',
      fillOpacity: 0.85
    },

    labelBgPadding: [3, 5],
    labelBgBorderRadius: 3
  },

  {
    id: 'e8',
    source: 'iot2050',
    sourceHandle: 'right-source',
    target: 'emqx',
    targetHandle: 'left-target',

    label: 'MQTT Tráfico',
    animated: false,
    type: 'smoothstep',

    style: {
      stroke: '#0891b2',
      strokeWidth: 2
    },

    labelStyle: {
      fill: '#67e8f9',
      fontSize: 10
    },

    labelBgStyle: {
      fill: '#0f172a',
      fillOpacity: 0.85
    },

    labelBgPadding: [3, 5],
    labelBgBorderRadius: 3
  },
])

</script>

<template>
  <div class="arch-view">
    <div class="view-header">
      <h1>Arquitectura Hardware</h1>
      <p class="description">Capa fisica del sistema — PLC S7-1200, IOT2050, sensores, actuadores y red industrial</p>
    </div>

    <div class="flow-wrap">
      <VueFlow
        :nodes="nodes"
        :edges="edges"
        :node-types="nodeTypes"
        fit-view-on-init
        class="dark-flow"
        :min-zoom="0.3"
        :max-zoom="2.5"
        :default-viewport="{ zoom: 0.75 }"
      />
    </div>

    <div class="arch-info-grid">
      <div class="arch-info-card">
        <div class="aic-title">PLC S7-1200</div>
        <div class="aic-body">PLC Siemens programado con TIA Portal (ladder logic). Lee sensores a traves de modulos analogos y digitales. Controla actuadores de campo. El IOT2050 lee sus variables via protocolo S7-COMM.</div>
      </div>
      <div class="arch-info-card">
        <div class="aic-title">S7-COMM</div>
        <div class="aic-body">Protocolo propietario Siemens sobre TCP/IP. El IOT2050 actua como cliente S7 y lee/escribe variables del PLC usando la libreria <code>python-snap7</code>. Comunicacion via red PROFINET.</div>
      </div>
      <div class="arch-info-card">
        <div class="aic-title">PROFINET / Ethernet</div>
        <div class="aic-body">Red industrial Ethernet que conecta el PLC S7-1200 y el IOT2050. El IOT2050 es gateway — traduce entre el protocolo S7 propietario y el protocolo abierto MQTT.</div>
      </div>
      <div class="arch-info-card">
        <div class="aic-title">Gateway IOT2050</div>
        <div class="aic-body">Patron gateway industrial: el IOT2050 hace bridge entre el mundo OT (PLC, sensores analogos) y el mundo IT (red TCP/IP, MQTT, cloud). Permite modernizar infraestructura legacy sin reemplazar el PLC.</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flow-wrap {
  height: 520px;
  border: 1px solid #1e293b;
  border-radius: 10px;
  overflow: hidden;
  background: #0d1117;
  box-shadow: 0 4px 24px rgba(0,0,0,0.4);
}
.dark-flow { background: #0d1117; }
</style>

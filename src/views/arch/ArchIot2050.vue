<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'

import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

import FlowNode from '../../components/FlowNode.vue'

const nodeTypes = { box: FlowNode }

const nodes = ref([
  {
    id: 'iot_cpu',
    type: 'box',
    position: { x: 480, y: 230 },
    data: {
      klass: 'Embebido',
      label: 'IOT2050 CPU',
      sub: 'Siemens · Linux',
      color: '#166534',
      colorDark: '#052e16'
    }
  },

  {
    id: 'paho',
    type: 'box',
    position: { x: 720, y: 130 },
    data: {
      klass: 'Cliente MQTT',
      label: 'Paho MQTT',
      sub: 'Python · pub/sub',
      color: '#0f766e',
      colorDark: '#115e59'
    }
  },

  {
    id: 'emqx',
    type: 'box',
    position: { x: 720, y: 340 },
    data: {
      klass: 'Broker',
      label: 'EMQX Broker',
      sub: 'VPS / Red local',
      color: '#0891b2',
      colorDark: '#0e4c6e'
    }
  },

  {
    id: 'plc',
    type: 'box',
    position: { x: 180, y: 230 },
    data: {
      klass: 'Hardware PLC',
      label: 'PLC S7-1200',
      sub: 'FB TSEND · Cliente TCP',
      color: '#b91c1c',
      colorDark: '#450a0a'
    }
  }
])

const edges = ref([

  {
    id: 'e3',
    source: 'iot_cpu',
    sourceHandle: 'right-source',
    target: 'paho',
    targetHandle: 'left-target',
    type: 'smoothstep',
    label: 'telemetría',
    animated: false,
    style: { stroke: '#22c55e', strokeWidth: 2 },

    labelStyle: {
      fill: '#86efac',
      fontSize: 10
    },
    labelBgStyle: {
      fill: '#0f172a',
      fillOpacity: 0.85
    }
  },

  {
    id: 'e4',
    source: 'paho',
    sourceHandle: 'right-source',
    target: 'emqx',
    targetHandle: 'right-target',
    type: 'smoothstep',
    label: 'publicar',
    animated: true,
    style: { stroke: '#0891b2', strokeWidth: 2 },

    labelStyle: {
      fill: '#67e8f9',
      fontSize: 10
    },
    labelBgStyle: {
      fill: '#0f172a',
      fillOpacity: 0.85
    }
  },

  {
    id: 'e5',
    source: 'emqx',
    sourceHandle: 'left-source',
    target: 'paho',
    targetHandle: 'left-target',
    type: 'smoothstep',
    label: 'suscribir',
    animated: true,
    style: { stroke: '#0891b2', strokeWidth: 2, strokeDasharray: '5,3' },

    labelStyle: {
      fill: '#67e8f9',
      fontSize: 10
    },
    labelBgStyle: {
      fill: '#0f172a',
      fillOpacity: 0.85
    }
  },
  {
    id: 'e-8',
    source: 'plc',
    sourceHandle: 'top-source',
    target: 'iot_cpu',
    targetHandle: 'left-target',
    type: 'smoothstep',
    label: 'datos · snap 7',
    animated: false,
    style: { stroke: '#f97316', strokeWidth: 2 },

    labelStyle: {
      fill: '#fed7aa',
      fontSize: 10
    },
    labelBgStyle: {
      fill: '#0f172a',
      fillOpacity: 0.85
    }
  },
  {
    id: 'e-9',
    source: 'plc',
    sourceHandle: 'bottom-source',
    target: 'iot_cpu',
    targetHandle: 'left-target',
    type: 'smoothstep',
    label: 'datos · TSEND',
    animated: true,
    style: { stroke: '#f97316', strokeWidth: 2 },

    labelStyle: {
      fill: '#fed7aa',
      fontSize: 10
    },
    labelBgStyle: {
      fill: '#0f172a',
      fillOpacity: 0.85
    }
  }
])
</script>

<template>
  <div class="arch-view">
    <div class="view-header">
      <h1>Arquitectura IOT2050</h1>
      <p class="description">Internos del dispositivo IOT2050 — lectura de sensores, cliente MQTT, y control de actuadores</p>
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
      :default-viewport="{ zoom: 0.85 }"
    />
  </div>

    <div class="arch-info-grid">
      <div class="arch-info-card">
        <div class="aic-title">IOT2050 CPU</div>
        <div class="aic-body">Procesador ARM Siemens con Linux embebido. Corre scripts Python que leen los modulos de E/S y publican datos via MQTT. Se comunica con PLC S7-1200 via S7-COMM.</div>
      </div>
      <div class="arch-info-card">
        <div class="aic-title">Paho MQTT</div>
        <div class="aic-body">Cliente MQTT Python. Publica telemetria en <code>iotsystem/telemetry</code> y estado en <code>iotsystem/state</code>. Se suscribe a <code>iotsystem/control</code> y <code>iotsystem/device/+</code> para recibir comandos.</div>
      </div>
      <div class="arch-info-card">
        <div class="aic-title">Modulo E/S</div>
        <div class="aic-body">Modulos de entrada/salida analogica y digital conectados al IOT2050. Leen sensores de temperatura, humedad, presion y nivel. El IOT2050 procesa y escala los valores crudos.</div>
      </div>
      <div class="arch-info-card">
        <div class="aic-title">lifecycleState</div>
        <div class="aic-body">Cuando el dispositivo se conecta y publica su primer mensaje MQTT, el backend actualiza el campo <code>lifecycleState</code> de <code>"pending"</code> a <code>"active"</code> en MongoDB.</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flow-wrap {
  height: 620px;
  border: 1px solid #1e293b;
  border-radius: 10px;
  overflow: hidden;
  background: #0d1117;
}

.dark-flow {
  background: #0d1117;
}
</style>